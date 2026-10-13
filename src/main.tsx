import { StrictMode, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'

import './index.css'

import Welcome from './Welcome.tsx'
import Layout from './Layout.tsx'
const Dashboard = lazy(() => import('./Dashboard.tsx'));
const Calendar = lazy(() => import('./Calendar.tsx'));
const List = lazy(() => import('./List.tsx'));
const Chart = lazy(() => import('./Chart.tsx'));
const Services = lazy(() => import('./Services.tsx'));
const ServiceDetails = lazy(() => import('./ServiceDetails.tsx'));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<Welcome />} />
        <Route element={<Layout />}>
          <Route path="Dashboard" element={<Dashboard />} />
          <Route path="Calendar" element={<Calendar />} />
          <Route path="List" element={<List />} />
          <Route path="Chart" element={<Chart />} />
          <Route path="Services">
            <Route index element={<Services />} />
            <Route path=":id" element={<ServiceDetails />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
