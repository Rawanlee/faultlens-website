import { ArrowRight, BadgeCheck } from 'lucide-react'
import FaultScene from '../ui/FaultScene'
import SectionHeader from '../ui/SectionHeader'
import { scenes } from '../../data/content'

export default function Scenes() {
  return (
    <section id="faults" className="bg-paper py-20 lg:py-28" aria-labelledby="faults-title">
      <div className="container-x">
        <SectionHeader
          id="faults-title"
          eyebrow="Before the right technician"
          title="Everyday faults, matched to the people who fix them."
          intro="Most repair delays start with the wrong person turning up. Faultlens reads what is actually broken and sends it to the trade and skill that fixes it."
        />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {scenes.map((s) => (
            <li key={s.kind} className="reveal group overflow-hidden rounded-2xl border border-ink/10 bg-white">
              <div className="grid grid-cols-2">
                <figure className="relative">
                  <FaultScene kind={s.kind} className="block h-auto w-full" title={`Before: ${s.fault}`} />
                  <figcaption className="absolute left-2 top-2 rounded-full bg-amber px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ink">Faulty</figcaption>
                </figure>
                <figure className="relative">
                  <FaultScene kind={s.kind} fixed className="block h-auto w-full" title={`After: repaired by a ${s.trade.toLowerCase()}`} />
                  <figcaption className="absolute left-2 top-2 rounded-full bg-fix px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">Fixed</figcaption>
                </figure>
              </div>
              <div className="p-5">
                <p className="text-sm font-semibold text-ink">{s.fault}</p>
                <p className="mt-3 flex items-center gap-2 text-sm text-muted">
                  <ArrowRight className="h-4 w-4 text-amber-deep" />
                  <BadgeCheck className="h-4 w-4 text-fix" />
                  <span><span className="font-medium text-ink">{s.trade}</span> · {s.skill}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
