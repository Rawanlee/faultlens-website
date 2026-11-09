# Faultlens — AWS Activate application answers

Live copy-paste version: https://www.faultlens.space/app#aws (unlisted page).

## Business details used
- **Company name and website:** Faultlens — https://www.faultlens.space
- **One-sentence description:** Faultlens turns a 15-second video of a faulty appliance, device, vehicle or fitting into an AI fault brief, then matches the job to a verified technician with the right skills.
- **Customers and niche:** Consumers (households and renters) first, plus landlords, small businesses and independent technicians. Home and appliance repair / property maintenance.
- **Product stage:** Launched and iterating (stated by the founders: the platform is running).
- **Launch date:** Not supplied — see Q10.
- **How customers use it:** Web browser (mobile and desktop).
- **AI/ML:** Used to improve the product: video, speech and foundation-model analysis produce the fault brief that drives matching.
- **Funding:** None (assumed — bootstrapped).
- **Valuation:** None.
- **Tech stack and AWS:** React (Vite) web app. AWS architecture: S3, CloudFront, Cognito, API Gateway, Lambda, Step Functions, MediaConvert, Rekognition, Transcribe, Bedrock, DynamoDB, SNS, SES, CloudWatch.
- **Expected AWS share of infrastructure:** 75 - 99%
- **Planned annual marketing spend:** Under $250,000
- **Team size and country:** 2 founders. Country not supplied.
- **6–12 month goals:** Scale the reel-analysis pipeline, grow the verified technician network, add more households and landlords, keep cost per diagnosis low enough for a $1 plan.

## Answers
**Q1. Top 3 ways AWS can help you:** Building scalable architecture | Reducing burn rate | Acquiring early customers  
_Reason:_ A launched, video-heavy product needs a pipeline that scales cheaply; a $1 plan only works if cost per reel stays low.

**Q2. AWS services to learn more about:** Amazon Bedrock | Amazon Rekognition | Amazon Transcribe | AWS Elemental MediaConvert | Amazon S3 | AWS Lambda | AWS Step Functions | Amazon API Gateway | Amazon Cognito | Amazon DynamoDB | Amazon SNS | Amazon Simple Email Service | Amazon Cloudwatch | AWS Identity & Access | AWS Route 53 | AWS Amplify | AWS Budgets | AWS Cost Explorer | AWS CloudFormation  
_Reason:_ Matches the reel pipeline (storage, transcoding, vision, speech, generative AI), the serverless API and cost control. (CloudFront is not in the option list.)

**Q3. AWS tech topics to follow:** AI & machine learning | Serverless | Video streaming | Security | AWS cost management  
_Reason:_ AI briefs, serverless back end, video reels, private customer media and tight unit costs.

**Q4. Type of customers you primarily serve:** Home Improvement | Marketplaces | Computer Vision | Artificial Intelligence (AI) | Professional Services | SaaS  
_Reason:_ Home repair is the niche, delivered as a two-sided marketplace and subscription, with computer-vision AI at its core.

**Q5. Primary target customers:** Consumers  
_Reason:_ Households on the $1 Fix Pass are the main paying users; landlords and technicians are secondary.

**Q6. Current product stage:** Launched initial product and iterating  
_Reason:_ Founders state the platform is already running. Choose "Ideating/building initial product" if real users cannot yet sign up and use it.

**Q7. How customers interact with the product:** Web browser  
_Reason:_ Faultlens runs in the browser on phones and computers; there is no native app or public API.

**Q8. Does your product use AI/ML?:** Yes, we're using AI/ML to improve our products  
_Reason:_ Faultlens is a repair-matching product that uses AI for diagnosis; it does not sell AI models or infrastructure.

**Q9. What are you building? (30–250 characters):** Faultlens is a web platform where households, landlords and small businesses film a faulty item, get an AI fault brief and book a matched technician from $1/month. Built with React; AWS: Bedrock, Rekognition, Lambda, S3. *(220/250 characters)*  
_Reason:_ Product, customer, benefit, price and AWS services in one sentence.

**Q10. Planned product launch date:** November 1, 2026  
_Reason:_ ASSUMED — replace with the actual date Faultlens went live.

**Q11. Most recent funding round:** No Funding  
_Reason:_ No funding was supplied; leave month and year blank.

**Q12. Latest valuation:** No Valuation  
_Reason:_ No priced round.

**Q13. Percentage of spend on AWS:** 75 - 99%  
_Reason:_ The whole back end is designed on AWS; only domain, email and a few tools sit elsewhere.

**Q14. Annual marketing spend:** < $250,000  
_Reason:_ Early-stage, two-founder company.

## Startup overview
Faultlens (faultlens.space) is an AI fault-diagnosis and technician-matching platform founded in 2026 by siblings Elegbede Shalom and Elegbede Precious. Customers film a 15-second Fault Reel of a broken appliance, fitting, device or vehicle. Faultlens analyses the video and narration to produce a fault brief — likely cause, urgency, safety guidance and the trade needed — and matches the job to verified technicians who quote before visiting. After the repair, Faultlens creates a before/after repair reel for the customer's records and the technician's portfolio. Plans start at $1 a month for households, with plans for families, landlords and technicians. Its architecture is designed on AWS: S3 and MediaConvert for video, Rekognition and Transcribe for vision and speech, Bedrock for the fault brief, and Lambda, Step Functions and DynamoDB for the serverless back end.

## Check before submitting (assumed or unverified)
- Q6 / site wording: confirm real users can sign up and use Faultlens today. If not, switch to "Ideating/building initial product".
- Q10 launch date: November 1, 2026 is a placeholder — use the real go-live date.
- Q11 funding: assumed none.
- Founder titles: "Founder" and "Co-Founder" — confirm exact titles; add LinkedIn profile links and photos when ready.
- Headquarters / country: not supplied; add to LinkedIn and the Privacy Policy if required.
- Plan prices other than the $1 Fix Pass (Home Plus $4, Property $15, Technician Pro $9) were proposed for the site — confirm before publishing.
- AWS services are described as the product architecture. Only say they are deployed once they are configured in your AWS account.
- Company LinkedIn URL linkedin.com/company/faultlensai was supplied by you; it could not be checked automatically.
