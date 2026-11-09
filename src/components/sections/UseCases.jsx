import SectionHeader from '../ui/SectionHeader'
import { segments } from '../../data/content'

export default function UseCases() {
  return (
    <section id="who" className="bg-paper-2 py-20 lg:py-28" aria-labelledby="who-title">
      <div className="container-x">
        <SectionHeader id="who-title" eyebrow="Who it’s for" title="Built for the people who report faults — and the people who fix them." />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {segments.map((s) => (
            <article key={s.who} className="reveal flex gap-5 rounded-2xl border border-ink/10 bg-white p-6">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-amber/15 text-amber-deep"><s.icon className="h-6 w-6" /></span>
              <div>
                <h3 className="text-xl font-semibold">{s.who}</h3>
                <dl className="mt-3 space-y-2 text-sm leading-relaxed">
                  <div><dt className="inline font-semibold text-ink">Problem: </dt><dd className="inline text-muted">{s.problem}</dd></div>
                  <div><dt className="inline font-semibold text-ink">How they use it: </dt><dd className="inline text-muted">{s.use}</dd></div>
                  <div><dt className="inline font-semibold text-fix-deep">Result: </dt><dd className="inline text-muted">{s.benefit}</dd></div>
                </dl>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
