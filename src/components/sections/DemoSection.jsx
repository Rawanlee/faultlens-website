import SectionHeader from '../ui/SectionHeader'
import Demo from '../dashboard/Demo'

export default function DemoSection() {
  return (
    <section id="demo" className="bg-ink py-20 text-paper lg:py-28" aria-labelledby="demo-title">
      <div className="container-x">
        <SectionHeader
          dark
          id="demo-title"
          eyebrow="Interactive demo"
          title="Try the Faultlens workspace."
          intro="Pick a Fault Reel, run the analysis, edit the brief, then compare matched technicians and request a quote. This demo runs in your browser with fictional sample data — no video is uploaded and no AI service is called."
        />
        <div className="reveal mt-12"><Demo /></div>
      </div>
    </section>
  )
}
