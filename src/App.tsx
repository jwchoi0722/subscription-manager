import { create } from 'zustand';
import './App.css'

function App() {
  const useSubscriptionStore = create(() => ({
    subscriptions: [
      {
        id: 1003,
        service: "Netflix",
        servicePlan: "Standard",
        name: "Netflix (Standard)",
        start: new Date("2025-12-04"),
        end: new Date("2026-01-04"),
        priceAmount: 14.93,
        priceCurrency: "CAD",
        totalAmount: 16.72,
        isAutoRenew: true,
        isChanged: false,
      },
      {
        id: 1002,
        service: "Netflix",
        servicePlan: "Standard with ads",
        name: "Netflix (Standard with ads)",
        start: new Date("2025-11-23"),
        end: new Date("2025-12-04"),
        priceAmount: 7.99,
        priceCurrency: "CAD",
        totalAmount: 8.95,
        isAutoRenew: true,
        isChanged: true,
      },
      {
        id: 1001,
        service: "Netflix",
        servicePlan: "Standard with ads",
        name: "Netflix (Standard with ads)",
        start: new Date("2025-10-23"),
        end: new Date("2025-11-23"),
        priceAmount: 7.99,
        priceCurrency: "CAD",
        totalAmount: 8.95,
        isAutoRenew: true,
        isChanged: false,
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
        isChanged: false,
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
        isChanged: false,
      },
      {
        id: 4001,
        service: "HIDIVE",
        servicePlan: "Free Trial",
        name: "HIDIVE (Free Trial)",
        start: new Date("2026-01-02"),
        end: new Date("2026-01-09"),
        priceAmount: 0.00,
        priceCurrency: "CAD",
        totalAmount: 0.00,
        isAutoRenew: true,
        isChanged: false,
      }
    ]
  }));

  const currSubs = useSubscriptionStore((state) => state.subscriptions);
  const today = new Date("2026-01-02 00:00:01");
  const currYear = today.getFullYear();
  const currMonth = today.getMonth();
  const currDate = today.getDate();
  const currMonthDayCount = new Date(currYear, currMonth + 1, 0).getDate();

  const calendarHeaderDateTimeFormat = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
  const calendarDateTimeFormat = new Intl.DateTimeFormat("en-US", { weekday: "short", timeZone: "UTC" });
  const listDateTimeFormat = new Intl.DateTimeFormat("en-US", { month: "short", day: "2-digit", timeZone: "UTC" });
  
  const calendarMonth = [];
  for (let i = 1; i <= currMonthDayCount; i++) {
    calendarMonth.push({
      date: i,
      dayOfWeek: calendarDateTimeFormat.format(new Date(currYear, currMonth, i)),
      subs: new Array<string>()
    });
  }
  for (let sub of currSubs) {
    const date = new Date(currYear, currMonth, 1);
    for (let i = 1; i <= currMonthDayCount; i++) {
      date.setDate(i);
      const currIndex = i - 1;
      if (date >= sub.start && date <= sub.end) {
        calendarMonth[currIndex].subs.push(sub.name);
      }
    }
  }

  return (
    <>
      <h1>Monthly Calendar</h1>
      <div className="calendar-container">
        <span>Current Month: {calendarHeaderDateTimeFormat.format(today)} -  {currMonthDayCount} Days</span>

        {calendarMonth.map((entry) => (
          <div className="calendar-entry">
            <div className="calendar-entry-header">
              <h3>{entry.date} ({entry.dayOfWeek}) {entry.date === currDate ? "TODAY" : ""}</h3>
            </div>
            {entry.subs.map((sub) => (
              <p>{sub}</p>
            ))}
          </div>
        ))}
      </div>

      <h1>List</h1>
      <div className="list-container">
        {currSubs.map((entry) => (
          <div className="subscription-entry">
            <div className="subscription-entry-header">
              <h3>{entry.name} {entry.end >= today ? <span className="active-subscription">ACTIVE</span> : <span className="inactive-subscription"></span>}</h3>
            </div>
            <p>{listDateTimeFormat.format(entry.start)} - {listDateTimeFormat.format(entry.end)}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
