import { Mail } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import LinkedInIcon from '../ui/LinkedInIcon'
import { company, team } from '../../data/company'

export default function Team() {
  return (
    <section id="team" className="bg-paper py-20 lg:py-28" aria-labelledby="team-title">
      <div className="container-x">
        <SectionHeader id="team-title" eyebrow="Team" title="The Team Behind Faultlens" intro="Faultlens is built by two siblings who set out to make getting things fixed as simple as showing someone the problem." />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {team.map((m) => (
            <article key={m.name} className="reveal flex flex-col gap-6 rounded-2xl border border-ink/10 bg-white p-7 sm:flex-row">
              <div className="grid h-24 w-24 shrink-0 place-items-center rounded-2xl bg-ink font-display text-3xl font-bold text-amber" aria-hidden="true">{m.initials}</div>
              <div>
                <h3 className="text-2xl font-semibold">{m.name}</h3>
                <p className="mt-0.5 text-sm font-semibold text-amber-deep">{m.role}, {company.name}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{m.bio}</p>
                <div className="mt-4 flex flex-wrap gap-4 text-sm font-medium">
                  {m.email && <a href={`mailto:${m.email}`} className="focus-ring inline-flex items-center gap-1.5 rounded text-ink hover:text-amber-deep"><Mail className="h-4 w-4" />{m.email}</a>}
                  <a href={company.linkedin} target="_blank" rel="noopener noreferrer" className="focus-ring inline-flex items-center gap-1.5 rounded text-ink hover:text-amber-deep"><LinkedInIcon />Faultlens on LinkedIn</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
