// Faultlens form handler — AWS Lambda (Node.js 22, CommonJS).
// Receives JSON from the website's Get started and Contact forms and emails it
// to the Faultlens inbox through Amazon SES. Configured by environment variables:
//   TO_EMAIL         inbox that receives submissions (shalom@faultlens.space)
//   FROM_EMAIL       SES-verified sender (shalom@faultlens.space or a domain address)
//   ALLOWED_ORIGINS  comma-separated list of site origins allowed to post
'use strict'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const FORMS = {
  'Get started': ['name', 'email', 'size', 'useCase'],
  Contact: ['name', 'email', 'topic', 'message'],
}
const LABELS = { name: 'Full name', email: 'Email', company: 'Company or property', size: 'I am a', useCase: 'What needs fixing', topic: 'Topic', message: 'Message', page: 'Page', submittedAt: 'Submitted at' }
const MAX_FIELD = 2000

let sendEmail = async (params) => {
  const { SESv2Client, SendEmailCommand } = require('@aws-sdk/client-sesv2')
  const client = new SESv2Client({})
  return client.send(new SendEmailCommand(params))
}
exports._setSender = (fn) => { sendEmail = fn } // test hook

const allowed = () => (process.env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean)

function corsHeaders(origin) {
  const ok = origin && allowed().includes(origin)
  return {
    'Content-Type': 'application/json',
    ...(ok ? { 'Access-Control-Allow-Origin': origin, Vary: 'Origin' } : {}),
  }
}
const reply = (status, body, origin) => ({ statusCode: status, headers: corsHeaders(origin), body: JSON.stringify(body) })
const clean = (v) => String(v ?? '').replace(/\r/g, '').trim().slice(0, MAX_FIELD)

exports.handler = async (event) => {
  const headers = Object.fromEntries(Object.entries(event.headers || {}).map(([k, v]) => [k.toLowerCase(), v]))
  const origin = headers.origin
  const method = event.requestContext?.http?.method || event.httpMethod

  if (method === 'OPTIONS') return reply(204, {}, origin)
  if (method !== 'POST') return reply(405, { error: 'Method not allowed' }, origin)
  if (!origin || !allowed().includes(origin)) return reply(403, { error: 'Origin not allowed' }, origin)

  let data
  try {
    const raw = event.isBase64Encoded ? Buffer.from(event.body || '', 'base64').toString('utf8') : event.body
    if ((raw || '').length > 20000) return reply(413, { error: 'Payload too large' }, origin)
    data = JSON.parse(raw || '{}')
  } catch {
    return reply(400, { error: 'Invalid JSON' }, origin)
  }

  // Honeypot: real visitors never see or fill this field. Pretend success to bots.
  if (clean(data._gotcha)) return reply(200, { ok: true }, origin)

  const form = clean(data.form)
  const required = FORMS[form]
  if (!required) return reply(400, { error: 'Unknown form' }, origin)

  const fields = {}
  for (const key of Object.keys(LABELS)) if (data[key] != null) fields[key] = clean(data[key])
  const missing = required.filter((k) => !fields[k])
  if (missing.length) return reply(422, { error: `Missing: ${missing.join(', ')}` }, origin)
  if (!EMAIL_RE.test(fields.email)) return reply(422, { error: 'Invalid email address' }, origin)

  const lines = Object.entries(fields).map(([k, v]) => `${LABELS[k]}: ${v}`)
  const subject = `[Faultlens] ${form} — ${fields.name}`.replace(/[\n]/g, ' ').slice(0, 150)

  try {
    await sendEmail({
      FromEmailAddress: process.env.FROM_EMAIL,
      Destination: { ToAddresses: [process.env.TO_EMAIL] },
      ReplyToAddresses: [fields.email],
      Content: { Simple: { Subject: { Data: subject }, Body: { Text: { Data: `New ${form} submission from faultlens.space\n\n${lines.join('\n')}\n` } } } },
    })
  } catch (err) {
    console.error('SES send failed', err)
    return reply(502, { error: 'Could not send message' }, origin)
  }
  console.log(JSON.stringify({ event: 'form_submission', form }))
  return reply(200, { ok: true }, origin)
}
