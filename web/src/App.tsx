import { Route, Routes } from 'react-router-dom'

import { AppShell } from './components/layout/AppShell'
import { Catalog } from './pages/Catalog'
import { Dashboard } from './pages/Dashboard'
import { GuideDetail } from './pages/GuideDetail'
import { Guides } from './pages/Guides'
import { IbpsPage } from './pages/IbpsPage'
import { Landing } from './pages/Landing'
import { NotFound } from './pages/NotFound'
import { ProblemDetail } from './pages/ProblemDetail'
import { Review } from './pages/Review'
import { CompanyPage, TopicPage } from './pages/TopicPage'

export function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<Landing />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="problems" element={<Catalog />} />
        <Route path="problems/:slug" element={<ProblemDetail />} />
        <Route path="topics/:topic" element={<TopicPage />} />
        <Route path="companies/:company" element={<CompanyPage />} />
        <Route path="ibps" element={<IbpsPage />} />
        <Route path="review" element={<Review />} />
        <Route path="guides" element={<Guides />} />
        <Route path="guides/*" element={<GuideDetail />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
