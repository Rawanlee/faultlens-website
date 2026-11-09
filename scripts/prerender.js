// Renders each route to static HTML so content is crawlable without JavaScript.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const template = readFileSync(join(dist, 'index.html'), 'utf8')
const { render } = await import(pathToFileURL(join(root, 'dist-ssr', 'entry-server.js')).href)

const pages = [
  ['/', 'index.html'],
  ['/privacy', 'privacy/index.html'],
  ['/terms', 'terms/index.html'],
  ['/app', 'app/index.html'],
  ['/404', '404.html'],
]

for (const [url, file] of pages) {
  const { html, head } = render(url)
  const out = template
    .replace(/<!--seo-->[\s\S]*<!--\/seo-->/, head)
    .replace('<div id="root"><!--app-html--></div>', `<div id="root" data-route="${url}">${html}</div>`)
  const target = join(dist, file)
  mkdirSync(dirname(target), { recursive: true })
  writeFileSync(target, out)
  console.log(`prerendered ${url.padEnd(9)} → dist/${file} (${(out.length / 1024).toFixed(1)} kB)`)
}
rmSync(join(root, 'dist-ssr'), { recursive: true, force: true })
