// Launch kit content shown on the unlinked /app page and mirrored in docs/.
// Derived from the same business record as the website (src/data/company.js).
import { company } from './company.js'

export const brandAssets = [
  { title: 'Logo icon (square)', note: 'LinkedIn logo, app icon, avatar. 400 × 400.', preview: '/assets/brand/faultlens-icon-400.png', files: [['PNG 400×400', '/assets/brand/faultlens-icon-400.png'], ['SVG', '/assets/brand/faultlens-icon.svg']], bg: 'light' },
  { title: 'Horizontal logo — light backgrounds', note: 'Website, documents, email signatures.', preview: '/assets/brand/faultlens-logo-light.svg', files: [['PNG', '/assets/brand/faultlens-logo-light.png'], ['SVG', '/assets/brand/faultlens-logo-light.svg']], bg: 'light' },
  { title: 'Horizontal logo — dark backgrounds', note: 'Dark slides, social graphics.', preview: '/assets/brand/faultlens-logo-dark.svg', files: [['PNG', '/assets/brand/faultlens-logo-dark.png'], ['SVG', '/assets/brand/faultlens-logo-dark.svg']], bg: 'dark' },
  { title: 'LinkedIn company banner', note: '1128 × 191 (LinkedIn company page cover). Left 240 px kept clear for the logo overlay.', preview: '/assets/brand/linkedin-banner-1128x191.png', files: [['PNG 1128×191', '/assets/brand/linkedin-banner-1128x191.png'], ['PNG @2x', '/assets/brand/linkedin-banner-1128x191@2x.png'], ['SVG', '/assets/brand/linkedin-banner-1128x191.svg']], wide: true },
  { title: 'LinkedIn banner (large / founder profile)', note: '1584 × 396. Left ~470 px kept clear for the profile photo.', preview: '/assets/brand/linkedin-banner-1584x396.png', files: [['PNG 1584×396', '/assets/brand/linkedin-banner-1584x396.png'], ['SVG', '/assets/brand/linkedin-banner-1584x396.svg']], wide: true },
  { title: 'Social share image', note: '1200 × 630 Open Graph image used by the website.', preview: '/assets/og-image.png', files: [['PNG 1200×630', '/assets/og-image.png'], ['SVG', '/assets/og-image.svg']], wide: true },
]

export const palette = [
  ['Ink', '#0F1720', 'Primary dark, backgrounds, text'],
  ['Paper', '#F6F4EF', 'Light background'],
  ['Signal Amber', '#FFB224', 'Brand accent: the fault signal, CTAs'],
  ['Fix Green', '#19A974', 'Repaired / success states'],
  ['Slate', '#5B6675', 'Secondary text'],
  ['Mist', '#9AA6B4', 'Text on dark'],
]

export const linkedin = {
  fields: [
    ['Company name', company.name],
    ['Public URL', 'linkedin.com/company/faultlensai'],
    ['Website', company.url],
    ['Industry', 'Technology, Information and Internet'],
    ['Company size', '2-10 employees'],
    ['Company type', 'Privately Held'],
    ['Founded', String(company.founded)],
  ],
  tagline: "Film what's broken. Get an AI fault brief and the right verified technician, from $1 a month.",
  overview: `Faultlens helps households, landlords and small businesses get broken things fixed by the right technician the first time.

Most repairs go wrong before anyone picks up a tool: people can see that something is broken but cannot describe the fault or tell which trade repairs it. Technicians arrive without detail, diagnose on the first visit and return with parts on the second.

Faultlens starts with a 15-second Fault Reel. Customers film the leaking pipe, warm fridge, sparking socket or dripping air conditioner and describe what they notice. Faultlens analyses the video frames and narration to identify the item, visible damage and error codes, then drafts a plain-language fault brief: the likely cause, alternatives, urgency, safety guidance and the trade and skills needed. The customer reviews and confirms the brief.

The job is then matched to verified technicians by trade, specific skills, distance, availability and rating. Technicians watch the reel before quoting, so they can price accurately and bring the likely part. After the repair, Faultlens assembles a before/after repair reel that the customer keeps as a record and the technician can use as a portfolio of real work.

Key capabilities:
• Fault Reels — video-first fault reporting from any browser
• AI fault briefs with urgency and safety triage
• Skill-based technician matching and upfront quotes
• Repair history and before/after repair reels
• Property fault inbox for landlords and managers

Plans start at $1 a month for households, with options for families, landlords and independent technicians.

Faultlens was founded in 2026 by siblings Elegbede Shalom and Elegbede Precious.`,
  specialties: [
    'AI fault diagnosis', 'Technician matching', 'Home repair', 'Appliance repair', 'Property maintenance',
    'Computer vision', 'Video-based diagnostics', 'Repair marketplace', 'Landlord maintenance software', 'Plumbing repair',
    'Electrical repair', 'HVAC repair', 'Phone and electronics repair', 'Before and after repair reels', 'Field service',
    'Safety triage', 'Maintenance management', 'Generative AI', 'Amazon Web Services', 'SaaS',
  ],
}

