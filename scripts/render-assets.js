// Generates Faultlens brand assets (SVG + PNG) into public/assets/brand.
// Run with: npm run assets
import { writeFileSync, mkdirSync } from 'node:fs'
import { Resvg } from '@resvg/resvg-js'

const OUT = new URL('../public/assets/brand/', import.meta.url)
mkdirSync(OUT, { recursive: true })

const C = {
  ink: '#0F1720',
  ink2: '#18222E',
  line: '#2A3644',
  paper: '#F6F4EF',
  amber: '#FFB224',
  green: '#19A974',
  muted: '#9AA6B4',
}
const FONT = "Helvetica Neue, Helvetica, Arial, sans-serif"

// The mark: a lens with a fault line (crack) inside it and a handle.
const mark = (x, y, s, { bg = true } = {}) => {
  const k = s / 64
  return `<g transform="translate(${x} ${y}) scale(${k})">
    ${bg ? `<rect width="64" height="64" rx="15" fill="${C.ink}"/>` : ''}
    <circle cx="28" cy="28" r="15" fill="none" stroke="${C.amber}" stroke-width="5"/>
    <path d="M20.5 21.5 L27.5 28 L24 31 L32 37.5" fill="none" stroke="${C.paper}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M39.5 39.5 L50 50" stroke="${C.amber}" stroke-width="7" stroke-linecap="round"/>
    <circle cx="50.5" cy="15" r="4" fill="${C.green}"/>
  </g>`
}

