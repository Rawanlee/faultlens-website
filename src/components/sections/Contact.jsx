import { Mail } from 'lucide-react'
import Form from '../ui/Form'
import LinkedInIcon from '../ui/LinkedInIcon'
import SectionHeader from '../ui/SectionHeader'
import { company } from '../../data/company'

const fields = [
  { name: 'name', label: 'Full name', required: true, autoComplete: 'name' },
  { name: 'email', label: 'Email', type: 'email', required: true, autoComplete: 'email' },
  { name: 'topic', label: 'Topic', type: 'select', required: true, full: true, options: ['Business or multi-site plan', 'Technician partnership', 'Partnership or press', 'Support with an existing job', 'Privacy or data request', 'Other'] },
  { name: 'message', label: 'Message', type: 'textarea', required: true, full: true, maxLength: 2000 },
]

export default function Contact() {
  return (
    <section id="contact" className="bg-paper py-20 lg:py-28" aria-labelledby="contact-title">
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionHeader id="contact-title" eyebrow="Contact" title="Talk to the Faultlens team." intro="Questions about Business plans, technician partnerships or an existing job — we read every message." />
          <ul className="reveal mt-8 space-y-4 text-sm">
            <li><a href={`mailto:${company.email}`} className="focus-ring inline-flex items-center gap-3 rounded font-semibold text-ink hover:text-amber-deep"><span className="grid h-10 w-10 place-items-center rounded-xl bg-ink text-amber"><Mail className="h-5 w-5" /></span>{company.email}</a></li>
            <li><a href={company.linkedin} target="_blank" rel="noopener noreferrer" className="focus-ring inline-flex items-center gap-3 rounded font-semibold text-ink hover:text-amber-deep"><span className="grid h-10 w-10 place-items-center rounded-xl bg-ink text-amber"><LinkedInIcon className="h-5 w-5" /></span>linkedin.com/company/faultlensai</a></li>
          </ul>
        </div>
        <div className="reveal rounded-3xl border border-ink/10 bg-white p-6 sm:p-8">
          <Form name="Contact" fields={fields} submitLabel="Send message" />
        </div>
      </div>
    </section>
  )
}
