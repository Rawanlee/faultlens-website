// Local stand-in for the AWS form API, for testing forms without AWS.
// Runs the real Lambda handler with SES replaced by a console logger.
//   node scripts/local-form-server.js            → http://localhost:8787/contact
//   FAIL=1 node scripts/local-form-server.js     → simulates an SES failure
// Then build/run the site with VITE_FORM_ENDPOINT=http://localhost:8787/contact
import http from 'node:http'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const h = require('../backend/form-handler/index.js')
const PORT = Number(process.env.PORT || 8787)
process.env.ALLOWED_ORIGINS ||= 'http://localhost:4173,http://localhost:5173'
process.env.TO_EMAIL ||= 'shalom@faultlens.space'
process.env.FROM_EMAIL ||= 'shalom@faultlens.space'

h._setSender(async (p) => {
  if (process.env.FAIL) throw new Error('simulated SES failure')
  console.log(`\n--- email (not sent: local mode) ---\nTo: ${p.Destination.ToAddresses}\nReply-To: ${p.ReplyToAddresses}\nSubject: ${p.Content.Simple.Subject.Data}\n${p.Content.Simple.Body.Text.Data}`)
})

http.createServer(async (req, res) => {
  const origin = req.headers.origin
  const cors = process.env.ALLOWED_ORIGINS.split(',').includes(origin)
    ? { 'Access-Control-Allow-Origin': origin, 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'content-type, accept' } : {}
  if (req.url !== '/contact') { res.writeHead(404, cors).end(); return }
  if (req.method === 'OPTIONS') { res.writeHead(204, cors).end(); return } // API Gateway answers preflight in AWS
  let body = ''
  for await (const chunk of req) body += chunk
  const r = await h.handler({ headers: req.headers, requestContext: { http: { method: req.method } }, body })
  res.writeHead(r.statusCode, { ...r.headers, ...cors }).end(r.body)
}).listen(PORT, () => console.log(`Local form API on http://localhost:${PORT}/contact`))
