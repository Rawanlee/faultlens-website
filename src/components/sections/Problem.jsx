import { X, Check } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import { problems } from '../../data/content'

export default function Problem() {
  return (
    <section id="problem" className="bg-paper-2 py-20 lg:py-28" aria-labelledby="problem-title">
      <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeader
          id="problem-title"
          eyebrow="The problem"
          title="Getting something fixed fails at the description."
          intro="People can see that something is broken but rarely know what the fault is called or which trade repairs it. Technicians arrive without detail, diagnose on the first visit and return with parts on the second. Every extra call-out costs the customer money and the technician a paid slot."
        />
        <div className="reveal overflow-hidden rounded-2xl border border-ink/10 bg-white">
          <div className="grid grid-cols-2 border-b border-ink/10 text-xs font-semibold uppercase tracking-wider">
            <p className="px-5 py-3 text-muted">Without Faultlens</p>
            <p className="border-l border-ink/10 px-5 py-3 text-fix-deep">With Faultlens</p>
          </div>
          {problems.map((p, i) => (
            <div key={i} className="grid grid-cols-2 border-b border-ink/10 last:border-0">
              <p className="flex gap-2.5 px-5 py-5 text-sm leading-relaxed text-muted"><X className="mt-0.5 h-4 w-4 shrink-0 text-[#E5484D]" />{p.before}</p>
              <p className="flex gap-2.5 border-l border-ink/10 px-5 py-5 text-sm leading-relaxed text-ink"><Check className="mt-0.5 h-4 w-4 shrink-0 text-fix" />{p.after}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