const svg = (w, h, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${body}</svg>`

const wordmark = (x, y, size, color) =>
  `<text x="${x}" y="${y}" font-family="${FONT}" font-size="${size}" font-weight="700" letter-spacing="${-size * 0.03}" fill="${color}">fault<tspan fill="${C.amber}">lens</tspan></text>`

const grid = (w, h, step = 32) => {
  let s = ''
  for (let x = step; x < w; x += step) s += `<line x1="${x}" y1="0" x2="${x}" y2="${h}" stroke="${C.line}" stroke-opacity="0.35" stroke-width="1"/>`
  for (let y = step; y < h; y += step) s += `<line x1="0" y1="${y}" x2="${w}" y2="${y}" stroke="${C.line}" stroke-opacity="0.35" stroke-width="1"/>`
  return s
}

// Small product card used on banners: an AI fault brief + match.
const briefCard = (x, y, scale = 1) => `<g transform="translate(${x} ${y}) scale(${scale})">
  <rect width="380" height="250" rx="16" fill="${C.ink2}" stroke="${C.line}"/>
  <circle cx="24" cy="26" r="5" fill="${C.amber}"/>
  <text x="38" y="31" font-family="${FONT}" font-size="14" font-weight="700" fill="${C.paper}">Fault brief</text>
  <text x="356" y="31" text-anchor="end" font-family="${FONT}" font-size="12" fill="${C.muted}">Fault Reel · 0:15</text>
  <text x="24" y="66" font-family="${FONT}" font-size="12" fill="${C.muted}">ITEM</text>
  <text x="24" y="86" font-family="${FONT}" font-size="16" font-weight="700" fill="${C.paper}">Front-load washing machine</text>
  <text x="24" y="116" font-family="${FONT}" font-size="12" fill="${C.muted}">LIKELY CAUSE</text>
  <text x="24" y="136" font-family="${FONT}" font-size="15" fill="${C.paper}">Worn drive belt · drum not spinning</text>
  <rect x="24" y="152" width="122" height="24" rx="12" fill="${C.amber}" fill-opacity="0.16"/>
  <text x="85" y="168" text-anchor="middle" font-family="${FONT}" font-size="12" font-weight="700" fill="${C.amber}">Medium urgency</text>
  <rect x="154" y="152" width="122" height="24" rx="12" fill="${C.paper}" fill-opacity="0.08"/>
  <text x="215" y="168" text-anchor="middle" font-family="${FONT}" font-size="12" fill="${C.paper}">Appliance repair</text>
  <line x1="24" y1="192" x2="356" y2="192" stroke="${C.line}"/>
  <circle cx="36" cy="221" r="12" fill="${C.green}"/>
  <path d="M30.5 221 l4 4 l7 -8" fill="none" stroke="${C.ink}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="58" y="226" font-family="${FONT}" font-size="14" font-weight="700" fill="${C.paper}">3 verified technicians matched</text>
</g>`

const files = {}

// Logo icon (square) — favicon, LinkedIn logo, app icon.
files['faultlens-icon.svg'] = svg(400, 400, mark(0, 0, 400))
files['../../favicon.svg'] = svg(64, 64, mark(0, 0, 64))

// Horizontal logos
files['faultlens-logo-light.svg'] = svg(570, 200, `${mark(20, 36, 128)}${wordmark(176, 131, 92, C.ink)}`)
files['faultlens-logo-dark.svg'] = svg(570, 200, `<rect width="570" height="200" fill="${C.ink}"/>${mark(20, 36, 128, { bg: true })}${wordmark(176, 131, 92, C.paper)}`)

// LinkedIn company page banner 1128 x 191 (logo overlay sits bottom-left: keep x < 240 clear)
files['linkedin-banner-1128x191.svg'] = svg(1128, 191, `
  <rect width="1128" height="191" fill="${C.ink}"/>${grid(1128, 191, 24)}
  <rect width="1128" height="191" fill="url(#fade)"/>
  <defs><linearGradient id="fade" x1="0" x2="1"><stop offset="0" stop-color="${C.ink}" stop-opacity="1"/><stop offset="0.6" stop-color="${C.ink}" stop-opacity="0.55"/><stop offset="1" stop-color="${C.ink}" stop-opacity="0.2"/></linearGradient></defs>
  ${mark(268, 22, 34)}
  ${wordmark(311, 48, 26, C.paper)}
  <text x="268" y="98" font-family="${FONT}" font-size="28" font-weight="700" fill="${C.paper}">Show us what's broken.</text>
  <text x="268" y="132" font-family="${FONT}" font-size="28" font-weight="700" fill="${C.amber}">We'll find who can fix it.</text>
  <text x="268" y="166" font-family="${FONT}" font-size="15" fill="${C.muted}">AI fault diagnosis · Verified technicians · From $1/month · faultlens.space</text>
  ${briefCard(866, 20, 0.6)}`)

// LinkedIn banner 1584 x 396 (profile photo overlay bottom-left: keep x < 470 clear in lower half)
files['linkedin-banner-1584x396.svg'] = svg(1584, 396, `
  <rect width="1584" height="396" fill="${C.ink}"/>${grid(1584, 396, 36)}
  <defs><radialGradient id="glow" cx="0.78" cy="0.45" r="0.5"><stop offset="0" stop-color="${C.amber}" stop-opacity="0.18"/><stop offset="1" stop-color="${C.amber}" stop-opacity="0"/></radialGradient></defs>
  <rect width="1584" height="396" fill="url(#glow)"/>
  ${mark(500, 70, 56)}
  ${wordmark(570, 112, 42, C.paper)}
  <text x="500" y="196" font-family="${FONT}" font-size="46" font-weight="700" fill="${C.paper}">Show us what's broken.</text>
  <text x="500" y="250" font-family="${FONT}" font-size="46" font-weight="700" fill="${C.amber}">We'll find who can fix it.</text>
  <text x="500" y="302" font-family="${FONT}" font-size="21" fill="${C.muted}">AI fault diagnosis and verified technician matching · From $1/month</text>
  <text x="500" y="340" font-family="${FONT}" font-size="19" font-weight="700" fill="${C.paper}">faultlens.space</text>
  ${briefCard(1150, 70, 1)}`)

// Open Graph / social share image 1200 x 630
files['../og-image.svg'] = svg(1200, 630, `
  <rect width="1200" height="630" fill="${C.ink}"/>${grid(1200, 630, 40)}
  <defs><radialGradient id="g2" cx="0.8" cy="0.5" r="0.55"><stop offset="0" stop-color="${C.amber}" stop-opacity="0.16"/><stop offset="1" stop-color="${C.amber}" stop-opacity="0"/></radialGradient></defs>
  <rect width="1200" height="630" fill="url(#g2)"/>
  ${mark(72, 72, 64)}${wordmark(150, 118, 46, C.paper)}
  <text x="72" y="270" font-family="${FONT}" font-size="54" font-weight="700" fill="${C.paper}">Show us what's broken.</text>
  <text x="72" y="340" font-family="${FONT}" font-size="54" font-weight="700" fill="${C.amber}">We'll find who can fix it.</text>
  <text x="72" y="410" font-family="${FONT}" font-size="24" fill="${C.muted}">Film a 15-second Fault Reel. Get an AI fault brief.</text>
  <text x="72" y="446" font-family="${FONT}" font-size="24" fill="${C.muted}">Book the right verified technician — from $1/month.</text>
  <text x="72" y="556" font-family="${FONT}" font-size="22" font-weight="700" fill="${C.paper}">faultlens.space</text>
  ${briefCard(800, 200, 1)}`)

const pngTargets = {
  'faultlens-icon.svg': [['faultlens-icon-400.png', 400], ['../../apple-touch-icon.png', 180]],
  'faultlens-logo-light.svg': [['faultlens-logo-light.png', 1140]],
  'faultlens-logo-dark.svg': [['faultlens-logo-dark.png', 1140]],
  'linkedin-banner-1128x191.svg': [['linkedin-banner-1128x191.png', 1128], ['linkedin-banner-1128x191@2x.png', 2256]],
  'linkedin-banner-1584x396.svg': [['linkedin-banner-1584x396.png', 1584]],
  '../og-image.svg': [['../og-image.png', 1200]],
}

for (const [name, content] of Object.entries(files)) {
  writeFileSync(new URL(name, OUT), content)
  for (const [png, width] of pngTargets[name] || []) {
    const r = new Resvg(content, {
      fitTo: { mode: 'width', value: width },
      font: { loadSystemFonts: true, defaultFontFamily: 'Helvetica' },
    })
    writeFileSync(new URL(png, OUT), r.render().asPng())
  }
}
console.log('Brand assets written to public/assets/brand')
