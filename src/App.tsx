import { create } from 'zustand';
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
      },
      {
        id: 3,
        text: "Event 3",
        start: "2025-12-18",
        end: "2025-12-25",
      },
    ]
  }));

  const currEvents = useEventStore((state) => state.events);

  return (
    <>
      <h1>Monthly Calendar</h1>
      <div className="calendar-container">
        {currEvents.map((entry) => (
          <div className="event">
            <h3>{entry.text}</h3>
            <p>{entry.start} - {entry.end}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
