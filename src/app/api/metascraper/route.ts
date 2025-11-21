import { NextResponse } from 'next/server'
import { Browser, BrowserContext, chromium, type Page } from 'playwright-core'
import chromiumPkg from '@sparticuz/chromium'

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

  let browser
  let context
  try {
    browser = await launchBrowser()
    context = await createStealthContext(browser)
    await applyAntiDetectionScripts(context)

    const page = await context.newPage()
    await page.goto(targetUrl)

    const visibleImage = await extractProductImage(page)

    return NextResponse.json({ imageUrl: visibleImage || null })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  } finally {
    context?.close()
    browser?.close()
  }
}

async function launchBrowser(): Promise<Browser> {
  const isVercel = process.env.VERCEL === '1'
  const isDev = process.env.NODE_ENV !== 'production'

  if (!isVercel) {
    // Local (Windows/Mac) → usa Playwright completo (más rápido y estable)
    await import('playwright')
  }

  const executablePath = isVercel
    ? await chromiumPkg.executablePath()
    : undefined
  const args = isVercel ? chromiumPkg.args : ['--no-sandbox']

  return await chromium.launch({
    headless: isVercel ? true : !isDev, // Solo abre ventana en dev local
    executablePath,
    args
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

export async function extractProductImage(page: Page): Promise<string | null> {
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
