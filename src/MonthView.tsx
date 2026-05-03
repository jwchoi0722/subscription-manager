import { create } from 'zustand';

import type { Subscription } from "./App";

import SubscriptionModal from './SubscriptionModal';

import "./MonthView.css";

interface AddSubscriptionModalState {
  addModalInitialValues: Subscription | null
  setAddModalInitialValues: (sub: Subscription | null) => void
  isAddModalOpen: boolean
  setIsAddModalOpen: (isOpen: boolean) => void
}

interface CalendarMonthState {
  date: Date
  setYearMonth: (year: number, month: number) => void
}

// const today: Date = new Date();
const today: Date = new Date(2026, 0, 2);

const useAddSubscriptionModalStore = create<AddSubscriptionModalState>()((set) => ({
  addModalInitialValues: null,
  setAddModalInitialValues: (sub: Subscription | null) => set(() => ({ addModalInitialValues: sub })),
  isAddModalOpen: false,
  setIsAddModalOpen: (isOpen: boolean) => set(() => ({ isAddModalOpen: isOpen }))
}));

const useCalendarMonthStore = create<CalendarMonthState>()((set) => ({
  date: today,
  setYearMonth: (year: number, month: number) => set(() => ({ date: new Date(year, month) }))
}));

function MonthView({ subs, onAdd }:
  { subs: Subscription[], onAdd: (subscription: Subscription) => void }) {
  const calendarHeaderDateTimeFormat = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric", timeZone: "UTC" });

  const addModalInitialValues: Subscription | null = useAddSubscriptionModalStore((state) => state.addModalInitialValues);
  const setAddModalInitialValues: (sub: Subscription | null) => void = useAddSubscriptionModalStore((state) => state.setAddModalInitialValues);
  const isAddModalOpen: boolean = useAddSubscriptionModalStore((state) => state.isAddModalOpen);
  const setIsAddModalOpen: (isOpen: boolean) => void = useAddSubscriptionModalStore((state) => state.setIsAddModalOpen);

  const currDate: Date = useCalendarMonthStore((state) => state.date);
  const currYear: number = currDate.getFullYear();
  const currMonth: number = currDate.getMonth();
  const setYearMonth: (year: number, month: number) => void = useCalendarMonthStore((state) => state.setYearMonth);

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
      subs: new Array<Subscription>()
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
        calendarDay.subs.push(sub);
      }
      if (curr > sub.end) {
        break;
      }
    }
  }

  return (
    <>
      <h1>Monthly Calendar</h1>
      <div className="calendar-control">
        <button onClick={() => setYearMonth(currYear, currMonth - 1)}>&lt;</button>
        <button onClick={() => setYearMonth(currYear, currMonth + 1)}>&gt;</button>
      </div>
      <div>
        <p>Current Month: {calendarHeaderDateTimeFormat.format(currDate)} -  {currMonthDayCount} Days</p>

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
              <div className="calendar-entry">
                <div className="calendar-entry-header">
                  <h3>{entry.date.getDate()}</h3>
                </div>
                {entry.subs.map((sub: Subscription) => (
                  <div className={"calendar-entry-sub-entry" + (entry.date.getMonth() !== currMonth ? " off-month" : "")}>
                    <p>{sub.name}</p>
                    <span onClick={() => {
                      setAddModalInitialValues({
                        ...sub,
                        start: sub.end,
                        end: new Date(sub.end.getTime() + (sub.end.getTime() - sub.start.getTime())),
                        isChanged: false
                      } as Subscription);
                      setIsAddModalOpen(true);
                    }}>+</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <button className="add-subscription-modal-button" onClick={() => {
        setAddModalInitialValues(null);
        setIsAddModalOpen(true);
      }}>
          Add New
      </button>
      {
        isAddModalOpen && <SubscriptionModal initValues={addModalInitialValues} closeModal={() => setIsAddModalOpen(false)} onSubmit={onAdd} />
      }
    </>
  );
}

export default MonthView