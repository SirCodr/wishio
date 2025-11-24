import { NextResponse } from 'next/server'
import { tryPlaywrightScrape } from '@/lib/scraping/playwright'
import { tryMetascraperScrape } from '@/lib/scraping/metascraper'
import { fetchMercadoLibreProductImage } from '@/lib/scraping/ml/ml'

export const dynamic = 'force-dynamic'
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const targetUrl = searchParams.get('targetUrl')

  if (!targetUrl) {
    return NextResponse.json(
      { error: 'targetUrl parameter is required' },
      { status: 400 }
    )
  }

  try {
    const url = new URL(targetUrl)
    const hostname = url.hostname.toLowerCase()

    if (hostname.includes('mercadolibre')) {
      const mlImage = await fetchMercadoLibreProductImage(targetUrl)

      if (mlImage) return NextResponse.json({ imageUrl: mlImage })
    }

    const scrapedImage = await tryPlaywrightScrape(targetUrl)
    if (scrapedImage) return NextResponse.json({ imageUrl: scrapedImage })

    const metascraped = await tryMetascraperScrape(targetUrl)
    if (metascraped) return NextResponse.json({ imageUrl: metascraped })

    return NextResponse.json({ imageUrl: null })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
