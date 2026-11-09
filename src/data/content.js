// Marketing content for the Faultlens site. Kept apart from components so
// copy can be edited without touching layout code.
import {
  Video, FileSearch, ShieldAlert, UserCheck, Receipt, Clapperboard, Building2,
  Camera, ScanSearch, ClipboardCheck, Users, Wrench, Home, Store, HardHat,
} from 'lucide-react'

export const scenes = [
  { kind: 'pipe', fault: 'Leaking pipe under the kitchen sink', trade: 'Plumber', skill: 'Compression fittings · PVC traps' },
  { kind: 'phone', fault: 'Cracked phone screen, touch not responding', trade: 'Phone repair technician', skill: 'OLED screen replacement' },
  { kind: 'fridge', fault: 'Fridge running but not cooling', trade: 'Refrigeration technician', skill: 'Compressors · gas recharge' },
  { kind: 'car', fault: 'Engine warning light and rough idle', trade: 'Auto mechanic', skill: 'OBD diagnostics · ignition' },
  { kind: 'socket', fault: 'Wall socket sparking when plugged in', trade: 'Licensed electrician', skill: 'Sockets · circuit faults' },
  { kind: 'ac', fault: 'Air conditioner dripping indoors', trade: 'HVAC technician', skill: 'Split units · drain lines' },
]

export const highlights = [
  { title: '15-second Fault Reels', text: 'Film the problem and say what you notice. No jargon needed.' },
  { title: 'AI fault brief', text: 'Item, likely cause, urgency and safety notes in plain language.' },
  { title: 'Skill-matched technicians', text: 'Matched by the exact repair, not a generic "handyman" listing.' },
  { title: 'From $1 a month', text: 'One flat plan for households. Repairs are quoted upfront by the technician.' },
]

export const problems = [
  { before: 'You describe a fault you cannot name: "it makes a noise and stops".', after: 'A 15-second reel shows the fault. Faultlens names the likely cause for you.' },
  { before: 'You call three people before finding someone who repairs that exact thing.', after: 'Jobs go only to technicians whose verified skills match the fault brief.' },
  { before: 'The technician visits, diagnoses, then returns another day with the part.', after: 'Technicians watch the reel first, so they quote and bring the likely part.' },
  { before: 'You have no record of what was fixed, by whom, or for how much.', after: 'Every job keeps the reel, the brief, the quote and a before/after repair reel.' },
]

export const features = [
  {
    icon: Video, name: 'Fault Reels',
    what: 'Record up to 15 seconds of the faulty item and narrate what you see, hear or smell. Photos and a short note work too.',
    why: 'Video captures sounds, error codes and leaks that a text description misses — so the first diagnosis starts from evidence.',
  },
  {
    icon: FileSearch, name: 'AI fault brief',
    what: 'Faultlens identifies the item, reads visible labels and error codes, and drafts the likely cause, alternatives, urgency and the trade needed.',
    why: 'You review and edit the brief before it is shared, so technicians receive a clear, accurate job description.',
  },
  {
    icon: ShieldAlert, name: 'Safety-first triage',
    what: 'Sparks, gas smells, water near electrics and smoke are flagged immediately with stop-use guidance before any matching starts.',
    why: 'Some faults should not wait for a quote. Faultlens tells you when to switch off, step away or call emergency services.',
  },
  {
    icon: UserCheck, name: 'Skill-matched technicians',
    what: 'Jobs are matched on trade, specific skills and brands, distance, availability and completed-job rating.',
    why: 'A compressor fault goes to a refrigeration technician, not to whoever is nearest. Fewer wasted visits for both sides.',
  },
  {
    icon: Receipt, name: 'Quotes before the visit',
    what: 'Matched technicians watch the reel and brief, then send a quote range and the parts they expect to bring.',
    why: 'You compare like-for-like quotes and the repair is more likely to be finished in one visit.',
  },
  {
    icon: Clapperboard, name: 'Before/after repair reels',
    what: 'After the repair the technician adds a short fix clip. Faultlens assembles a captioned before/after repair reel.',
    why: 'You keep proof of the work for warranties and landlords; technicians build a video portfolio of real repairs.',
  },
  {
    icon: Building2, name: 'Property fault inbox',
    what: 'Landlords and managers share a reporting link. Tenants submit Fault Reels that arrive triaged and ready to assign.',
    why: 'No more chasing tenants for photos or forwarding vague messages to contractors.',
  },
]

