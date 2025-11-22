import { NextResponse } from 'next/server'
import {
  Browser,
  BrowserContext,
  chromium as playwright,
  type Page
} from 'playwright-core'
import chromiumPkg from '@sparticuz/chromium-min'
import got from 'got'
import createMetascraper from 'metascraper'
import metascraperImage from 'metascraper-image'

type Extractor = (page: Page) => Promise<string | null>

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
    // 1) Try headless browser extraction (strongest, JS-rendered sites)
    const scrapedImage = await tryPlaywrightScrape(targetUrl)
    if (scrapedImage) return NextResponse.json({ imageUrl: scrapedImage })

    // 2) Fallback to metascraper + got (fast, non-JS fallback)
    const metascraped = await tryMetascraperScrape(targetUrl)
    if (metascraped) return NextResponse.json({ imageUrl: metascraped })

    // 3) Nothing found
    return NextResponse.json({ imageUrl: null })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// --- Helper wrappers -------------------------------------------------
async function tryPlaywrightScrape(targetUrl: string): Promise<string | null> {
  let browser: Browser | undefined
  try {
    browser = await launchBrowser()
    const context = await createStealthContext(browser)
    await applyAntiDetectionScripts(context)

    const page = await context.newPage()
    await page.goto(targetUrl)

    const scrapedImage = await scrapProductImage(page)
    return scrapedImage
  } catch (err) {
    console.warn('[tryPlaywrightScrape] error', err)
    return null
  } finally {
    try {
      await browser?.close()
    } catch {}
  }
}

