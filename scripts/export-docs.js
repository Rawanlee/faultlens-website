// Writes docs/linkedin-profile.md and docs/aws-activate.md from src/data/kit.js
// so the docs always match the /app page and the website.
import { writeFileSync } from 'node:fs'
import { linkedin, founderKit, activate, businessDetails, toVerify, overview, brandAssets } from '../src/data/kit.js'

const docs = new URL('../docs/', import.meta.url)

writeFileSync(new URL('linkedin-profile.md', docs), `# Faultlens — LinkedIn company profile kit

Live copy-paste version: https://www.faultlens.space/app#linkedin (unlisted page).

## Company information
${linkedin.fields.map(([k, v]) => `- **${k}:** ${v}`).join('\n')}
- **Headquarters:** not supplied — add city and country.

## Tagline (${linkedin.tagline.length}/120 characters)
${linkedin.tagline}

## Overview (${linkedin.overview.length}/2,000 characters)
${linkedin.overview}

## Specialties (${linkedin.specialties.length}/20)
${linkedin.specialties.map((s) => `- ${s}`).join('\n')}

## Founder profiles
${founderKit.map(([k, v]) => `- **${k}:** ${v}`).join('\n')}

## Images
${brandAssets.map((a) => `- **${a.title}** — ${a.note} Files: ${a.files.map(([l, h]) => `\`public${h}\` (${l})`).join(', ')}`).join('\n')}

## Consistency check
| Item | Website | LinkedIn kit |
|---|---|---|
| Name | Faultlens | Faultlens |
| Domain | www.faultlens.space | www.faultlens.space |
| Founded | 2026 | 2026 |
| Founders | Elegbede Shalom (Founder), Elegbede Precious (Co-Founder) | Same |
| Size | 2 founders | 2-10 employees |
| Product | Fault Reels → AI fault brief → skill-matched technicians → repair reels | Same |
| Pricing | From $1/month | From $1/month |
| Logo / colours | Ink #0F1720, Signal Amber #FFB224, Fix Green #19A974 | Same assets |
`)

writeFileSync(new URL('aws-activate.md', docs), `# Faultlens — AWS Activate application answers

Live copy-paste version: https://www.faultlens.space/app#aws (unlisted page).

## Business details used
${businessDetails.map(([k, v]) => `- **${k}:** ${v}`).join('\n')}

## Answers
${activate.map((a) => `**${a.q}. ${a.field}:** ${a.answer.join(' | ')}${a.count ? ` *(${a.answer[0].length}/250 characters)*` : ''}  \n_Reason:_ ${a.reason}`).join('\n\n')}

## Startup overview
${overview}

## Check before submitting (assumed or unverified)
${toVerify.map((t) => `- ${t}`).join('\n')}
`)
console.log('docs written')
