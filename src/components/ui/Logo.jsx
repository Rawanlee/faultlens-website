export function LogoMark({ className = 'h-8 w-8' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect width="64" height="64" rx="15" fill="#0F1720" />
      <circle cx="28" cy="28" r="15" fill="none" stroke="#FFB224" strokeWidth="5" />
      <path d="M20.5 21.5 L27.5 28 L24 31 L32 37.5" fill="none" stroke="#F6F4EF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M39.5 39.5 L50 50" stroke="#FFB224" strokeWidth="7" strokeLinecap="round" />
      <circle cx="50.5" cy="15" r="4" fill="#19A974" />
    </svg>
  )
}

export default function Logo({ dark = false, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark />
      <span className={`font-display text-[1.35rem] font-bold tracking-tight ${dark ? 'text-paper' : 'text-ink'}`}>
        fault<span className="text-amber">lens</span>
      </span>
    </span>
  )
}
