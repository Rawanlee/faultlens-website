// Single source of truth for Faultlens business facts.
// The website, /app kit page, SEO metadata and docs all read from here.
export const SITE_URL = (import.meta.env?.VITE_SITE_URL || 'https://www.faultlens.space').replace(/\/$/, '')

export const company = {
  name: 'Faultlens',
  legalNote: 'Privately held',
  domain: 'faultlens.space',
  url: SITE_URL,
  email: 'shalom@faultlens.space',
  linkedin: 'https://www.linkedin.com/company/faultlensai/',
  founded: 2026,
  size: '2-10 employees',
  stage: 'Launched initial product and iterating',
  tagline: "Show us what's broken. We'll find who can fix it.",
  category: 'AI fault diagnosis and technician matching',
  shortDescription:
    'Faultlens turns a 15-second video of a faulty appliance, device, vehicle or fitting into an AI fault brief, then matches the job to a verified technician with the right skills.',
  positioning:
    'Faultlens helps households, landlords and small businesses get broken things fixed by the right technician the first time. Customers film a short Fault Reel, Faultlens analyses it to identify the item, the likely fault and how urgent it is, and matches the job to technicians who repair exactly that problem — from $1 a month.',
}

export const team = [
  {
    name: 'Elegbede Shalom',
    role: 'Founder',
    initials: 'ES',
    email: 'shalom@faultlens.space',
    bio: 'Shalom founded Faultlens to fix a problem every household knows: you can see something is broken, but you cannot describe the fault well enough to find the right person to repair it. Shalom leads the company and its product.',
  },
  {
    name: 'Elegbede Precious',
    role: 'Co-Founder',
    initials: 'EP',
    bio: 'Precious co-founded Faultlens alongside Shalom. Building it as siblings, the two share one goal: make getting something repaired as simple as filming the problem and choosing a technician you can trust.',
  },
]

export const nav = [
  { label: 'Product', href: '/#product' },
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Demo', href: '/#demo' },
  { label: 'Technology', href: '/#aws' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Team', href: '/#team' },
  { label: 'Contact', href: '/#contact' },
]
