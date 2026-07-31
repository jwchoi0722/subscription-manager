import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'

import './index.css'

import Welcome from './Welcome.tsx'
import Layout from './Layout.tsx'
import Dashboard from './Dashboard.tsx'
import Calendar from './Calendar.tsx'
import List from './List.tsx'
import Chart from './Chart.tsx'
import Services from './Services.tsx'
import ServiceDetails from './ServiceDetails.tsx'

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
