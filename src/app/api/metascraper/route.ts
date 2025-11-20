import { NextResponse } from 'next/server'
import { chromium, Page } from 'playwright'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const targetUrl = searchParams.get('targetUrl')

  if (!targetUrl) {
    return NextResponse.json(
      { error: 'targetUrl parameter is required' },
      { status: 400 }
    )
  }

  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto(targetUrl)

  const visibleImage = await extractVisibleDomImage(page)

  await browser.close()
  return NextResponse.json({ imageUrl: visibleImage || null })
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
