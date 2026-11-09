import { Video, UserCheck, Receipt } from 'lucide-react'
import Form from '../ui/Form'

const fields = [
  { name: 'name', label: 'Full name', required: true, autoComplete: 'name' },
  { name: 'email', label: 'Email', type: 'email', required: true, autoComplete: 'email' },
  { name: 'company', label: 'Company or property name', autoComplete: 'organization' },
  { name: 'size', label: 'I am a', type: 'select', required: true, options: ['Household / renter', 'Landlord or property manager (1–25 units)', 'Property manager (25+ units)', 'Small business', 'Technician'] },
  { name: 'useCase', label: 'What needs fixing?', type: 'select', required: true, full: true, options: ['Plumbing', 'Electrical', 'Appliances (fridge, washer, cooker)', 'Air conditioning / HVAC', 'Phones, laptops and electronics', 'Vehicles', 'Something else', 'I want to join as a technician'] },
  { name: 'message', label: 'Describe the fault or your question', type: 'textarea', full: true, maxLength: 2000, placeholder: 'e.g. Fridge stopped cooling yesterday, clicking noise every few minutes.' },
]

export default function GetStarted() {
  return (
    <section id="get-started" className="bg-ink py-20 text-paper lg:py-28" aria-labelledby="start-title">
      <div className="container-x grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="reveal">
          <p className="eyebrow text-amber">Get started</p>
          <h2 id="start-title" className="mt-3 text-3xl font-bold sm:text-4xl">Tell us what’s broken.</h2>
          <p className="mt-4 text-lg leading-relaxed text-mist">Faultlens is running now. Send your details and the fault, and the team will set up your Fix Pass, Property or Technician Pro account and get your first job matched.</p>
          <ul className="mt-8 space-y-5 text-sm">
            <li className="flex gap-3"><Video className="h-5 w-5 shrink-0 text-amber" /><span><strong className="text-paper">Have a video?</strong> <span className="text-mist">Keep it handy — your first Fault Reel goes straight into your account.</span></span></li>
            <li className="flex gap-3"><UserCheck className="h-5 w-5 shrink-0 text-amber" /><span><strong className="text-paper">Technicians:</strong> <span className="text-mist">tell us your trade and skills to start receiving matched jobs.</span></span></li>
            <li className="flex gap-3"><Receipt className="h-5 w-5 shrink-0 text-amber" /><span><strong className="text-paper">No surprises:</strong> <span className="text-mist">repairs are always quoted before you book.</span></span></li>
          </ul>
        </div>
        <div className="reveal rounded-3xl bg-paper p-6 text-ink sm:p-8">
          <Form name="Get started" fields={fields} submitLabel="Find my technician" />
        </div>
      </div>
    </section>
  )
}
