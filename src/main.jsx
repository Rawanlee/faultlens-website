import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { routes } from './lib/seo'
import './styles/index.css'

const root = document.getElementById('root')
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// Hydrate only when the prerendered HTML matches the current URL; otherwise
// (dev server, or a host serving the wrong file) render from scratch.
const path = window.location.pathname.replace(/\/$/, '') || '/'
const expected = routes[path] && path !== '/404' ? path : '/404'
if (root.firstElementChild && root.dataset.route === expected) {
  hydrateRoot(root, app)
} else {
  root.textContent = ''
  createRoot(root).render(app)
}
