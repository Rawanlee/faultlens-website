import { company } from '../data/company'

const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validate(fields, values) {
  const errors = {}
  for (const f of fields) {
    const v = (values[f.name] || '').trim()
    if (f.required && !v) errors[f.name] = f.type === 'select' ? 'Please choose an option.' : `${f.label} is required.`
    else if (f.type === 'email' && v && !EMAIL_RE.test(v)) errors[f.name] = 'Enter a valid email address.'
    else if (f.maxLength && v.length > f.maxLength) errors[f.name] = `Keep this under ${f.maxLength} characters.`
  }
  return errors
}

// Sends the form to VITE_FORM_ENDPOINT when configured. Without an endpoint it
// prepares a pre-filled email to the Faultlens inbox; the visitor must press
// Send in their own mail app, and the UI says so rather than claiming success.
export async function submitForm(formName, fields, values) {
  const payload = { form: formName, ...values, submittedAt: new Date().toISOString(), page: window.location.href }
  if (ENDPOINT) {
    if (values._gotcha) return { mode: 'sent' } // honeypot filled: silently drop
    let res
    try {
      res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
    } catch {
      throw new Error('the form service could not be reached')
    }
    if (!res.ok) {
      const detail = await res.json().then((j) => j.error).catch(() => null)
      throw new Error(detail || `error ${res.status}`)
    }
    return { mode: 'sent' }
  }
  const body = fields.map((f) => `${f.label}: ${values[f.name] || '-'}`).join('\n')
  const subject = `${formName} — ${values.name || 'Website enquiry'}`
  return { mode: 'mailto', href: `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}` }
}