export const steps = [
  { icon: Camera, title: 'Film the fault', text: 'Open Faultlens in your browser and record a 15-second Fault Reel. Say what happened and when it started.' },
  { icon: ScanSearch, title: 'Faultlens reads it', text: 'Frames and narration are analysed to identify the item, visible damage, error codes and likely causes.' },
  { icon: ClipboardCheck, title: 'Review your brief', text: 'Check the fault brief, urgency and safety notes. Edit anything that is wrong, then confirm.' },
  { icon: Users, title: 'Choose your technician', text: 'Compare matched technicians, their skills, ratings and quotes. Book the one you trust.' },
  { icon: Wrench, title: 'Fixed and recorded', text: 'The repair, cost and before/after reel are saved to your history for warranty and future repairs.' },
]

export const segments = [
  {
    icon: Home, who: 'Households and renters',
    problem: 'Something stops working and you do not know what it is called, who repairs it or what it should cost.',
    use: 'Film the fault, read the brief, book a matched technician and keep the repair record.',
    benefit: 'Faster, fairer repairs without phoning around.',
  },
  {
    icon: Building2, who: 'Landlords and property managers',
    problem: 'Tenant reports arrive as vague messages and every job needs a site visit just to understand it.',
    use: 'Give each property a reporting link. Faults arrive triaged with video, urgency and the trade needed.',
    benefit: 'Assign the right contractor first time and keep a per-unit maintenance history.',
  },
  {
    icon: Store, who: 'Small businesses',
    problem: 'A failed fridge, AC unit or till costs sales every hour it is down.',
    use: 'Report faults from any phone, prioritise by urgency and track jobs across sites.',
    benefit: 'Less downtime and clear records of repair spend.',
  },
  {
    icon: HardHat, who: 'Technicians',
    problem: 'Too many call-outs are the wrong job, with no detail until you arrive.',
    use: 'Receive jobs that match your skills, watch the reel before quoting and earn before/after reels for your profile.',
    benefit: 'Better-qualified jobs and a portfolio of real work.',
  },
]

export const aiFlow = [
  { label: 'Input', text: 'Fault Reel video frames, spoken narration, photos and the customer’s note.' },
  { label: 'Vision', text: 'Object and label detection identifies the item, brand, visible damage, leaks and on-screen error codes.' },
  { label: 'Speech', text: 'Narration is transcribed so symptoms like “clicking”, “burning smell” or “since yesterday” are captured.' },
  { label: 'Reasoning', text: 'A foundation model combines vision labels, transcript and Faultlens’ fault taxonomy into a structured fault brief.' },
  { label: 'Human review', text: 'The customer confirms the brief; the technician confirms the diagnosis on site. The brief guides, it does not replace inspection.' },
  { label: 'Outcome', text: 'Skill tags drive matching, and the confirmed result improves future briefs for similar faults.' },
]

export const awsStages = [
  { stage: 'Capture', services: ['Amazon CloudFront', 'Amazon Cognito', 'Amazon API Gateway'], text: 'Customers and technicians sign in and upload Fault Reels from the browser.' },
  { stage: 'Secure storage', services: ['Amazon S3', 'Amazon DynamoDB'], text: 'Reels are stored as private objects; jobs and briefs as structured records.' },
  { stage: 'Processing', services: ['AWS Step Functions', 'AWS Elemental MediaConvert', 'AWS Lambda'], text: 'Each upload starts a workflow that normalises video and extracts key frames and audio.' },
  { stage: 'AI intelligence', services: ['Amazon Rekognition', 'Amazon Transcribe', 'Amazon Bedrock'], text: 'Vision labels and transcripts are combined into a fault brief with urgency and skill tags.' },
  { stage: 'Match and notify', services: ['AWS Lambda', 'Amazon SNS', 'Amazon SES'], text: 'Matching logic ranks technicians and alerts them; customers get quotes and updates.' },
]

