import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Video, Users, ClipboardList, Clapperboard, Search, Star, MapPin, X, Loader2, Check,
  ShieldAlert, Pencil, ArrowRight, Clock, Sparkles,
} from 'lucide-react'
import FaultScene from '../ui/FaultScene'
import SampleBadge from '../ui/SampleBadge'
import { reels, technicians, jobs as initialJobs, activity as initialActivity } from '../../data/demo'
import { track } from '../../lib/analytics'

const TABS = [
  { id: 'reels', label: 'Fault Reels', icon: Video },
  { id: 'matches', label: 'Matches', icon: Users },
  { id: 'jobs', label: 'Jobs', icon: ClipboardList },
  { id: 'repairs', label: 'Repair reels', icon: Clapperboard },
]
const PIPELINE = ['Uploading reel', 'Extracting key frames', 'Reading labels and error codes', 'Transcribing narration', 'Drafting fault brief']
const URGENCY = {
  Urgent: 'bg-[#E5484D]/15 text-[#B42328]',
  High: 'bg-amber/20 text-amber-deep',
  Medium: 'bg-[#5AA9E6]/15 text-[#2C6E9E]',
  Low: 'bg-ink/5 text-muted',
}
const STATUS = {
  'Quote requested': 'bg-amber/20 text-amber-deep',
  Quoting: 'bg-amber/20 text-amber-deep',
  Booked: 'bg-[#5AA9E6]/15 text-[#2C6E9E]',
  'In progress': 'bg-[#8B5CF6]/15 text-[#6D3FD6]',
  Completed: 'bg-fix/15 text-fix-deep',
}
const Pill = ({ className, children }) => <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ${className}`}>{children}</span>

function Modal({ title, onClose, children }) {
  const ref = useRef(null)
  useEffect(() => {
    ref.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
  return (
    <div className="absolute inset-0 z-20 grid place-items-center bg-ink/60 p-4" onClick={onClose}>
      <div ref={ref} tabIndex={-1} role="dialog" aria-modal="true" aria-label={title} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl outline-none" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-4">
          <h4 className="font-display text-lg font-semibold text-ink">{title}</h4>
          <button onClick={onClose} className="focus-ring rounded p-1 text-muted hover:text-ink" aria-label="Close"><X className="h-5 w-5" /></button>
        </div>
        {children}
      </div>
    </div>
  )
}

function ReelsTab({ onConfirm }) {
  const [selected, setSelected] = useState(reels[0].id)
  const [progress, setProgress] = useState({}) // id -> step index (PIPELINE.length = done)
  const [edits, setEdits] = useState({})
  const [editing, setEditing] = useState(false)
  const timers = useRef([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const reel = reels.find((r) => r.id === selected)
  const step = progress[reel.id]
  const done = step === PIPELINE.length
  const cause = edits[reel.id] ?? reel.brief.cause

  const analyse = () => {
    track('demo_analyse_reel', { reel: reel.id })
    PIPELINE.forEach((_, i) => {
      timers.current.push(setTimeout(() => setProgress((p) => ({ ...p, [reel.id]: i + 1 })), 450 * (i + 1)))
    })
    setProgress((p) => ({ ...p, [reel.id]: 0 }))
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[230px_1fr]">
      <ul className="flex gap-3 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible" aria-label="Fault Reels">
        {reels.map((r) => (
          <li key={r.id} className="shrink-0">
            <button
              onClick={() => { setSelected(r.id); setEditing(false) }}
              aria-pressed={selected === r.id}
              className={`focus-ring flex w-56 items-center gap-3 rounded-xl border p-2 text-left transition-colors lg:w-full ${selected === r.id ? 'border-amber bg-amber/10' : 'border-ink/10 bg-white hover:bg-paper'}`}
            >
              <FaultScene kind={r.kind} className="h-11 w-16 shrink-0 rounded-md" />
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold text-ink">{r.item}</span>
                <span className="text-xs text-muted">{r.id} · {r.length}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="overflow-hidden rounded-xl border border-ink/10 bg-white">
          <div className="relative">
            <FaultScene kind={reel.kind} className="block w-full" title={`Fault Reel of ${reel.item}`} />
            {step !== undefined && !done && <div className="pointer-events-none absolute inset-0 overflow-hidden"><div className="scanline h-1/3 w-full bg-gradient-to-b from-transparent via-amber/30 to-transparent" /></div>}
            <span className="absolute bottom-2 right-2 rounded bg-ink/80 px-1.5 text-[11px] font-semibold text-paper">{reel.length}</span>
          </div>
          <div className="p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">Narration</p>
            <p className="mt-1 text-sm italic text-ink/80">{reel.narration}</p>
            {done && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {reel.detected.map((d) => <Pill key={d} className="bg-ink/5 text-ink/70">{d}</Pill>)}
              </div>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-ink/10 bg-white p-5" aria-live="polite">
          {step === undefined && (
            <div className="flex h-full flex-col items-start justify-center gap-3 py-6">
              <Sparkles className="h-6 w-6 text-amber-deep" />
              <p className="font-display text-lg font-semibold text-ink">Generate a fault brief</p>
              <p className="text-sm text-muted">Run the simulated analysis pipeline on this sample reel.</p>
              <button onClick={analyse} className="focus-ring mt-1 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-paper hover:bg-ink-3">Analyse reel <ArrowRight className="h-4 w-4" /></button>
            </div>
          )}
          {step !== undefined && !done && (
            <ol className="space-y-3 py-2">
              {PIPELINE.map((p, i) => (
                <li key={p} className="flex items-center gap-3 text-sm">
                  {i < step ? <Check className="h-4 w-4 text-fix" /> : i === step ? <Loader2 className="h-4 w-4 animate-spin text-amber-deep" /> : <span className="h-4 w-4 rounded-full border border-ink/20" />}
                  <span className={i <= step ? 'text-ink' : 'text-muted'}>{p}</span>
                </li>
              ))}
            </ol>
          )}
          {done && (
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-display text-lg font-semibold text-ink">Fault brief</p>
                <Pill className={URGENCY[reel.brief.urgency]}>{reel.brief.urgency} urgency</Pill>
              </div>
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-wider text-muted">Likely cause</p>
              {editing ? (
                <textarea aria-label="Edit likely cause" value={cause} onChange={(e) => setEdits((x) => ({ ...x, [reel.id]: e.target.value }))} rows={3} className="focus-ring mt-1 w-full rounded-lg border border-ink/20 p-2 text-sm" />
              ) : (
                <p className="mt-1 text-sm font-medium text-ink">{cause}</p>
              )}
              <p className="mt-3 text-xs text-muted">Also possible: {reel.brief.alternatives.join(' · ')}</p>
              <div className="mt-3 flex items-center gap-3">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink/10"><div className="h-full rounded-full bg-amber" style={{ width: `${reel.brief.confidence * 100}%` }} /></div>
                <span className="text-xs font-semibold text-ink">{Math.round(reel.brief.confidence * 100)}% confidence</span>
              </div>
              <p className="mt-4 flex gap-2 rounded-lg bg-[#E5484D]/8 p-3 text-sm text-[#8F1D21]"><ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />{reel.brief.safety}</p>
              <p className="mt-4 text-sm text-ink"><span className="font-semibold">Trade needed:</span> {reel.brief.trade} · {reel.brief.skills.join(', ')}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <button onClick={() => setEditing((v) => !v)} className="focus-ring inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-3.5 py-2 text-sm font-semibold text-ink hover:bg-paper"><Pencil className="h-3.5 w-3.5" />{editing ? 'Save edit' : 'Edit brief'}</button>
                <button onClick={() => { track('demo_confirm_brief'); onConfirm(reel) }} className="focus-ring inline-flex items-center gap-1.5 rounded-full bg-amber px-3.5 py-2 text-sm font-semibold text-ink hover:bg-[#ffc14d]">Confirm and find technicians <ArrowRight className="h-4 w-4" /></button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function MatchesTab({ trade, setTrade, requested, onRequest }) {
  const [q, setQ] = useState('')
  const [sort, setSort] = useState('match')
  const [open, setOpen] = useState(null)
  const trades = ['All', ...new Set(technicians.map((t) => t.trade))]

  const list = useMemo(() => {
    let l = technicians.filter((t) => (trade === 'All' || t.trade === trade) && (`${t.name} ${t.skills.join(' ')}`.toLowerCase().includes(q.toLowerCase())))
    if (sort === 'distance') l = [...l].sort((a, b) => a.km - b.km)
    if (sort === 'rating') l = [...l].sort((a, b) => b.rating - a.rating)
    if (sort === 'match') l = [...l].sort((a, b) => (b.rating * 10 - b.km) - (a.rating * 10 - a.km))
    return l
  }, [trade, q, sort])
  const tech = technicians.find((t) => t.id === open)

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative flex-1">
          <span className="sr-only">Search technicians</span>
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name or skill" className="focus-ring w-full rounded-full border border-ink/15 bg-white py-2 pl-9 pr-3 text-sm" />
        </label>
        <label className="text-sm"><span className="sr-only">Trade</span>
          <select value={trade} onChange={(e) => setTrade(e.target.value)} className="focus-ring rounded-full border border-ink/15 bg-white px-3 py-2 text-sm">
            {trades.map((t) => <option key={t}>{t}</option>)}
          </select>
        </label>
        <label className="text-sm"><span className="sr-only">Sort by</span>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="focus-ring rounded-full border border-ink/15 bg-white px-3 py-2 text-sm">
            <option value="match">Best match</option><option value="distance">Nearest</option><option value="rating">Highest rated</option>
          </select>
        </label>
      </div>
      {list.length === 0 ? (
        <p className="mt-8 rounded-xl border border-dashed border-ink/20 p-8 text-center text-sm text-muted">No technicians match that search. Try another skill or trade.</p>
      ) : (
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {list.map((t) => (
            <li key={t.id} className="flex items-center gap-4 rounded-xl border border-ink/10 bg-white p-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink text-sm font-bold text-amber">{t.name.split(' ').map((n) => n[0]).join('')}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-ink">{t.name} <span className="font-normal text-muted">· {t.trade}</span></p>
                <p className="mt-0.5 flex flex-wrap items-center gap-x-3 text-xs text-muted">
                  <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{t.km} km</span>
                  <span className="inline-flex items-center gap-1"><Star className="h-3 w-3 fill-amber text-amber" />{t.rating}</span>
                  <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{t.available}</span>
                </p>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                {requested.includes(t.id) ? <Pill className={STATUS['Quote requested']}>Quote requested</Pill> : <span className="text-xs font-semibold text-ink">{t.quote}</span>}
                <button onClick={() => setOpen(t.id)} className="focus-ring rounded-full border border-ink/15 px-3 py-1 text-xs font-semibold text-ink hover:bg-paper">View</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {tech && (
        <Modal title={tech.name} onClose={() => setOpen(null)}>
          <p className="mt-1 text-sm text-muted">{tech.trade} · {tech.km} km away · {tech.jobs} completed jobs</p>
          <p className="mt-4 text-[11px] font-semibold uppercase tracking-wider text-muted">Verified skills</p>
          <div className="mt-2 flex flex-wrap gap-1.5">{tech.skills.map((s) => <Pill key={s} className="bg-fix/10 text-fix-deep">{s}</Pill>)}</div>
          <dl className="mt-5 grid grid-cols-3 gap-3 text-center text-sm">
            <div className="rounded-lg bg-paper p-3"><dt className="text-[11px] text-muted">Rating</dt><dd className="font-semibold">★ {tech.rating}</dd></div>
            <div className="rounded-lg bg-paper p-3"><dt className="text-[11px] text-muted">Available</dt><dd className="font-semibold">{tech.available}</dd></div>
            <div className="rounded-lg bg-paper p-3"><dt className="text-[11px] text-muted">Typical quote</dt><dd className="font-semibold">{tech.quote}</dd></div>
          </dl>
          <button
            disabled={requested.includes(tech.id)}
            onClick={() => { onRequest(tech); setOpen(null) }}
            className="focus-ring mt-6 w-full rounded-full bg-amber py-3 text-sm font-semibold text-ink hover:bg-[#ffc14d] disabled:cursor-not-allowed disabled:bg-ink/10 disabled:text-muted"
          >
            {requested.includes(tech.id) ? 'Quote already requested' : 'Request a quote'}
          </button>
        </Modal>
      )}
    </div>
  )
}

function JobsTab({ jobs }) {
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('All')
  const [open, setOpen] = useState(null)
  const statuses = ['All', 'Quote requested', 'Quoting', 'Booked', 'In progress', 'Completed']
  const list = jobs.filter((j) => (status === 'All' || j.status === status) && `${j.id} ${j.item} ${j.property} ${j.tech}`.toLowerCase().includes(q.toLowerCase()))
  const job = jobs.find((j) => j.id === open)

  return (
    <div>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <label className="relative lg:w-64">
          <span className="sr-only">Search jobs</span>
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search jobs" className="focus-ring w-full rounded-full border border-ink/15 bg-white py-2 pl-9 pr-3 text-sm" />
        </label>
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by status">
          {statuses.map((s) => (
            <button key={s} onClick={() => setStatus(s)} aria-pressed={status === s} className={`focus-ring rounded-full px-3 py-1.5 text-xs font-semibold ${status === s ? 'bg-ink text-paper' : 'bg-white text-muted ring-1 ring-ink/10 hover:text-ink'}`}>{s}</button>
          ))}
        </div>
      </div>
      <div className="mt-4 overflow-x-auto rounded-xl border border-ink/10 bg-white">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-ink/10 text-[11px] uppercase tracking-wider text-muted">
            <tr><th className="px-4 py-3 font-semibold">Job</th><th className="px-4 py-3 font-semibold">Property</th><th className="px-4 py-3 font-semibold">Technician</th><th className="px-4 py-3 font-semibold">Urgency</th><th className="px-4 py-3 font-semibold">Status</th><th className="px-4 py-3 font-semibold">Quote</th></tr>
          </thead>
          <tbody>
            {list.map((j) => (
              <tr key={j.id} className="cursor-pointer border-b border-ink/5 last:border-0 hover:bg-paper" onClick={() => setOpen(j.id)}>
                <td className="px-4 py-3"><button className="focus-ring rounded text-left" onClick={(e) => { e.stopPropagation(); setOpen(j.id) }}><span className="font-semibold text-ink">{j.item}</span><span className="block text-xs text-muted">{j.id} · {j.date}</span></button></td>
                <td className="px-4 py-3 text-muted">{j.property}</td>
                <td className="px-4 py-3 text-ink">{j.tech}</td>
                <td className="px-4 py-3"><Pill className={URGENCY[j.urgency]}>{j.urgency}</Pill></td>
                <td className="px-4 py-3"><Pill className={STATUS[j.status]}>{j.status}</Pill></td>
                <td className="px-4 py-3 font-semibold">{j.quote}</td>
              </tr>
            ))}
            {list.length === 0 && <tr><td colSpan={6} className="px-4 py-10 text-center text-muted">No jobs match this filter.</td></tr>}
          </tbody>
        </table>
      </div>
      {job && (
        <Modal title={`${job.id} · ${job.item}`} onClose={() => setOpen(null)}>
          <ol className="mt-5 space-y-3 text-sm">
            {['Fault Reel submitted', 'Fault brief confirmed', 'Quote received', 'Booked', 'In progress', 'Completed'].map((s, i) => {
              const reached = i <= { 'Quote requested': 1, Quoting: 1, Booked: 3, 'In progress': 4, Completed: 5 }[job.status]
              return (
                <li key={s} className="flex items-center gap-3">
                  <span className={`grid h-5 w-5 place-items-center rounded-full ${reached ? 'bg-fix text-white' : 'border border-ink/20'}`}>{reached && <Check className="h-3 w-3" />}</span>
                  <span className={reached ? 'text-ink' : 'text-muted'}>{s}</span>
                </li>
              )
            })}
          </ol>
          <p className="mt-5 text-sm text-muted">{job.property} · Technician: {job.tech} · Quote: {job.quote}</p>
        </Modal>
      )}
    </div>
  )
}

function RepairsTab() {
  const done = reels.slice(1)
  const [after, setAfter] = useState({})
  return (
    <ul className="grid gap-4 md:grid-cols-3">
      {done.map((r) => (
        <li key={r.id} className="overflow-hidden rounded-xl border border-ink/10 bg-white">
          <div className="relative">
            <FaultScene kind={r.kind} fixed={!!after[r.id]} className="block w-full" title={`${after[r.id] ? 'After' : 'Before'} repair: ${r.item}`} />
            <Pill className={`absolute left-2 top-2 ${after[r.id] ? 'bg-fix text-white' : 'bg-amber text-ink'}`}>{after[r.id] ? 'After' : 'Before'}</Pill>
          </div>
          <div className="flex items-center justify-between gap-3 p-4">
            <div className="min-w-0"><p className="truncate text-sm font-semibold text-ink">{r.item}</p><p className="text-xs text-muted">{r.brief.trade} · repair reel</p></div>
            <button onClick={() => setAfter((a) => ({ ...a, [r.id]: !a[r.id] }))} className="focus-ring shrink-0 rounded-full border border-ink/15 px-3 py-1.5 text-xs font-semibold hover:bg-paper">{after[r.id] ? 'Show before' : 'Show after'}</button>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default function Demo() {
  const [tab, setTab] = useState('reels')
  const [trade, setTrade] = useState('All')
  const [requested, setRequested] = useState([])
  const [jobs, setJobs] = useState(initialJobs)
  const [feed, setFeed] = useState(initialActivity)
  const [confirmed, setConfirmed] = useState(null)

  const onConfirm = (reel) => { setConfirmed(reel); setTrade(reel.brief.trade); setTab('matches') }
  const onRequest = (t) => {
    track('demo_request_quote', { trade: t.trade })
    setRequested((r) => [...r, t.id])
    setJobs((j) => [{ id: `J-${1188 + j.length - initialJobs.length}`, item: confirmed?.brief.trade === t.trade ? confirmed.item : `${t.trade} job`, property: 'Your home', tech: t.name, status: 'Quote requested', urgency: confirmed?.brief.trade === t.trade ? confirmed.brief.urgency : 'Medium', quote: '—', date: 'Today' }, ...j])
    setFeed((f) => [{ t: 'Just now', text: `Quote requested from ${t.name}`, tone: 'amber' }, ...f].slice(0, 6))
  }

  const stats = [
    ['Open jobs', jobs.filter((j) => j.status !== 'Completed').length],
    ['Quotes requested', requested.length],
    ['Completed', jobs.filter((j) => j.status === 'Completed').length],
    ['Safety alerts', 1],
  ]
  const tone = { amber: 'bg-amber', ink: 'bg-ink/40', red: 'bg-[#E5484D]', green: 'bg-fix' }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-ink-2 p-2 shadow-2xl">
      <div className="flex items-center justify-between gap-3 px-3 py-2">
        <div className="flex items-center gap-1.5" aria-hidden="true"><span className="h-2.5 w-2.5 rounded-full bg-white/15" /><span className="h-2.5 w-2.5 rounded-full bg-white/15" /><span className="h-2.5 w-2.5 rounded-full bg-white/15" /></div>
        <p className="truncate text-xs text-mist">app.faultlens.space · Demo workspace</p>
        <SampleBadge />
      </div>
      <div className="relative grid overflow-hidden rounded-2xl bg-paper lg:grid-cols-[200px_1fr]">
        <nav aria-label="Demo workspace" className="border-b border-ink/10 bg-white p-3 lg:border-b-0 lg:border-r">
          <ul className="flex gap-1 overflow-x-auto lg:flex-col" role="tablist">
            {TABS.map((t) => (
              <li key={t.id} role="presentation">
                <button role="tab" aria-selected={tab === t.id} onClick={() => { setTab(t.id); track('demo_tab', { tab: t.id }) }} className={`focus-ring flex w-full items-center gap-2.5 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium ${tab === t.id ? 'bg-ink text-paper' : 'text-muted hover:bg-paper hover:text-ink'}`}>
                  <t.icon className="h-4 w-4" />{t.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-6 hidden lg:block">
            <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-muted">Activity</p>
            <ul className="mt-2 space-y-3 px-3">
              {feed.map((a, i) => (
                <li key={i} className="flex gap-2 text-xs leading-snug"><span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${tone[a.tone]}`} /><span><span className="text-ink">{a.text}</span><span className="block text-muted">{a.t}</span></span></li>
              ))}
            </ul>
          </div>
        </nav>
        <div className="min-w-0 p-4 sm:p-6" role="tabpanel">
          <dl className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map(([k, v]) => (
              <div key={k} className="rounded-xl border border-ink/10 bg-white p-3"><dt className="text-[11px] text-muted">{k}</dt><dd className="font-display text-2xl font-semibold text-ink">{v}</dd></div>
            ))}
          </dl>
          {tab === 'reels' && <ReelsTab onConfirm={onConfirm} />}
          {tab === 'matches' && <MatchesTab trade={trade} setTrade={setTrade} requested={requested} onRequest={onRequest} />}
          {tab === 'jobs' && <JobsTab jobs={jobs} />}
          {tab === 'repairs' && <RepairsTab />}
        </div>
      </div>
    </div>
  )
}
