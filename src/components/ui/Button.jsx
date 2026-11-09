import { Link } from 'react-router-dom'
import { track } from '../../lib/analytics'

const styles = {
  primary: 'bg-amber text-ink hover:bg-[#ffc14d] shadow-[0_1px_0_rgba(255,255,255,.4)_inset]',
  dark: 'bg-ink text-paper hover:bg-ink-3',
  ghost: 'border border-line/40 text-ink hover:bg-ink/5',
  ghostDark: 'border border-white/15 text-paper hover:bg-white/5',
}

export default function Button({ href, to, variant = 'primary', children, className = '', event, ...rest }) {
  const cls = `focus-ring inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors ${styles[variant]} ${className}`
  const onClick = (e) => { if (event) track(event); rest.onClick?.(e) }
  if (to) return <Link to={to} className={cls} {...rest} onClick={onClick}>{children}</Link>
  if (href) return <a href={href} className={cls} {...rest} onClick={onClick}>{children}</a>
  return <button className={cls} {...rest} onClick={onClick}>{children}</button>
}
