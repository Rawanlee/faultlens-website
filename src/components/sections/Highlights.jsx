import { highlights } from '../../data/content'

export default function Highlights() {
  return (
    <section aria-label="Product highlights" className="border-b border-ink/10 bg-paper">
      <div className="container-x grid divide-y divide-ink/10 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
        {highlights.map((h) => (
          <div key={h.title} className="reveal py-8 lg:px-8 first:lg:pl-0">
            <p className="font-display text-lg font-semibold text-ink">{h.title}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{h.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
