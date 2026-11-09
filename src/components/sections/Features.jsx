import SectionHeader from '../ui/SectionHeader'
import FaultScene from '../ui/FaultScene'
import { features } from '../../data/content'

function ReelVisual() {
  return (
    <div className="mt-6 flex gap-3" aria-hidden="true">
      {['pipe', 'ac', 'phone'].map((k, i) => (
        <div key={k} className="relative w-1/3 overflow-hidden rounded-xl border border-ink/10">
          <FaultScene kind={k} className="block w-full" />
          <span className="absolute bottom-1.5 right-1.5 rounded bg-ink/80 px-1.5 text-[10px] font-semibold text-paper">0:1{i + 1}</span>
        </div>
      ))}
    </div>
  )
}

function BriefVisual() {
  return (
    <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-ink/10 bg-ink/10 text-sm" aria-hidden="true">
      {[['Item', 'Split AC indoor unit'], ['Likely cause', 'Blocked condensate drain'], ['Urgency', 'Medium'], ['Trade', 'HVAC · drain lines']].map(([k, v]) => (
        <div key={k} className="bg-white p-3"><dt className="text-[10px] uppercase tracking-wider text-muted">{k}</dt><dd className="mt-0.5 font-medium text-ink">{v}</dd></div>
      ))}
    </dl>
  )
}

export default function Features() {
  return (
    <section id="product" className="bg-paper py-20 lg:py-28" aria-labelledby="features-title">
      <div className="container-x">
        <SectionHeader
          id="features-title"
          eyebrow="Product"
          title="From a shaky phone video to the right repair."
          intro="Each part of Faultlens removes one reason repairs go wrong: an unclear description, the wrong trade, a missing part or no record afterwards."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <article key={f.name} className={`reveal rounded-2xl border border-ink/10 bg-white p-6 ${i === 0 ? 'lg:col-span-2' : ''} ${i === 6 ? 'md:col-span-2' : ''}`}>
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-ink text-amber"><f.icon className="h-5 w-5" /></span>
              <h3 className="mt-5 text-xl font-semibold text-ink">{f.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/80">{f.what}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{f.why}</p>
              {i === 0 && <ReelVisual />}
              {i === 1 && <BriefVisual />}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
