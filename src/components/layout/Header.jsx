import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import Logo from '../ui/Logo'
import Button from '../ui/Button'
import { nav } from '../../data/company'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header className={`sticky top-0 z-50 border-b transition-colors ${scrolled || open ? 'border-white/10 bg-ink/95 backdrop-blur' : 'border-transparent bg-ink'}`}>
      <div className="container-x flex h-16 items-center justify-between">
        <a href="/" className="focus-ring rounded-md" aria-label="Faultlens home"><Logo dark /></a>
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {nav.map((n) => (
              <li key={n.href}><a href={n.href} className="focus-ring rounded text-sm font-medium text-mist transition-colors hover:text-paper">{n.label}</a></li>
            ))}
          </ul>
        </nav>
        <div className="hidden lg:block">
          <Button href="/#get-started" event="cta_header_click" className="!py-2.5">Find a technician</Button>
        </div>
        <button
          className="focus-ring rounded-md p-2 text-paper lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-white/10 bg-ink lg:hidden">
          <ul className="container-x flex flex-col py-3">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} onClick={() => setOpen(false)} className="focus-ring block rounded py-3 text-base font-medium text-paper/90">{n.label}</a>
              </li>
            ))}
            <li className="pt-3 pb-2"><Button href="/#get-started" event="cta_mobile_nav_click" className="w-full" onClick={() => setOpen(false)}>Find a technician</Button></li>
          </ul>
        </nav>
      )}
    </header>
  )
}
