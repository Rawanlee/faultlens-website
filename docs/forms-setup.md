# Faultlens — connecting the website forms (≈15 minutes, no CLI needed)

The Get started and Contact forms POST JSON to an endpoint set in `VITE_FORM_ENDPOINT`.
The backend in `backend/` is an AWS stack: **Amazon API Gateway (HTTP API) → AWS Lambda → Amazon SES**,
which emails each submission to shalom@faultlens.space with Reply-To set to the visitor.

```
Browser form ──POST JSON──▶ API Gateway /contact ──▶ Lambda (validate, honeypot) ──▶ SES ──▶ shalom@faultlens.space
                     (CORS: faultlens.space only, throttled 1 req/s, burst 5)
```

## 1. Verify the sender in Amazon SES
1. Sign in to the AWS console and pick one region (e.g. **US East (N. Virginia)**). Use the same region in every step.
2. Open **Amazon SES → Identities → Create identity**.
3. Choose **Email address**, enter `shalom@faultlens.space`, create it, then click the link in the verification email.
   (Better long-term: verify the whole **domain** `faultlens.space` by adding the DKIM DNS records SES shows you.)

New SES accounts are in the *sandbox*, which only sends to verified addresses. That is fine here because the form
sends **from and to** shalom@faultlens.space. You do not need production access unless you later send to visitors.

## 2. Deploy the stack
1. Open **CloudFormation → Create stack → With new resources**.
2. **Upload a template file** → choose `backend/faultlens-forms.template.json`.
3. Stack name: `faultlens-forms`. Keep the defaults:
   - ToEmail: `shalom@faultlens.space`
   - FromEmail: `shalom@faultlens.space` (must match the SES identity)
   - AllowedOrigins: `https://www.faultlens.space,https://faultlens.space`
     (add your hosting preview URL here too if you want to test there, e.g. `https://faultlens.vercel.app`)
4. Tick **"I acknowledge that AWS CloudFormation might create IAM resources"** and create the stack.
5. When it shows **CREATE_COMPLETE**, open the **Outputs** tab and copy **FormEndpoint**
   (looks like `https://abc123.execute-api.us-east-1.amazonaws.com/contact`).

## 3. Connect the website
1. In your hosting dashboard (Vercel / Netlify / Amplify) add the environment variable
   `VITE_FORM_ENDPOINT` = the FormEndpoint URL.
2. Redeploy (the value is baked in at build time). Locally: put it in `.env` and run `npm run build`.

## 4. Test on the live site
Submit both forms on https://www.faultlens.space. You should see "Thanks — your request has been received." and an
email in shalom@faultlens.space within a minute. If not, check **CloudWatch → Log groups → /aws/lambda/faultlens-forms-FormFunction-…**.

| Symptom | Cause |
|---|---|
| "Origin not allowed" | The site's URL is not in AllowedOrigins — update the stack parameter |
| "Could not send message" | SES identity not verified, or a different region from the stack |
| "the form service could not be reached" | Wrong `VITE_FORM_ENDPOINT`, or the site was not rebuilt |

## Cost
Light form traffic sits within the AWS Free Tier for Lambda and API Gateway (first 12 months for API Gateway);
SES charges about $0.10 per 1,000 emails. Logs are kept 30 days.

## Changing the backend
Edit `backend/form-handler/index.js`, run `npm test`, then `npm run backend:template` to regenerate the template
and update the stack in CloudFormation (**Update stack → Replace current template**).

## Testing locally without AWS
```bash
npm run forms:local                                  # terminal 1: local API, prints emails instead of sending
VITE_FORM_ENDPOINT=http://localhost:8787/contact npm run build && npm run preview   # terminal 2
```
`FAIL=1 npm run forms:local` simulates an SES failure so you can see the error message.

## Simpler alternative: Formspree
Create a form at formspree.io for shalom@faultlens.space and set `VITE_FORM_ENDPOINT` to its URL
(`https://formspree.io/f/xxxx`). The site already sends JSON with `Accept: application/json` and a `_gotcha` honeypot,
which Formspree supports.
