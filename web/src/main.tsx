import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { App } from './App'
import { ThemeProvider } from './hooks/useTheme'
import './index.css'

const container = document.getElementById('root')
if (!container) throw new Error('Root element #root not found')

// `import.meta.env.BASE_URL` is e.g. "/dsa-interview-cracker/" for a sub-path
// deployment; React Router wants it without the trailing slash.
const basename = import.meta.env.BASE_URL.replace(/\/+$/, '')

// GitHub Pages answers an unknown path with `404.html`, which stores the
// requested URL and bounces here. Restore it before the router reads the
// location, so the deep link renders on a 200 instead of a 404.
try {
  const stored = sessionStorage.getItem('dsa:redirect')
  if (stored) {
    sessionStorage.removeItem('dsa:redirect')
    const target = new URL(stored)
    if (
      target.origin === window.location.origin &&
      target.pathname.startsWith(`${basename}/`)
    ) {
      window.history.replaceState(null, '', target.pathname + target.search + target.hash)
    }
  }
} catch {
  /* sessionStorage unavailable — the app still works, just at the root */
}

createRoot(container).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)

// Register the service worker so the site keeps working offline.
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).catch(() => {
      /* the site works fine without it */
    })
  })
}
