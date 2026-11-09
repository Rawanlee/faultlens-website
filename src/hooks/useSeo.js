import { useEffect } from 'react'
import { metaFor } from '../lib/seo'

// Keeps the document title and description in sync during client-side navigation.
// Full head tags are written into each prerendered HTML file at build time.
export default function useSeo(path) {
  useEffect(() => {
    const m = metaFor(path)
    document.title = m.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', m.description)
  }, [path])
}
