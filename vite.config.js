import { existsSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// `vite preview` only serves dist/<route>/index.html for URLs with a trailing
// slash. This mirrors production static hosting: /privacy → privacy/index.html,
// unknown paths → 404.html with a 404 status.
const prerenderedRoutes = () => ({
  name: 'prerendered-routes',
  configurePreviewServer(server) {
    const dist = resolve(server.config.root, server.config.build.outDir)
    server.middlewares.use((req, res, next) => {
      const path = decodeURIComponent(req.url.split('?')[0]).replace(/\/$/, '')
      if (!path || path.includes('.')) return next()
      if (existsSync(join(dist, path, 'index.html'))) { req.url = `${path}/index.html`; return next() }
      res.statusCode = 404
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      res.end(readFileSync(join(dist, '404.html')))
    })
  },
})

export default defineConfig({
  plugins: [react(), tailwindcss(), prerenderedRoutes()],
  build: { sourcemap: false },
})
