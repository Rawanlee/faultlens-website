import { Link } from 'react-router-dom'
import { Mail } from 'lucide-react'
import Logo from '../ui/Logo'
import LinkedInIcon from '../ui/LinkedInIcon'
import { company } from '../../data/company'

const cols = [
  { title: 'Product', links: [['Features', '/#product'], ['How it works', '/#how-it-works'], ['Live demo', '/#demo'], ['Pricing', '/#pricing']] },
  { title: 'Solutions', links: [['Households', '/#who'], ['Landlords', '/#who'], ['Small businesses', '/#who'], ['Technicians', '/#who']] },
  { title: 'Company', links: [['Technology', '/#aws'], ['Team', '/#team'], ['Contact', '/#contact']] },
]

export default function Footer() {
  return (
    <footer className="bg-ink text-mist">
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <Logo dark />
          <p className="mt-4 max-w-xs text-sm leading-relaxed">{company.shortDescription}</p>
          <div className="mt-6 flex flex-col gap-3 text-sm">
            <a href={`mailto:${company.email}`} className="focus-ring inline-flex items-center gap-2 rounded hover:text-paper"><Mail className="h-4 w-4" />{company.email}</a>
            <a href={company.linkedin} target="_blank" rel="noopener noreferrer" className="focus-ring inline-flex items-center gap-2 rounded hover:text-paper"><LinkedInIcon />Faultlens on LinkedIn</a>
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h3 className="font-sans text-sm font-semibold tracking-normal text-paper">{c.title}</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {c.links.map(([label, href]) => <li key={label}><a href={href} className="focus-ring rounded hover:text-paper">{label}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-4 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {company.founded} {company.name}. All rights reserved.</p>
          <p className="max-w-xl sm:text-right">AI fault briefs are guidance to help describe a problem. They are not a substitute for an on-site inspection by a qualified technician. In an emergency, contact your local emergency services.</p>
          <div className="flex gap-5">
            <Link to="/privacy" className="focus-ring rounded hover:text-paper">Privacy Policy</Link>
            <Link to="/terms" className="focus-ring rounded hover:text-paper">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