export const founderKit = [
  ['Elegbede Shalom — headline', 'Founder at Faultlens · Film what’s broken, get matched with the right technician'],
  ['Elegbede Precious — headline', 'Co-Founder at Faultlens · Making repairs as simple as filming the problem'],
  ['Experience entry (both)', 'Faultlens · Founder / Co-Founder · 2026 – Present · Faultlens turns a 15-second video of a faulty item into an AI fault brief and matches the job to a verified technician with the right skills.'],
]

export const businessDetails = [
  ['Company name and website', `${company.name} — ${company.url}`],
  ['One-sentence description', company.shortDescription],
  ['Customers and niche', 'Consumers (households and renters) first, plus landlords, small businesses and independent technicians. Home and appliance repair / property maintenance.'],
  ['Product stage', 'Launched and iterating (stated by the founders: the platform is running).'],
  ['Launch date', 'Not supplied — see Q10.'],
  ['How customers use it', 'Web browser (mobile and desktop).'],
  ['AI/ML', 'Used to improve the product: video, speech and foundation-model analysis produce the fault brief that drives matching.'],
  ['Funding', 'None (assumed — bootstrapped).'],
  ['Valuation', 'None.'],
  ['Tech stack and AWS', 'React (Vite) web app. AWS architecture: S3, CloudFront, Cognito, API Gateway, Lambda, Step Functions, MediaConvert, Rekognition, Transcribe, Bedrock, DynamoDB, SNS, SES, CloudWatch.'],
  ['Expected AWS share of infrastructure', '75 - 99%'],
  ['Planned annual marketing spend', 'Under $250,000'],
  ['Team size and country', '2 founders. Country not supplied.'],
  ['6–12 month goals', 'Scale the reel-analysis pipeline, grow the verified technician network, add more households and landlords, keep cost per diagnosis low enough for a $1 plan.'],
]

export const q9 =
  'Faultlens is a web platform where households, landlords and small businesses film a faulty item, get an AI fault brief and book a matched technician from $1/month. Built with React; AWS: Bedrock, Rekognition, Lambda, S3.'

