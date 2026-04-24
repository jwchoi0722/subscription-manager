import type { Subscription } from "./App";

import "./MonthView.css";

function MonthView({ subs, today, onAdd }:
  { subs: any[], today: Date, onAdd: (subscription: Subscription) => void }) {
  const testSub = {
    id: 4002,
    service: "HIDIVE",
    servicePlan: "Standard",
    name: "HIDIVE (Standard)",
    start: new Date("2026-01-09"),
    end: new Date("2026-02-09"),
    priceAmount: 8.99,
    priceCurrency: "CAD",
    totalAmount: 10.07,
    isAutoRenew: true,
    isChanged: false,
  };

  const calendarHeaderDateTimeFormat = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric", timeZone: "UTC" });

  const currYear = today.getFullYear();
  const currMonth = today.getMonth();
  // const currDate = today.getDate();
  const currMonthDayCount = new Date(currYear, currMonth + 1, 0).getDate();

  const calendarMonth = [];
  
  let firstDateOfMonthView = new Date(currYear, currMonth, 1);
  firstDateOfMonthView.setDate(firstDateOfMonthView.getDate() - firstDateOfMonthView.getDay());
  let lastDateOfMonthView = new Date(currYear, currMonth, currMonthDayCount);
  lastDateOfMonthView.setDate(lastDateOfMonthView.getDate() + 6 - lastDateOfMonthView.getDay());

  let dateOfMonth = new Date(firstDateOfMonthView);
  while (dateOfMonth <= lastDateOfMonthView) {
    calendarMonth.push({
      date: dateOfMonth,
      subs: new Array<string>()
    });
    dateOfMonth = new Date(dateOfMonth);
    dateOfMonth.setDate(dateOfMonth.getDate() + 1);
  }

  for (let sub of subs) {
    if (sub.start > lastDateOfMonthView || sub.end < firstDateOfMonthView) {
      continue;
    }

    for (let calendarDay of calendarMonth) {
      let curr = calendarDay.date;
      if (curr >= sub.start && curr <= sub.end) {
        calendarDay.subs.push(sub.name);
      }
      if (curr > sub.end) {
        break;
      }
    }
  }

  return (
    <>
      <h1>Monthly Calendar</h1>
      <p>Current Month: {calendarHeaderDateTimeFormat.format(today)} -  {currMonthDayCount} Days</p>

      <div className="calendar-container">
        <div className="calendar-grid-header">
          <div className="calendar-grid-header-entry">SUN</div>
          <div className="calendar-grid-header-entry">MON</div>
          <div className="calendar-grid-header-entry">TUE</div>
          <div className="calendar-grid-header-entry">WED</div>
          <div className="calendar-grid-header-entry">THU</div>
          <div className="calendar-grid-header-entry">FRI</div>
          <div className="calendar-grid-header-entry">SAT</div>
        </div>
        <div className="calendar-grid">
          {calendarMonth.map((entry) => (
            <div className={"calendar-entry"}>
              <div className="calendar-entry-header">
                <h3>{entry.date.getDate()}</h3>
              </div>
              {entry.subs.map((sub) => (
                <div className={"calendar-entry-sub-entry" + (entry.date.getMonth() !== currMonth ? " off-month" : "")}>
                  {sub}
                </div>
              ))}
            </div>
          ))}
        </div>
        <button className="add-subscription-modal-button">
            Add New
        </button>
      </div>
      <dialog id="add-subscription-modal" className="add-subscription-modal" open={true}>
        <div className="modal-close-button">X</div>
        <h3>Add New Subscription</h3>
        <form className="add-subscription-form">
          <div>
            <label htmlFor="service-name">Service:</label>
            <input type="text" name="service-name" />
            <label htmlFor="service-plan-name">Plan:</label>
            <input type="text" name="service-plan-name" />
          </div>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" />
          </div>
          <div>
            <label htmlFor="start-date">Start Date:</label>
            <input type="date" name="start-date" />
            <label htmlFor="end-date">End Date:</label>
            <input type="date" name="end-date" />
          </div>
          <div>
            <label htmlFor="amount">Amount:</label>
            <input type="number" name="amount" />
            <label htmlFor="total-amount">Total:</label>
            <input type="number" name="total-amount" />
          </div>
          <div>
            <label htmlFor="is-renew">Auto-Renew:</label>
            <input type="checkbox" name="is-renew" />
          </div>
        </form>
        <div className="add-subscription-save-button">
          <button onClick={() => {
            onAdd(testSub);
          }}>
            Save
          </button>
        </div>
      </dialog>
    </>
  );
}

export default MonthView