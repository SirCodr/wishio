import got from 'got'
import createMetascraper from 'metascraper'
import metascraperImage from 'metascraper-image'

export async function tryMetascraperScrape(
  targetUrl: string
): Promise<string | null> {
  try {
    const metascraper = createMetascraper([metascraperImage()])
    const { body: html, url } = await got(targetUrl, {
      timeout: {
        response: 5000
      }
    })
    const decodedHtml = decodeHtmlEntities(html)
    const metadata = await metascraper({ html: decodedHtml, url })
    let imageUrl = metadata.image as string | null

    if (isValidImageUrl(imageUrl)) {
      return imageUrl
    }

    console.warn(
      '[metascraper] Imagen inválida o placeholder, cayendo a fallback manual:',
      imageUrl
    )

    const ogMatch =
      decodedHtml.match(
        /<meta\s+property="og:image"\s+content="([^"]+O\.jpe?g[^"]*)"/i
      ) ||
      decodedHtml.match(
        /<meta\s+content="([^"]+O\.jpe?g[^"]*)"\s+property="og:image"/i
      )
    if (ogMatch && ogMatch[1]) {
      return ogMatch[1]
    }

    const bigImageMatch =
      decodedHtml.match(/"secure_url":"([^"]+O\.jpe?g[^"]*)"/) ||
      decodedHtml.match(
        /https:\/\/http2\.mlstatic\.com\/[^\"]+O\.jpe?g[^\"\s]*/
      )

    if (bigImageMatch) {
      return (bigImageMatch[0] || '').replace(/\\/g, '')
    }

    const mlstaticMatch = decodedHtml.match(
      /https:\/\/http2\.mlstatic\.com\/D_[^\"]+\.jpg/
    )
    if (mlstaticMatch) {
      return mlstaticMatch[0]
    }

    return null
  } catch (err: any) {
    console.warn('[tryMetascraperScrape] error', err.message || err)
    return null
  }
}

function isValidImageUrl(url: string | null | undefined): boolean {
  if (!url) return false
  if (url.trim() === '') return false
  if (url.startsWith('data:')) return false // cualquier data: URI la descartamos
  if (
    url.includes('spacer.gif') ||
    url.includes('transparent.gif') ||
    url.includes('1x1.')
  )
    return false
  if (
    !/\.(jpg|jpeg|png|webp|avif|gif)(\?|#|$)/i.test(url) &&
    !url.includes('mlstatic.com')
  )
    return false
  return true
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/\\u003C/g, '<')
    .replace(/\\u003E/g, '>')
    .replace(/\\u0022/g, '"')
    .replace(/\\u0027/g, "'")
    .replace(/\\u0026/g, '&')
    .replace(/\\u003D/g, '=')
    .replace(/\\u002F/g, '/')
}