export const activate = [
  { q: 'Q1', field: 'Top 3 ways AWS can help you', answer: ['Building scalable architecture', 'Reducing burn rate', 'Acquiring early customers'], reason: 'A launched, video-heavy product needs a pipeline that scales cheaply; a $1 plan only works if cost per reel stays low.' },
  { q: 'Q2', field: 'AWS services to learn more about', answer: ['Amazon Bedrock', 'Amazon Rekognition', 'Amazon Transcribe', 'AWS Elemental MediaConvert', 'Amazon S3', 'AWS Lambda', 'AWS Step Functions', 'Amazon API Gateway', 'Amazon Cognito', 'Amazon DynamoDB', 'Amazon SNS', 'Amazon Simple Email Service', 'Amazon Cloudwatch', 'AWS Identity & Access', 'AWS Route 53', 'AWS Amplify', 'AWS Budgets', 'AWS Cost Explorer', 'AWS CloudFormation'], reason: 'Matches the reel pipeline (storage, transcoding, vision, speech, generative AI), the serverless API and cost control. (CloudFront is not in the option list.)' },
  { q: 'Q3', field: 'AWS tech topics to follow', answer: ['AI & machine learning', 'Serverless', 'Video streaming', 'Security', 'AWS cost management'], reason: 'AI briefs, serverless back end, video reels, private customer media and tight unit costs.' },
  { q: 'Q4', field: 'Type of customers you primarily serve', answer: ['Home Improvement', 'Marketplaces', 'Computer Vision', 'Artificial Intelligence (AI)', 'Professional Services', 'SaaS'], reason: 'Home repair is the niche, delivered as a two-sided marketplace and subscription, with computer-vision AI at its core.' },
  { q: 'Q5', field: 'Primary target customers', answer: ['Consumers'], reason: 'Households on the $1 Fix Pass are the main paying users; landlords and technicians are secondary.' },
  { q: 'Q6', field: 'Current product stage', answer: ['Launched initial product and iterating'], reason: 'Founders state the platform is already running. Choose "Ideating/building initial product" if real users cannot yet sign up and use it.' },
  { q: 'Q7', field: 'How customers interact with the product', answer: ['Web browser'], reason: 'Faultlens runs in the browser on phones and computers; there is no native app or public API.' },
  { q: 'Q8', field: 'Does your product use AI/ML?', answer: ["Yes, we're using AI/ML to improve our products"], reason: 'Faultlens is a repair-matching product that uses AI for diagnosis; it does not sell AI models or infrastructure.' },
  { q: 'Q9', field: 'What are you building? (30–250 characters)', answer: [q9], reason: 'Product, customer, benefit, price and AWS services in one sentence.', count: true },
  { q: 'Q10', field: 'Planned product launch date', answer: ['November 1, 2026'], reason: 'ASSUMED — replace with the actual date Faultlens went live.' },
  { q: 'Q11', field: 'Most recent funding round', answer: ['No Funding'], reason: 'No funding was supplied; leave month and year blank.' },
  { q: 'Q12', field: 'Latest valuation', answer: ['No Valuation'], reason: 'No priced round.' },
  { q: 'Q13', field: 'Percentage of spend on AWS', answer: ['75 - 99%'], reason: 'The whole back end is designed on AWS; only domain, email and a few tools sit elsewhere.' },
  { q: 'Q14', field: 'Annual marketing spend', answer: ['< $250,000'], reason: 'Early-stage, two-founder company.' },
]

export const toVerify = [
  'Q6 / site wording: confirm real users can sign up and use Faultlens today. If not, switch to "Ideating/building initial product".',
  'Q10 launch date: November 1, 2026 is a placeholder — use the real go-live date.',
  'Q11 funding: assumed none.',
  'Founder titles: "Founder" and "Co-Founder" — confirm exact titles; add LinkedIn profile links and photos when ready.',
  'Headquarters / country: not supplied; add to LinkedIn and the Privacy Policy if required.',
  'Plan prices other than the $1 Fix Pass (Home Plus $4, Property $15, Technician Pro $9) were proposed for the site — confirm before publishing.',
  'AWS services are described as the product architecture. Only say they are deployed once they are configured in your AWS account.',
  'Company LinkedIn URL linkedin.com/company/faultlensai was supplied by you; it could not be checked automatically.',
]

export const overview = `Faultlens (${company.domain}) is an AI fault-diagnosis and technician-matching platform founded in 2026 by siblings Elegbede Shalom and Elegbede Precious. Customers film a 15-second Fault Reel of a broken appliance, fitting, device or vehicle. Faultlens analyses the video and narration to produce a fault brief — likely cause, urgency, safety guidance and the trade needed — and matches the job to verified technicians who quote before visiting. After the repair, Faultlens creates a before/after repair reel for the customer's records and the technician's portfolio. Plans start at $1 a month for households, with plans for families, landlords and technicians. Its architecture is designed on AWS: S3 and MediaConvert for video, Rekognition and Transcribe for vision and speech, Bedrock for the fault brief, and Lambda, Step Functions and DynamoDB for the serverless back end.`
