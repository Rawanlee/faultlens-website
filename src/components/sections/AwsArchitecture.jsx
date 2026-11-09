import { ChevronRight } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import { awsStages, awsServices, awsPrinciples } from '../../data/content'

export default function AwsArchitecture() {
  return (
    <section id="aws" className="bg-paper py-20 lg:py-28" aria-labelledby="aws-title">
      <div className="container-x">
        <SectionHeader
          id="aws-title"
          eyebrow="Technology"
          title="How We Use Amazon Web Services"
          intro="Every Fault Reel is a small video-processing job: it has to be stored privately, transcoded, analysed by vision and speech models, turned into a brief and routed to the right technicians within minutes. Faultlens’ architecture on AWS uses serverless, event-driven services so each reel moves through that pipeline independently and cost scales with the number of faults reported."
        />

        {/* Pipeline diagram */}
        <ol className="reveal mt-14 grid gap-3 lg:grid-cols-5" aria-label="Faultlens processing pipeline">
          {awsStages.map((s, i) => (
            <li key={s.stage} className="relative flex flex-col rounded-2xl border border-ink/10 bg-white p-5">
              <div className="flex items-center gap-2">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-ink text-xs font-bold text-amber">{i + 1}</span>
                <h3 className="font-sans text-sm font-semibold uppercase tracking-wider">{s.stage}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">{s.text}</p>
              <ul className="mt-auto flex flex-wrap gap-1.5 pt-4">
                {s.services.map((svc) => <li key={svc} className="rounded-md bg-amber/15 px-2 py-1 text-[11px] font-semibold text-amber-deep">{svc}</li>)}
              </ul>
              {i < awsStages.length - 1 && <ChevronRight className="absolute -right-3 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 rounded-full bg-paper text-ink/40 lg:block" aria-hidden="true" />}
            </li>
          ))}
        </ol>

        {/* Workflow */}
        <div className="reveal mt-10 rounded-2xl bg-ink p-6 font-mono text-[13px] leading-7 text-mist sm:p-8">
          <p className="mb-2 font-sans text-xs font-semibold uppercase tracking-wider text-amber">Fault Reel workflow</p>
          <p>Browser upload (signed URL) → <span className="text-paper">S3 private bucket</span> → S3 event → <span className="text-paper">Step Functions</span></p>
          <p className="pl-4">→ MediaConvert (normalise, key frames, audio) → Rekognition (labels, text) ∥ Transcribe (narration)</p>
          <p className="pl-4">→ Bedrock (structured fault brief + safety flags) → DynamoDB (job + brief)</p>
          <p>Customer confirms brief → <span className="text-paper">API Gateway → Lambda</span> matching → SNS / SES alerts → technicians quote → booking</p>
          <p>Repair complete → fix clip → MediaConvert before/after repair reel → CloudFront delivery</p>
        </div>

        {/* Service list */}
        <div className="mt-14 grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div className="reveal">
            <h3 className="text-2xl font-semibold">AWS services and their role</h3>
            <ul className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
              {awsServices.map(([name, purpose]) => (
                <li key={name} className="py-3.5 text-sm leading-relaxed"><strong className="font-semibold text-ink">{name}:</strong> <span className="text-muted">{purpose}</span></li>
              ))}
            </ul>
          </div>
          <div className="space-y-5">
            {awsPrinciples.map((p) => (
              <article key={p.title} className="reveal rounded-2xl border border-ink/10 bg-white p-6">
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
