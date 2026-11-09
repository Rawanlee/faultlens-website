import { company, SITE_URL } from '../data/company'

export const routes = {
  '/': {
    title: 'Faultlens — AI fault diagnosis and verified technician matching from $1/month',
    description: 'Film a 15-second Fault Reel of anything broken. Faultlens drafts an AI fault brief with the likely cause, urgency and safety notes, then matches you to a verified technician. From $1 a month.',
  },
  '/privacy': { title: 'Privacy Policy — Faultlens', description: 'How Faultlens collects, uses, stores and protects personal data, Fault Reels and repair records.' },
  '/terms': { title: 'Terms of Service — Faultlens', description: 'The terms that govern use of the Faultlens fault-diagnosis and technician-matching platform.' },
  '/app': { title: 'Faultlens launch kit', description: 'Internal brand, LinkedIn and AWS Activate kit for Faultlens.', noindex: true },
  '/404': { title: 'Page not found — Faultlens', description: 'This page does not exist.', noindex: true },
}

export function metaFor(path) {
  return routes[path] || routes['/404']
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

export function headTags(path) {
  const m = metaFor(path)
  const url = `${SITE_URL}${path === '/' ? '/' : path}`
  const image = `${SITE_URL}/assets/og-image.png`
  const tags = [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}" />`,
    m.noindex ? '<meta name="robots" content="noindex, nofollow" />' : '<meta name="robots" content="index, follow" />',
    path !== '/404' && `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${company.name}" />`,
    `<meta property="og:title" content="${esc(m.title)}" />`,
    `<meta property="og:description" content="${esc(m.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(m.title)}" />`,
    `<meta name="twitter:description" content="${esc(m.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
  ].filter(Boolean)
  if (path === '/') {
    const ld = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization', '@id': `${SITE_URL}/#org`, name: company.name, url: `${SITE_URL}/`,
          logo: `${SITE_URL}/assets/brand/faultlens-icon-400.png`, email: company.email, foundingDate: String(company.founded),
          founder: [{ '@type': 'Person', name: 'Elegbede Shalom' }, { '@type': 'Person', name: 'Elegbede Precious' }],
          sameAs: [company.linkedin],
        },
        { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: `${SITE_URL}/`, name: company.name, publisher: { '@id': `${SITE_URL}/#org` } },
        {
          '@type': 'SoftwareApplication', name: company.name, applicationCategory: 'LifestyleApplication', operatingSystem: 'Web browser',
          description: company.shortDescription, url: `${SITE_URL}/`,
          offers: { '@type': 'Offer', price: '1.00', priceCurrency: 'USD', name: 'Fix Pass (monthly)' },
          publisher: { '@id': `${SITE_URL}/#org` },
        },
      ],
    }
    tags.push(`<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>`)
  }
  return tags.join('\n    ')
}
