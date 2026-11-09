import { Check } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import Button from '../ui/Button'
import { plans } from '../../data/content'

export default function Pricing() {
  return (
    <section id="pricing" className="bg-paper-2 py-20 lg:py-28" aria-labelledby="pricing-title">
      <div className="container-x">
        <SectionHeader center id="pricing-title" eyebrow="Pricing" title="Find the right technician from $1 a month." intro="Faultlens plans cover diagnosis, matching, quotes and your repair history. The repair itself is quoted by the technician before you book and paid to them for the work." />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((p) => (
            <article key={p.name} className={`reveal relative flex flex-col rounded-2xl p-6 ${p.highlight ? 'bg-ink text-paper ring-2 ring-amber' : 'border border-ink/10 bg-white'}`}>
              {p.highlight && <span className="absolute -top-3 left-6 rounded-full bg-amber px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-ink">Most popular</span>}
              <h3 className="text-xl font-semibold">{p.name}</h3>
              <p className={`mt-1 text-sm ${p.highlight ? 'text-mist' : 'text-muted'}`}>{p.audience}</p>
              <p className="mt-6 flex items-baseline gap-1"><span className="font-display text-5xl font-bold">{p.price}</span><span className={p.highlight ? 'text-mist' : 'text-muted'}>{p.period}</span></p>
              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {p.features.map((f) => <li key={f} className="flex gap-2.5"><Check className={`mt-0.5 h-4 w-4 shrink-0 ${p.highlight ? 'text-amber' : 'text-fix'}`} />{f}</li>)}
              </ul>
              <Button href="#get-started" variant={p.highlight ? 'primary' : 'dark'} className="mt-8 w-full" event={`cta_pricing_${p.name.toLowerCase().replace(/\s/g, '_')}`}>{p.cta}</Button>
            </article>
          ))}
        </div>
        <p className="reveal mx-auto mt-10 max-w-2xl text-center text-sm text-muted">
          Prices in USD, billed monthly, cancel any time. Managing many sites or a maintenance team? <a href="#contact" className="focus-ring rounded font-semibold text-ink underline underline-offset-4">Talk to us about Business</a>.
        </p>
      </div>
    </section>
  )
}
