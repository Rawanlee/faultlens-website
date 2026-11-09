export default function SectionHeader({ eyebrow, title, intro, dark = false, center = false, id }) {
  return (
    <div className={`reveal max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <p className={`eyebrow ${dark ? 'text-amber' : 'text-amber-deep'}`}>{eyebrow}</p>}
      <h2 id={id} className={`mt-3 text-3xl font-bold sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1] ${dark ? 'text-paper' : 'text-ink'}`}>{title}</h2>
      {intro && <p className={`mt-4 text-base leading-relaxed sm:text-lg ${dark ? 'text-mist' : 'text-muted'}`}>{intro}</p>}
    </div>
  )
}
