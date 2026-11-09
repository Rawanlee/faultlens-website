export default function LegalPage({ title, updated, intro, sections }) {
  return (
    <article className="bg-paper py-16 lg:py-24">
      <div className="container-x max-w-3xl">
        <p className="eyebrow text-amber-deep">Legal</p>
        <h1 className="mt-3 text-4xl font-bold">{title}</h1>
        <p className="mt-2 text-sm text-muted">Last updated: {updated}</p>
        <p className="mt-6 leading-relaxed text-ink/85">{intro}</p>
        {sections.map(([h, body]) => (
          <section key={h} className="mt-10">
            <h2 className="text-xl font-semibold">{h}</h2>
            {(Array.isArray(body) ? body : [body]).map((p, i) =>
              Array.isArray(p)
                ? <ul key={i} className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink/80">{p.map((li) => <li key={li}>{li}</li>)}</ul>
                : <p key={i} className="mt-3 text-sm leading-relaxed text-ink/80">{p}</p>,
            )}
          </section>
        ))}
      </div>
    </article>
  )
}
