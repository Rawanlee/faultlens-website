import { useId, useState } from 'react'
import { Loader2, CheckCircle2, AlertCircle, Mail } from 'lucide-react'
import { validate, submitForm } from '../../lib/forms'
import { track } from '../../lib/analytics'
import { company } from '../../data/company'

const input = 'focus-ring mt-1.5 w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/70'

export default function Form({ name, fields, submitLabel }) {
  const uid = useId()
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})
  const [state, setState] = useState({ status: 'idle' })
  const [started, setStarted] = useState(false)

  const set = (k, v) => {
    if (!started) { setStarted(true); track('form_start', { form: name }) }
    setValues((s) => ({ ...s, [k]: v }))
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const errs = validate(fields, values)
    setErrors(errs)
    if (Object.keys(errs).length) {
      document.getElementById(`${uid}-${Object.keys(errs)[0]}`)?.focus()
      return
    }
    setState({ status: 'loading' })
    try {
      const res = await submitForm(name, fields, values)
      if (res.mode === 'sent') {
        track('form_submit', { form: name })
        setState({ status: 'sent' })
        setValues({})
      } else {
        track('form_mailto', { form: name })
        setState({ status: 'mailto', href: res.href })
        window.location.href = res.href
      }
    } catch (err) {
      setState({ status: 'error', message: err.message })
    }
  }

  if (state.status === 'sent') {
    return (
      <div role="status" className="rounded-2xl border border-fix/30 bg-fix/10 p-6 text-sm text-ink">
        <CheckCircle2 className="h-6 w-6 text-fix" />
        <p className="mt-3 font-semibold">Thanks — your request has been received.</p>
        <p className="mt-1 text-muted">The Faultlens team will reply from {company.email}.</p>
      </div>
    )
  }

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2" aria-label={name}>
      {/* Spam honeypot: hidden from people and assistive tech; bots that fill it are dropped server-side. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${uid}-gotcha`}>Leave this field empty</label>
        <input id={`${uid}-gotcha`} name="_gotcha" tabIndex={-1} autoComplete="off" value={values._gotcha || ''} onChange={(e) => setValues((s) => ({ ...s, _gotcha: e.target.value }))} />
      </div>
      {fields.map((f) => {
        const id = `${uid}-${f.name}`
        const err = errors[f.name]
        const common = {
          id, name: f.name, value: values[f.name] || '', onChange: (e) => set(f.name, e.target.value),
          'aria-invalid': !!err, 'aria-describedby': err ? `${id}-err` : undefined,
          className: `${input} ${err ? 'border-[#E5484D]' : 'border-ink/15'}`,
        }
        return (
          <div key={f.name} className={f.full ? 'sm:col-span-2' : ''}>
            <label htmlFor={id} className="text-sm font-medium text-ink">{f.label}{f.required ? <span className="text-[#E5484D]"> *</span> : <span className="text-muted"> (optional)</span>}</label>
            {f.type === 'select' ? (
              <select {...common}><option value="">Select…</option>{f.options.map((o) => <option key={o}>{o}</option>)}</select>
            ) : f.type === 'textarea' ? (
              <textarea rows={4} placeholder={f.placeholder} {...common} />
            ) : (
              <input type={f.type || 'text'} autoComplete={f.autoComplete} placeholder={f.placeholder} {...common} />
            )}
            {err && <p id={`${id}-err`} className="mt-1 text-xs text-[#B42328]">{err}</p>}
          </div>
        )
      })}
      <div className="sm:col-span-2">
        <button type="submit" disabled={state.status === 'loading'} className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber px-6 py-3 text-sm font-semibold text-ink hover:bg-[#ffc14d] disabled:opacity-60 sm:w-auto">
          {state.status === 'loading' && <Loader2 className="h-4 w-4 animate-spin" />}{submitLabel}
        </button>
        {state.status === 'error' && (
          <p role="alert" className="mt-3 flex items-start gap-2 text-sm text-[#B42328]"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />We couldn’t send that ({state.message}). Please try again or email <a className="underline" href={`mailto:${company.email}`}>{company.email}</a>.</p>
        )}
        {state.status === 'mailto' && (
          <p role="status" className="mt-3 flex items-start gap-2 text-sm text-ink"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-amber-deep" />
            <span>Your email app should now be open with your details addressed to {company.email}. <strong>Press Send there to complete your request.</strong> If nothing opened, <a className="underline" href={state.href}>open the email again</a> or write to us directly.</span>
          </p>
        )}
      </div>
    </form>
  )
}
