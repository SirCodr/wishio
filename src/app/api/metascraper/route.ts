import got from 'got'
import createMetascraper from 'metascraper'
import metascraperImage from 'metascraper-image'
import { NextResponse } from 'next/server'

const metascraper = createMetascraper([metascraperImage()])

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const targetUrl = searchParams.get('targetUrl')

    if (!targetUrl) {
      return NextResponse.json(
        { error: 'targetUrl parameter is required' },
        { status: 400 }
      )
    }

    const { body: html, url } = await got(targetUrl)
    const metadata = await metascraper({ html, url })

    return NextResponse.json(metadata)
  } catch (error) {
    console.error('Error scraping metadata:', error)
    return NextResponse.json(
      { error: 'Failed to fetch metadata' },
      { status: 500 }
    )
  }
}
