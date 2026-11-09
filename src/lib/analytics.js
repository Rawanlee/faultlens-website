// Lightweight event tracking. Sends to Plausible or a GA/GTM dataLayer when
// one is present on the page; otherwise does nothing.
export function track(name, props = {}) {
  if (typeof window === 'undefined') return
  if (import.meta.env.VITE_ANALYTICS_ENABLED !== 'true') return
  if (typeof window.plausible === 'function') window.plausible(name, { props })
  if (Array.isArray(window.dataLayer)) window.dataLayer.push({ event: name, ...props })
}
