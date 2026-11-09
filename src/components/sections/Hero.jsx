import { ArrowRight, PlayCircle, ShieldCheck, BadgeCheck, CircleDollarSign } from 'lucide-react'
import Button from '../ui/Button'
import FaultScene from '../ui/FaultScene'

function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none" aria-hidden="true">
      <div className="absolute -inset-8 rounded-[3rem] bg-[radial-gradient(closest-side,rgba(255,178,36,.18),transparent)]" />
      {/* Phone capturing a fault reel */}
      <div className="relative mx-auto w-[64%] rounded-[2.2rem] border border-white/10 bg-ink-2 p-2.5 shadow-2xl">
        <div className="relative overflow-hidden rounded-[1.7rem] bg-ink-3">
          <FaultScene kind="fridge" className="block aspect-[3/4] w-full object-cover" />
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="scanline h-1/3 w-full bg-gradient-to-b from-transparent via-amber/25 to-transparent" />
          </div>
          <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-ink/80 px-2.5 py-1 text-[11px] font-semibold text-paper">
            <span className="pulse-dot h-2 w-2 rounded-full bg-[#E5484D]" /> REC 0:14
          </div>
          <div className="absolute bottom-3 left-3 right-3 rounded-xl bg-ink/85 p-2.5 text-[11px] leading-snug text-paper/90">
            “Humming all night but the top section is warm. Clicking every few minutes.”
          </div>
        </div>
      </div>
      {/* Fault brief card */}
      <div className="absolute -left-2 top-[18%] w-[58%] rounded-2xl border border-white/10 bg-ink-2/95 p-4 shadow-xl backdrop-blur sm:-left-6">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-paper">Fault brief</p>
          <span className="rounded-full bg-[#E5484D]/15 px-2 py-0.5 text-[10px] font-bold text-[#FF8A8D]">High urgency</span>
        </div>
        <p className="mt-3 text-[10px] uppercase tracking-wider text-mist">Likely cause</p>
        <p className="mt-0.5 text-sm font-medium text-paper">Compressor start relay failing</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {['Refrigeration', 'Start relays'].map((s) => <span key={s} className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-paper/80">{s}</span>)}
        </div>
      </div>
      {/* Match card */}
      <div className="absolute -right-2 bottom-[10%] w-[60%] rounded-2xl border border-white/10 bg-paper p-4 shadow-xl sm:-right-6">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-xs font-bold text-amber">KM</span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-ink">Kofi M. · Refrigeration</p>
            <p className="text-[11px] text-muted">2.1 km · ★ 4.9 · Available today</p>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between rounded-lg bg-fix/10 px-3 py-2">
          <span className="text-[11px] font-semibold text-fix-deep">Quote $35–60</span>
          <BadgeCheck className="h-4 w-4 text-fix" />
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      <div className="grid-bg absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" />
      <div className="container-x relative grid items-center gap-14 pb-20 pt-14 lg:grid-cols-[1.05fr_1fr] lg:pb-28 lg:pt-20">
        <div>
          <p className="eyebrow rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-mist">
            <span className="h-2 w-2 rounded-full bg-fix" /> Live · AI fault diagnosis &amp; technician matching
          </p>
          <h1 className="mt-6 text-[2.6rem] font-bold leading-[1.04] sm:text-6xl lg:text-[4.1rem]">
            Show us what’s broken.<br /><span className="text-amber">We’ll find who can fix it.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-mist">
            Film a 15-second Fault Reel of the leaking pipe, warm fridge or sparking socket. Faultlens identifies the likely fault,
            flags safety risks and matches you with a verified technician who repairs exactly that — from <strong className="text-paper">$1 a month</strong>.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="#get-started" event="cta_hero_primary">Find a technician <ArrowRight className="h-4 w-4" /></Button>
            <Button href="#demo" variant="ghostDark" event="cta_hero_demo"><PlayCircle className="h-4 w-4" /> Try the interactive demo</Button>
          </div>
          <ul className="mt-10 grid gap-3 text-sm text-mist sm:grid-cols-3">
            <li className="flex items-center gap-2"><CircleDollarSign className="h-4 w-4 text-amber" /> Fix Pass from $1/month</li>
            <li className="flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-amber" /> Skill-verified technicians</li>
            <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-amber" /> Safety-first triage</li>
          </ul>
        </div>
        <HeroVisual />
      </div>
    </section>
  )
}
