// Run with: npm run test:backend  (uses node:test, no extra packages)
const test = require('node:test')
const assert = require('node:assert/strict')
const h = require('./index.js')

process.env.ALLOWED_ORIGINS = 'https://www.faultlens.space,http://localhost:4173'
process.env.TO_EMAIL = 'shalom@faultlens.space'
process.env.FROM_EMAIL = 'shalom@faultlens.space'

const sent = []
h._setSender(async (p) => { sent.push(p) })
const ev = (body, origin = 'https://www.faultlens.space', method = 'POST') => ({
  headers: { Origin: origin }, requestContext: { http: { method } }, body: typeof body === 'string' ? body : JSON.stringify(body),
})
const good = { form: 'Contact', name: 'Ada Test', email: 'ada@example.com', topic: 'Other', message: 'Hello' }

test('valid submission sends one email and returns 200 with CORS', async () => {
  sent.length = 0
  const r = await h.handler(ev(good))
  assert.equal(r.statusCode, 200)
  assert.equal(r.headers['Access-Control-Allow-Origin'], 'https://www.faultlens.space')
  assert.equal(sent.length, 1)
  assert.deepEqual(sent[0].ReplyToAddresses, ['ada@example.com'])
  assert.match(sent[0].Content.Simple.Body.Text.Data, /Message: Hello/)
})
test('rejects other origins', async () => {
  assert.equal((await h.handler(ev(good, 'https://evil.example'))).statusCode, 403)
})
test('rejects missing fields and bad email', async () => {
  assert.equal((await h.handler(ev({ ...good, message: '' }))).statusCode, 422)
  assert.equal((await h.handler(ev({ ...good, email: 'nope' }))).statusCode, 422)
})
test('rejects unknown form and invalid JSON', async () => {
  assert.equal((await h.handler(ev({ ...good, form: 'X' }))).statusCode, 400)
  assert.equal((await h.handler(ev('{bad'))).statusCode, 400)
})
test('honeypot returns 200 without sending', async () => {
  sent.length = 0
  const r = await h.handler(ev({ ...good, _gotcha: 'bot' }))
  assert.equal(r.statusCode, 200)
  assert.equal(sent.length, 0)
})
test('SES failure returns 502 (no fake success)', async () => {
  h._setSender(async () => { throw new Error('boom') })
  assert.equal((await h.handler(ev(good))).statusCode, 502)
  h._setSender(async (p) => { sent.push(p) })
})
test('preflight returns 204', async () => {
  assert.equal((await h.handler(ev('', 'https://www.faultlens.space', 'OPTIONS'))).statusCode, 204)
})
