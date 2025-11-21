import { NextResponse } from 'next/server'
import { chromium, type Page } from 'playwright-core'

type Extractor = (page: Page) => Promise<string | null>

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const targetUrl = searchParams.get('targetUrl')

  if (!targetUrl) {
    return NextResponse.json(
      { error: 'targetUrl parameter is required' },
      { status: 400 }
    )
  }

  const browser = await chromium.launch({ headless: false })
  const page = await browser.newPage()
  await page.goto(targetUrl)

  const visibleImage = await extractProductImage(page)

  await browser.close()
  return NextResponse.json({ imageUrl: visibleImage || null })
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

/* ────────────────────────────────────────────────────────────────────── */
/* 🔵 Extractor 1: og:image */
/* ────────────────────────────────────────────────────────────────────── */
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

/* ────────────────────────────────────────────────────────────────────── */
/* 🔵 Extractor 2: twitter:image */
/* ────────────────────────────────────────────────────────────────────── */
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

/* ────────────────────────────────────────────────────────────────────── */
/* 🔵 Extractor 3: JSON-LD */
/* ────────────────────────────────────────────────────────────────────── */
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

/* ────────────────────────────────────────────────────────────────────── */
/* 🔵 Extractor 4: Otros metatags comunes */
/* ────────────────────────────────────────────────────────────────────── */
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
