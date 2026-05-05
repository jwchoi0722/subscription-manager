import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'

import './index.css'

import Welcome from './Welcome.tsx'
import App from './App.tsx'
import Service from './Service.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<Welcome />} />
        <Route path="App" element={<App />} />
        <Route path="Service/:service" element={<Service />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
