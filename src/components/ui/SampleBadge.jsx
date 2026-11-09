export default function SampleBadge({ className = '' }) {
  return (
    <span className={`inline-flex items-center rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-mist ${className}`}>
      Sample data
    </span>
  )
}
