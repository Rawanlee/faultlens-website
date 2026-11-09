import { useState } from 'react'
import { Copy, Check, Download, AlertTriangle } from 'lucide-react'
import useSeo from '../hooks/useSeo'
import { company } from '../data/company'
import { brandAssets, palette, linkedin, founderKit, businessDetails, activate, toVerify, overview } from '../data/kit'

function CopyButton({ text, label = 'Copy' }) {
  const [done, setDone] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setDone(true)
      setTimeout(() => setDone(false), 1500)
    } catch {
      window.prompt('Copy this text:', text)
    }
  }
  return (
    <button onClick={copy} className="focus-ring inline-flex shrink-0 items-center gap-1.5 rounded-full border border-ink/15 bg-white px-3 py-1.5 text-xs font-semibold text-ink hover:bg-paper" aria-label={`${label}${done ? ' (copied)' : ''}`}>
      {done ? <Check className="h-3.5 w-3.5 text-fix" /> : <Copy className="h-3.5 w-3.5" />}{done ? 'Copied' : label}
    </button>
  )
}

function Count({ text, max }) {
  const n = text.length
  return <span className={`text-xs font-semibold ${n > max ? 'text-[#B42328]' : 'text-fix-deep'}`}>{n} / {max} characters</span>
}

const Block = ({ id, title, intro, children }) => (
  <section id={id} className="scroll-mt-24 border-t border-ink/10 py-14">
    <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
    {intro && <p className="mt-2 max-w-3xl text-sm text-muted">{intro}</p>}
    <div className="mt-8">{children}</div>
  </section>
)

const toc = [['brand', 'Logo and banners'], ['palette', 'Brand colours'], ['linkedin', 'LinkedIn company profile'], ['founders', 'Founder profiles'], ['aws', 'AWS Activate answers'], ['overview', 'Startup overview'], ['verify', 'Check before submitting']]

