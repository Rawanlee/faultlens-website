import useSeo from '../hooks/useSeo'
import LegalPage from '../components/ui/LegalPage'
import { company } from '../data/company'

export default function Terms() {
  useSeo('/terms')
  return (
    <LegalPage
      title="Terms of Service"
      updated="November 9, 2026"
      intro={`These terms govern your use of ${company.domain} and the Faultlens platform. By creating an account or using the platform you agree to them.`}
      sections={[
        ['The service', 'Faultlens lets customers report faults with video, receive an automatically generated fault brief, and find, compare and book independent technicians. Faultlens provides the platform; repairs are carried out by technicians, who are independent and not employees or agents of Faultlens.'],
        ['Accounts', 'You must be at least 18, give accurate information and keep your login secure. You are responsible for activity under your account.'],
        ['Plans and payment', 'Paid plans are billed monthly in advance at the price shown when you subscribe and renew until cancelled. You can cancel at any time; cancellation takes effect at the end of the current billing period. Plan fees cover use of the platform. Repair work is quoted by the technician and agreed directly between you and the technician.'],
        ['Fault briefs are guidance', 'Fault briefs are produced automatically and may be incomplete or wrong. They are not a professional inspection. Always follow safety guidance, and for gas leaks, fire, smoke, flooding near electrics or any immediate danger, contact your local emergency services first.'],
        ['Customer responsibilities', [
          ['Only upload content you have the right to share and that does not show other people without their consent.', 'Give technicians safe access and accurate information about the fault.', 'Pay technicians for work you have agreed to.'],
        ]],
        ['Technician responsibilities', [
          ['Hold the skills, qualifications, licences and insurance required for the work you accept.', 'Quote honestly, attend booked jobs and carry out work with reasonable skill and care.', 'Comply with the laws that apply to your trade.'],
        ]],
        ['Acceptable use', 'Do not misuse the platform, including by uploading unlawful or harmful content, harassing other users, attempting to access data that is not yours, scraping the service, or circumventing the platform to avoid fees on jobs introduced through Faultlens.'],
        ['Content and licence', 'You keep ownership of the reels and content you upload. You grant Faultlens a licence to store, process, analyse and display that content to operate the service, including sharing it with matched technicians and creating before/after repair reels. Technicians may use repair reels of their own work in their Faultlens profile; customers can ask for a reel to be removed.'],
        ['Intellectual property', 'The Faultlens name, logo, software and site content belong to Faultlens. You may not copy or reuse them without permission.'],
        ['Disclaimers', 'The platform is provided "as is". Faultlens does not guarantee that a fault will be correctly diagnosed, that a technician will be available, or the quality of work carried out by independent technicians.'],
        ['Limitation of liability', 'To the extent permitted by law, Faultlens is not liable for indirect or consequential losses, or for loss or damage caused by work carried out by technicians. Our total liability to you is limited to the plan fees you paid in the 12 months before the claim. Nothing in these terms limits liability that cannot be limited by law.'],
        ['Suspension and termination', 'We may suspend or close accounts that breach these terms or put other users at risk. You may close your account at any time.'],
        ['Changes and contact', `We may update these terms and will notify account holders of material changes. Questions: ${company.email}.`],
      ]}
    />
  )
}
