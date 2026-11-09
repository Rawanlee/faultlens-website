import SectionHeader from '../ui/SectionHeader'
import { aiFlow } from '../../data/content'

export default function AICapabilities() {
  return (
    <section id="ai" className="bg-paper py-20 lg:py-28" aria-labelledby="ai-title">
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeader
          id="ai-title"
          eyebrow="Where the AI is used"
          title="AI that describes the fault. People who confirm it."
          intro="Faultlens uses computer vision, speech recognition and a foundation model for one job: turning a short video into a fault brief clear enough to match and quote. Every brief is reviewed by the customer and confirmed on site by the technician."
        />
        <ol className="reveal relative space-y-0 border-l-2 border-ink/10 pl-8">
          {aiFlow.map((a, i) => (
            <li key={a.label} className="relative pb-7 last:pb-0">
              <span className={`absolute -left-[2.55rem] top-0.5 grid h-6 w-6 place-items-center rounded-full text-[11px] font-bold ${i === 4 ? 'bg-fix text-white' : 'bg-ink text-amber'}`}>{i + 1}</span>
              <h3 className="font-sans text-base font-semibold tracking-normal">{a.label}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{a.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
