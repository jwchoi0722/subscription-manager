import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'

import './index.css'

import Welcome from './Welcome.tsx'
import App from './App.tsx'
import List from './List.tsx'
import Chart from './Chart.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<Welcome />} />
        <Route path="App" element={<App />} />
        <Route path="List" element={<List />} />
        <Route path="Chart" element={<Chart />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