export const awsServices = [
  ['Amazon S3', 'Stores Fault Reels, photos and before/after repair reels as private, encrypted objects with lifecycle rules for older media.'],
  ['Amazon CloudFront', 'Delivers the web application and streams reels to matched technicians through signed, time-limited URLs.'],
  ['Amazon Cognito', 'Manages sign-up and sign-in for customers, property managers and technicians, with separate roles for each.'],
  ['Amazon API Gateway', 'Exposes the Faultlens API for job creation, quotes, bookings and messaging, with authorisation from Cognito.'],
  ['AWS Lambda', 'Runs business logic: creating jobs, ranking technicians against the fault brief, handling quotes and updating job status.'],
  ['AWS Step Functions', 'Orchestrates the reel pipeline — transcode, frame extraction, vision, transcription, brief generation — with retries.'],
  ['AWS Elemental MediaConvert', 'Normalises uploaded video from any phone, extracts frames and renders captioned before/after repair reels.'],
  ['Amazon Rekognition', 'Detects the item, labels, visible damage and on-device text such as model numbers and error codes in key frames.'],
  ['Amazon Transcribe', 'Converts the customer’s spoken narration into text so described symptoms feed into the diagnosis.'],
  ['Amazon Bedrock', 'Generates the structured fault brief — likely cause, alternatives, urgency, safety notes and skill tags — and repair-reel captions.'],
  ['Amazon DynamoDB', 'Holds jobs, fault briefs, technician skills and availability, quotes and message threads with low-latency lookups.'],
  ['Amazon SNS', 'Sends instant job alerts to matched technicians and status updates to customers.'],
  ['Amazon SES', 'Sends transactional email: quote received, booking confirmed, repair record ready.'],
  ['Amazon CloudWatch', 'Collects logs, metrics and alarms across the pipeline, including brief-generation latency and failed uploads.'],
]

export const awsPrinciples = [
  { title: 'Security and data', text: 'Media is private by default and shared only with technicians matched to that job, via expiring links. Data is encrypted in transit and at rest, access is scoped by Cognito role and IAM policy, and customers can delete reels from their history.' },
  { title: 'Scalability', text: 'Serverless compute and on-demand storage scale with the number of reels uploaded, so cost follows usage. The Step Functions pipeline processes reels in parallel and retries failed stages without losing the job.' },
  { title: 'Cost control', text: 'Video is transcoded once and analysed on a handful of key frames rather than every frame, and older raw uploads move to lower-cost storage while the brief and repair reel are kept.' },
]

export const plans = [
  {
    name: 'Fix Pass', price: '$1', period: '/month', audience: 'For one household',
    cta: 'Start with Fix Pass', highlight: true,
    features: ['Unlimited Fault Reels', 'AI fault brief and safety triage', 'Matched to verified technicians', 'Compare quotes and book', 'Repair history for your home'],
  },
  {
    name: 'Home Plus', price: '$4', period: '/month', audience: 'For families and multiple homes',
    cta: 'Choose Home Plus',
    features: ['Everything in Fix Pass', 'Up to 3 properties and 5 members', 'Priority matching for urgent faults', 'Warranty and receipt vault', 'Maintenance reminders'],
  },
  {
    name: 'Property', price: '$15', period: '/month', audience: 'For landlords, up to 25 units',
    cta: 'Choose Property',
    features: ['Tenant fault-reporting links', 'Triaged fault inbox per unit', 'Assign preferred contractors', 'Repair spend export (CSV)', 'Before/after reels per job'],
  },
  {
    name: 'Technician Pro', price: '$9', period: '/month', audience: 'For independent technicians',
    cta: 'Join as a technician',
    features: ['Verified skills profile', 'Jobs matched to your skills', 'Watch the reel before you quote', 'Before/after reel portfolio', 'Job and earnings history'],
  },
]
