import { create } from 'zustand';
import './App.css'

function App() {
  const useSubscriptionStore = create(() => ({
    subscriptions: [
      {
        id: 1002,
        service: "Netflix",
        servicePlan: "Standard with ads",
        name: "Netflix (Standard with ads)",
        start: new Date("2025-12-04"),
        end: new Date("2026-01-04"),
        priceAmount: 7.99,
        priceCurrency: "CAD",
        totalAmount: 8.95,
        isAutoRenew: true,
      },
      {
        id: 1001,
        service: "Netflix",
        servicePlan: "Standard with ads",
        name: "Netflix (Standard with ads)",
        start: new Date("2025-11-04"),
        end: new Date("2025-12-04"),
        priceAmount: 7.99,
        priceCurrency: "CAD",
        totalAmount: 8.95,
        isAutoRenew: true,
      },
      {
        id: 2001,
        service: "Disney Plus",
        servicePlan: "Premium",
        name: "Disney+ (Premium)",
        start: new Date("2025-12-02"),
        end: new Date("2026-01-02"),
        priceAmount: 16.99,
        priceCurrency: "CAD",
        totalAmount: 18.98,
        isAutoRenew: false,
      },
      {
        id: 3001,
        service: "Crunchyroll",
        servicePlan: "Fan",
        name: "Crunchyroll (Fan)",
        start: new Date("2025-11-02"),
        end: new Date("2026-11-02"),
        priceAmount: 82.99,
        priceCurrency: "CAD",
        totalAmount: 93.74,
        isAutoRenew: false,
      }
    ]
  }));

  const currSubs = useSubscriptionStore((state) => state.subscriptions);
  const today = new Date("2026-01-02");

  return (
    <>
      <h1>Monthly Calendar</h1>
      <div className="calendar-container">
        {currSubs.map((entry) => (
          <div className="subscription-entry">
            <div className="subscription-entry-header">
              <h3>{entry.name} {entry.end >= today ? <span className="active-subscription">ACTIVE</span> : <span className="inactive-subscription"></span>}</h3>
            </div>
            <p>{entry.start.toDateString()} - {entry.end.toDateString()}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
