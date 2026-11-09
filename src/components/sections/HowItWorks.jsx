import SectionHeader from '../ui/SectionHeader'
import { steps } from '../../data/content'

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-ink py-20 text-paper lg:py-28" aria-labelledby="how-title">
      <div className="container-x">
        <SectionHeader dark id="how-title" eyebrow="How it works" title="Five steps from broken to fixed." intro="The whole journey runs in the browser on any phone or computer — nothing to install." />
        <ol className="mt-14 grid gap-6 md:grid-cols-5">
          {steps.map((s, i) => (
            <li key={s.title} className="reveal relative">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-amber/40 bg-amber/10 text-amber"><s.icon className="h-5 w-5" /></span>
                {i < steps.length - 1 && <span className="hidden h-px flex-1 bg-gradient-to-r from-amber/50 to-white/10 md:block" />}
              </div>
              <p className="mt-5 text-xs font-semibold text-mist">Step {i + 1}</p>
              <h3 className="mt-1 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
