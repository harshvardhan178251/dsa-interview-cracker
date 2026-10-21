import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { ProgressProvider } from '../../hooks/useProgress'

export function AppShell() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  // Close the mobile drawer whenever the route changes.
  useEffect(() => {
    setMobileNavOpen(false)
  }, [location.pathname])

  return (
    <ProgressProvider>
      <div className="flex h-full min-h-screen bg-canvas">
        {/* Desktop sidebar */}
        <aside className="hidden w-72 shrink-0 border-r border-line bg-surface lg:block">
          <div className="sticky top-0 h-screen overflow-y-auto">
            <Sidebar />
          </div>
        </aside>

        {/* Mobile drawer */}
        {mobileNavOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              type="button"
              aria-label="Close navigation"
              onClick={() => setMobileNavOpen(false)}
              className="absolute inset-0 bg-black/50"
            />
            <aside className="relative h-full w-72 overflow-y-auto border-r border-line bg-surface shadow-xl">
              <Sidebar />
            </aside>
          </div>
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar onOpenNav={() => setMobileNavOpen(true)} />
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <Outlet />
          </main>
          <footer className="border-t border-line px-6 py-4 text-xs text-faint">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span>
                DSA Interview Cracker — Java solutions with dry runs, complexity analysis and an
                in-browser runner.
              </span>
              <button
                type="button"
                onClick={() => navigate('/guides')}
                className="underline-offset-2 hover:text-muted hover:underline"
              >
                Read the study plan
              </button>
            </div>
          </footer>
        </div>
      </div>
    </ProgressProvider>
  )
}
