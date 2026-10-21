import { Navigate, Route, Routes } from 'react-router-dom'

import { AppShell } from './components/layout/AppShell'
import { Catalog } from './pages/Catalog'
import { Dashboard } from './pages/Dashboard'
import { GuideDetail } from './pages/GuideDetail'
import { Guides } from './pages/Guides'
import { NotFound } from './pages/NotFound'
import { ProblemDetail } from './pages/ProblemDetail'
import { Review } from './pages/Review'

export function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<Dashboard />} />
        <Route path="problems" element={<Catalog />} />
        <Route path="problems/:slug" element={<ProblemDetail />} />
        <Route path="review" element={<Review />} />
        <Route path="guides" element={<Guides />} />
        <Route path="guides/*" element={<GuideDetail />} />
        <Route path="problems" element={<Navigate to="/problems" replace />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