export default function AppKit() {
  useSeo('/app')
  const specialties = linkedin.specialties.join(', ')
  const activateText = activate.map((a) => `${a.q}. ${a.field}: ${a.answer.join(' | ')}`).join('\n')

  return (
    <div className="bg-paper">
      <div className="bg-ink text-paper">
        <div className="container-x py-14">
          <p className="eyebrow text-amber">Faultlens · internal</p>
          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Launch kit</h1>
          <p className="mt-3 max-w-2xl text-mist">Everything needed to complete the LinkedIn company page and the AWS Activate application in one place. All content matches the public website at {company.domain}. This page is not linked from the site and is excluded from search engines.</p>
          <nav aria-label="Kit sections" className="mt-8 flex flex-wrap gap-2">
            {toc.map(([id, label]) => <a key={id} href={`#${id}`} className="focus-ring rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-paper/90 hover:bg-white/10">{label}</a>)}
          </nav>
        </div>
      </div>

      <div className="container-x">
        <Block id="brand" title="Logo and banners" intro="Download links serve the files straight from this website. Use the PNGs for LinkedIn uploads and the SVGs for print or design tools.">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {brandAssets.map((a) => (
              <figure key={a.title} className={`overflow-hidden rounded-2xl border border-ink/10 bg-white ${a.wide ? 'md:col-span-2 lg:col-span-3' : ''}`}>
                <div className={`grid place-items-center p-6 ${a.bg === 'dark' ? 'bg-ink' : 'bg-paper-2'}`}>
                  <img src={a.preview} alt={`Faultlens ${a.title}`} className={`${a.wide ? 'w-full' : 'max-h-40'} h-auto rounded-md`} loading="lazy" />
                </div>
                <figcaption className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div><p className="font-semibold text-ink">{a.title}</p><p className="text-xs text-muted">{a.note}</p></div>
                  <div className="flex flex-wrap gap-2">
                    {a.files.map(([label, href]) => (
                      <a key={href} href={href} download className="focus-ring inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-xs font-semibold text-paper hover:bg-ink-3"><Download className="h-3.5 w-3.5" />{label}</a>
                    ))}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </Block>

        <Block id="palette" title="Brand colours" intro="Derived from the logo: Ink for structure, Signal Amber for the fault, Fix Green for the repair.">
          <ul className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {palette.map(([name, hex, use]) => (
              <li key={hex} className="overflow-hidden rounded-2xl border border-ink/10 bg-white">
                <div className="h-20" style={{ background: hex }} />
                <div className="p-3"><p className="text-sm font-semibold">{name}</p><p className="font-mono text-xs text-muted">{hex}</p><p className="mt-1 text-[11px] text-muted">{use}</p><div className="mt-2"><CopyButton text={hex} label="Copy hex" /></div></div>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted">Typography: Space Grotesk (headings) and Inter (body), both free on Google Fonts.</p>
        </Block>

        <Block id="linkedin" title="LinkedIn company profile" intro="Paste each field into LinkedIn → Admin tools → Edit page. Upload the square logo and the 1128 × 191 banner from above.">
          <dl className="divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-white">
            {linkedin.fields.map(([k, v]) => (
              <div key={k} className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
                <dt className="w-40 text-sm font-semibold text-ink">{k}</dt>
                <dd className="flex-1 text-sm text-ink/80">{v}</dd>
                <CopyButton text={v} />
              </div>
            ))}
            <div className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
              <dt className="w-40 text-sm font-semibold text-ink">Headquarters</dt>
              <dd className="flex-1 text-sm text-amber-deep">Not supplied — add your city and country.</dd>
            </div>
          </dl>

          <div className="mt-6 rounded-2xl border border-ink/10 bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-3"><h3 className="font-sans text-base font-semibold tracking-normal">Tagline</h3><div className="flex items-center gap-3"><Count text={linkedin.tagline} max={120} /><CopyButton text={linkedin.tagline} /></div></div>
            <p className="mt-3 text-sm text-ink/85">{linkedin.tagline}</p>
          </div>
          <div className="mt-6 rounded-2xl border border-ink/10 bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-3"><h3 className="font-sans text-base font-semibold tracking-normal">Overview</h3><div className="flex items-center gap-3"><Count text={linkedin.overview} max={2000} /><CopyButton text={linkedin.overview} /></div></div>
            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-ink/85">{linkedin.overview}</p>
          </div>
          <div className="mt-6 rounded-2xl border border-ink/10 bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-3"><h3 className="font-sans text-base font-semibold tracking-normal">Specialties ({linkedin.specialties.length} of 20)</h3><CopyButton text={specialties} label="Copy all" /></div>
            <ul className="mt-3 flex flex-wrap gap-2">{linkedin.specialties.map((s) => <li key={s} className="rounded-full bg-paper-2 px-3 py-1 text-xs font-medium">{s}</li>)}</ul>
          </div>
        </Block>

        <Block id="founders" title="Founder profiles" intro="Suggested headlines and experience entries so personal profiles match the company page. Use the 1584 × 396 banner on personal profiles.">
          <ul className="space-y-4">
            {founderKit.map(([k, v]) => (
              <li key={k} className="flex flex-col gap-3 rounded-2xl border border-ink/10 bg-white p-5 sm:flex-row sm:items-start sm:justify-between">
                <div><p className="text-sm font-semibold">{k}</p><p className="mt-1 text-sm text-ink/80">{v}</p></div>
                <CopyButton text={v} />
              </li>
            ))}
          </ul>
        </Block>

        <Block id="aws" title="AWS Activate application" intro="Answers chosen only from the form’s option lists, in form order. Items marked ASSUMED need your confirmation.">
          <details className="rounded-2xl border border-ink/10 bg-white p-5">
            <summary className="cursor-pointer text-sm font-semibold">Business details used for these answers</summary>
            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              {businessDetails.map(([k, v]) => <div key={k}><dt className="font-semibold">{k}</dt><dd className="text-muted">{v}</dd></div>)}
            </dl>
          </details>
          <div className="mt-4 flex justify-end"><CopyButton text={activateText} label="Copy all answers" /></div>
          <ol className="mt-4 space-y-4">
            {activate.map((a) => (
              <li key={a.q} className="rounded-2xl border border-ink/10 bg-white p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3 className="font-sans text-base font-semibold tracking-normal"><span className="text-amber-deep">{a.q}.</span> {a.field}</h3>
                  <div className="flex items-center gap-3">{a.count && <Count text={a.answer[0]} max={250} />}<CopyButton text={a.answer.join(a.count ? '' : '\n')} /></div>
                </div>
                {a.answer.length > 1 ? (
                  <ul className="mt-3 flex flex-wrap gap-2">{a.answer.map((x) => <li key={x} className="rounded-full bg-amber/15 px-3 py-1 text-xs font-semibold text-ink">{x}</li>)}</ul>
                ) : (
                  <p className="mt-3 rounded-lg bg-paper px-3 py-2 text-sm font-semibold text-ink">{a.answer[0]}</p>
                )}
                <p className={`mt-3 text-xs ${a.reason.startsWith('ASSUMED') ? 'font-semibold text-amber-deep' : 'text-muted'}`}>{a.reason}</p>
              </li>
            ))}
          </ol>
        </Block>

        <Block id="overview" title="Startup overview" intro="A one-paragraph summary for accelerator forms, emails and partner introductions.">
          <div className="rounded-2xl border border-ink/10 bg-white p-5">
            <div className="flex justify-end"><CopyButton text={overview} /></div>
            <p className="mt-2 text-sm leading-relaxed text-ink/85">{overview}</p>
          </div>
        </Block>

        <Block id="verify" title="Check before submitting">
          <ul className="space-y-3">
            {toVerify.map((t) => <li key={t} className="flex gap-3 rounded-xl border border-amber/40 bg-amber/10 p-4 text-sm"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-deep" />{t}</li>)}
          </ul>
        </Block>
      </div>
    </div>
  )
}
