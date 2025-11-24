import { MlAuth, MlProduct } from './types'

const REFRESH_TOKEN = process.env.ML_REFRESH_TOKEN!
const CLIENT_ID = process.env.ML_CLIENT_ID!
const CLIENT_SECRET = process.env.ML_CLIENT_SECRET!

let accessToken = ''
let expiresAt = 0

async function getValidToken(): Promise<string> {
  if (accessToken && Date.now() < expiresAt - 60000) {
    return accessToken
  }

  const res = await fetch('https://api.mercadolibre.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      refresh_token: REFRESH_TOKEN
    })
  })

  if (!res.ok) throw new Error('No se pudo renovar token')

  const data = (await res.json()) as MlAuth
  accessToken = data.access_token
  expiresAt = Date.now() + data.expires_in * 1000

  // El refresh_token nuevo (MercadoLibre te da uno nuevo cada vez)
  // Puedes actualizarlo en .env o DB si querés, pero el viejo sigue funcionando unos días
  return accessToken
}

function extractProductId(url: string): string | null {
  const match = url.match(/(MLA|MLB|MLM|MCO|MLU|MLV)\d+/i)
  return match ? match[0].toUpperCase() : null
}

export async function fetchMercadoLibreProductImage(
  productUrl: string
): Promise<string | null> {
  try {
    const productId = extractProductId(productUrl)
    if (!productId) return null

    const token = await getValidToken()

    const res = await fetch(
      `https://api.mercadolibre.com/products/${productId}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(
        `Error fetching product: ${err?.message || JSON.stringify(err)}`
      )
    }

    const product = (await res.json()) as MlProduct
    return product.pictures?.[0]?.url || null
  } catch (error) {
    console.error('Error fetching MercadoLibre product image:', error)
    return null
  }
}