async function isValidImageUrl(
  url: string | null | undefined
): Promise<boolean> {
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

async function tryMetascraperScrape(targetUrl: string): Promise<string | null> {
  try {
    const metascraper = createMetascraper([metascraperImage()])
    const { body: html, url } = await got(targetUrl, {
      timeout: {
        response: 5000
      }
    })
    const metadata = await metascraper({ html, url })
    let imageUrl = metadata.image as string | null

    if (await isValidImageUrl(imageUrl)) {
      return imageUrl
    }

    console.warn(
      '[metascraper] Imagen inválida o placeholder, cayendo a fallback manual:',
      imageUrl
    )

    // 2. Fallback manual: busca og:image con la imagen grande (termina en O.jpg = Original)
    const ogMatch =
      html.match(
        /<meta\s+property="og:image"\s+content="([^"]+O\.jpe?g[^"]*)"/i
      ) ||
      html.match(
        /<meta\s+content="([^"]+O\.jpe?g[^"]*)"\s+property="og:image"/i
      )

    if (ogMatch && ogMatch[1]) {
      return ogMatch[1]
    }

    // 3. Fallback extra fuerte para MercadoLibre (busca en JSON interno o cualquier O.jpg grande)
    const bigImageMatch =
      html.match(/"secure_url":"([^"]+O\.jpe?g[^"]*)"/) ||
      html.match(/https:\/\/http2\.mlstatic\.com\/[^"]+O\.jpe?g[^"\s]*/)

    if (bigImageMatch) {
      return bigImageMatch[0].replace(/\\/g, '') // quita escapes si hay
    }

    // 4. Último recurso: cualquier imagen .mlstatic.com que sea grande
    const mlstaticMatch = html.match(
      /https:\/\/http2\.mlstatic\.com\/D_[^"]+\.jpg/
    )
    if (mlstaticMatch) {
      return mlstaticMatch[0]
    }

    return null
  } catch (err: any) {
    console.warn('[tryMetascraperScrape] error completo', err.message || err)
    return null
  }
}

async function launchBrowser(): Promise<Browser> {
  const isVercel = process.env.VERCEL === '1'

  let executablePath: string | undefined

  await import('playwright')

  return playwright.launch({
    headless: true,
    executablePath,
    args: isVercel ? chromiumPkg.args : ['--no-sandbox']
  })
}

async function createStealthContext(browser: Browser): Promise<BrowserContext> {
  return await browser.newContext({
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
    viewport: { width: 1920, height: 1080 },
    locale: 'es-CO',
    timezoneId: 'America/Bogota',
    permissions: ['geolocation'],
    geolocation: { latitude: 4.6097, longitude: -74.0817 },
    extraHTTPHeaders: {
      'Accept-Language': 'es-CO,es;q=0.9'
    }
  })
}

async function applyAntiDetectionScripts(
  context: BrowserContext
): Promise<void> {
  await context.addInitScript(() => {
    // Elimina la flag que delata a Playwright/Chromium headless
    delete (navigator as any).__proto__.webdriver

    // Fake plugins
    Object.defineProperty(navigator, 'plugins', {
      get: () => [
        { name: 'Chrome PDF Plugin' },
        { name: 'Chrome PDF Viewer' },
        { name: 'Native Client' }
      ]
    })

    // Fake languages
    Object.defineProperty(navigator, 'languages', {
      get: () => ['es-CO', 'es', 'en-US', 'en']
    })

    // Spoof WebGL (muy efectivo contra MercadoLibre, Amazon, etc.)
    const getParameter = WebGLRenderingContext.prototype.getParameter
    WebGLRenderingContext.prototype.getParameter = function (parameter: any) {
      if (parameter === 37445) return 'Intel Inc.' // UNMASKED_VENDOR_WEBGL
      if (parameter === 37446) return 'Intel Iris OpenGL Engine' // UNMASKED_RENDERER_WEBGL
      return getParameter.call(this, parameter)
    }
  })
}

async function scrapProductImage(page: Page): Promise<string | null> {
  const extractors: Extractor[] = [
    extractOgImage,
    extractTwitterImage,
    extractJsonLdImage,
    extractMetaThumbnail,
    extractVisibleDomImage // Fallback más sólido
  ]

  for (const extractor of extractors) {
    try {
      const result = await extractor(page)
      if (result) return result
    } catch (err) {
      console.warn(`[Extractor error] ${extractor.name}`, err)
    }
  }

  return null
}

async function extractOgImage(page: Page): Promise<string | null> {
  return page.evaluate(() => {
    return (
      document
        .querySelector('meta[property="og:image"]')
        ?.getAttribute('content') ||
      document
        .querySelector('meta[name="og:image"]')
        ?.getAttribute('content') ||
      null
    )
  })
}

async function extractTwitterImage(page: Page): Promise<string | null> {
  return page.evaluate(() => {
    return (
      document
        .querySelector('meta[name="twitter:image"]')
        ?.getAttribute('content') ||
      document
        .querySelector('meta[name="twitter:image:src"]')
        ?.getAttribute('content') ||
      null
    )
  })
}

async function extractJsonLdImage(page: Page): Promise<string | null> {
  return page.evaluate(() => {
    const scripts = Array.from(
      document.querySelectorAll('script[type="application/ld+json"]')
    )

    for (const script of scripts) {
      try {
        const json = JSON.parse(script.textContent || '{}')

        const candidates = [
          json?.image,
          json?.image?.url,
          json?.image?.[0],
          json?.imageUrl,
          json?.photo
        ].filter(Boolean)

        if (candidates.length) {
          const img = candidates.find((v) => typeof v === 'string')
          if (img) return img
        }
      } catch {}
    }

    return null
  })
}

async function extractMetaThumbnail(page: Page): Promise<string | null> {
  return page.evaluate(() => {
    return (
      document
        .querySelector('meta[name="thumbnail"]')
        ?.getAttribute('content') ||
      document.querySelector('link[rel="image_src"]')?.getAttribute('href') ||
      null
    )
  })
}

async function extractVisibleDomImage(page: Page): Promise<string | null> {
  return page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img'))

    const isVisible = (el: HTMLImageElement) => {
      const style = window.getComputedStyle(el)
      const rect = el.getBoundingClientRect()

      return (
        style.display !== 'none' &&
        style.visibility !== 'hidden' &&
        Number(style.opacity) > 0.1 &&
        rect.width > 60 &&
        rect.height > 60 &&
        rect.bottom > 0 &&
        rect.right > 0 &&
        rect.top < window.innerHeight &&
        rect.left < window.innerWidth
      )
    }

    const isRealImage = (src: string) =>
      src &&
      /\.(jpg|jpeg|png|webp|avif)(\?|$)/i.test(src) &&
      !src.includes('sprite') &&
      !src.includes('icon') &&
      !src.includes('tracking') &&
      !src.includes('csi') &&
      !src.startsWith('data:')

    const candidates = imgs
      .filter((img) => isVisible(img))
      .map((img) => img.src || img.dataset.src || '')
      .filter((src) => isRealImage(src))

    return candidates.length ? candidates[0] : null
  })
}
