import useSeo from '../hooks/useSeo'
import LegalPage from '../components/ui/LegalPage'
import { company } from '../data/company'

export default function Privacy() {
  useSeo('/privacy')
  return (
    <LegalPage
      title="Privacy Policy"
      updated="November 9, 2026"
      intro={`This policy explains how ${company.name} ("Faultlens", "we", "us") collects and uses personal data when you visit ${company.domain}, contact us, or use the Faultlens platform to report faults and work with technicians.`}
      sections={[
        ['Who we are', `Faultlens is operated by its founders, Elegbede Shalom and Elegbede Precious. For any privacy question or request, email ${company.email}.`],
        ['Data we collect', [
          'Information you give us when you use our forms or create an account:',
          ['Contact details: name, email address, company or property name, account type.', 'Fault information: Fault Reels (video and audio), photos, written descriptions and the location or address needed for a technician visit.', 'Technician information: trade, skills, service area, availability and the details needed to verify you.', 'Job information: fault briefs, quotes, bookings, messages, ratings and before/after repair reels.'],
          'Information collected automatically: basic technical data such as browser type, pages visited and approximate location derived from IP address, used to keep the site secure and working. If we add analytics, we will list the provider here.',
        ]],
        ['How we use it', [
          ['To analyse your Fault Reel and produce a fault brief, including automated analysis of video frames and speech.', 'To match your job with suitable technicians and share the job details they need to quote.', 'To operate your account, bookings, payments for plans and repair history.', 'To reply to enquiries and send service messages about your jobs.', 'To keep the platform safe, prevent misuse and improve the accuracy of fault briefs.'],
        ]],
        ['Automated analysis', 'Fault briefs are generated automatically from your reel and narration. They are suggestions to help describe a fault. You can review and edit a brief before it is shared, and technicians confirm the diagnosis on site. We do not use fault briefs to make decisions that have legal or similarly significant effects on you.'],
        ['Who we share data with', [
          ['Technicians matched to your job, who see the reel, brief and the location details needed to quote and attend.', 'Service providers who host and process data for us, such as cloud hosting, email delivery and form-handling providers, under contracts that limit their use of the data.', 'Authorities where the law requires it.'],
          'We do not sell personal data.',
        ]],
        ['Retention', 'We keep account and job records while your account is active so you have a repair history. You can delete individual Fault Reels or your account at any time; we then delete or anonymise the related data within a reasonable period, unless we must keep certain records (for example, billing) for legal reasons. Enquiries sent through the website are kept for up to 24 months.'],
        ['Security', 'Fault Reels are stored privately and shared only with technicians matched to that job. Data is encrypted in transit, and access is limited to people and systems that need it. No system is perfectly secure, so please contact us immediately if you suspect misuse of your account.'],
        ['Your rights', `Depending on where you live, you may have the right to access, correct, delete or export your data, and to object to or restrict certain processing. Email ${company.email} and we will respond within the time required by applicable law.`],
        ['Children', 'Faultlens is not intended for anyone under 18, and we do not knowingly collect their data.'],
        ['Changes', 'We will update this page when our practices change and revise the date above.'],
      ]}
    />
  )
}
