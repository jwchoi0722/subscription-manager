import { useState } from 'react'
import { DayPilotMonth } from '@daypilot/daypilot-lite-react';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Monthly Calendar</h1>
      <div className="calendar-container">
        <DayPilotMonth
          startDate={"2025-12-01"}
        />
      </div>
    </>
  )
}

export default App
