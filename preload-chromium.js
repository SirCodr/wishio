import chromium from '@sparticuz/chromium'

console.log('Preloading Chromium for Vercel...')
await chromium.executablePath()
console.log('Chromium ready!')
