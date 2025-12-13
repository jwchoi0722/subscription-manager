import { create } from 'zustand';
import { DayPilotMonth } from '@daypilot/daypilot-lite-react';
import './App.css'

function App() {
  const useEventStore = create(() => ({
    events: [
      {
        id: 1,
        text: "Event 1",
        start: "2025-12-04",
        end: "2025-12-05",
      },
      {
        id: 2,
        text: "Event 2",
        start: "2025-12-23",
        end: "2025-12-31",
      }
    ]
  }));

  const currEvents = useEventStore((state) => state.events);

  return (
    <>
      <h1>Monthly Calendar</h1>
      <div className="calendar-container">
        <DayPilotMonth
          startDate={"2025-12-01"}
          events={currEvents}
        />
      </div>
    </>
  )
}

export default App
