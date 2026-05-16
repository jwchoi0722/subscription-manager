import { create } from 'zustand';

import type { Subscription } from "./data";

import SubscriptionModal from './SubscriptionModal';
import SubscriptionDialog from './SubscriptionDialog';

import "./MonthView.css";

interface AddSubscriptionModalState {
  addModalInitialValues: Subscription | null
  setAddModalInitialValues: (sub: Subscription | null) => void
  isAddModalOpen: boolean
  setIsAddModalOpen: (isOpen: boolean) => void
  editModalInitialValues: Subscription | null
  setEditModalInitialValues: (sub: Subscription | null) => void
  isEditModalOpen: boolean
  setIsEditModalOpen: (isOpen: boolean) => void
  deleteModalInitialValues: Subscription | null
  setDeleteModalInitialValues: (sub: Subscription | null) => void
  isDeleteDialogOpen: boolean
  setIsDeleteDialogOpen: (isOpen: boolean) => void
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
  setIsAddModalOpen: (isOpen: boolean) => set(() => ({ isAddModalOpen: isOpen })),
  editModalInitialValues: null, 
  setEditModalInitialValues: (sub: Subscription | null) => set(() => ({ editModalInitialValues: sub })),
  isEditModalOpen: false,
  setIsEditModalOpen: (isOpen: boolean) => set(() => ({ isEditModalOpen: isOpen})),
  deleteModalInitialValues: null,
  setDeleteModalInitialValues: (sub: Subscription | null) => set(() => ({ deleteModalInitialValues: sub })),
  isDeleteDialogOpen: false,
  setIsDeleteDialogOpen: (isOpen: boolean) => set(() => ({ isDeleteDialogOpen: isOpen})),
}));

const useCalendarMonthStore = create<CalendarMonthState>()((set) => ({
  date: today,
  setYearMonth: (year: number, month: number) => set(() => ({ date: new Date(year, month) }))
}));

function MonthView({ subs, onAdd, onEdit, onDelete }:
  {
    subs: Subscription[], 
    onAdd: (subscription: Subscription) => void, 
    onEdit: (id: number, subscription: Subscription) => void, 
    onDelete: (id: number) => void
  }) 
{
  const calendarHeaderDateTimeFormat = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric", timeZone: "UTC" });

  const addModalInitialValues: Subscription | null = useAddSubscriptionModalStore((state) => state.addModalInitialValues);
  const setAddModalInitialValues: (sub: Subscription | null) => void = useAddSubscriptionModalStore((state) => state.setAddModalInitialValues);
  const isAddModalOpen: boolean = useAddSubscriptionModalStore((state) => state.isAddModalOpen);
  const setIsAddModalOpen: (isOpen: boolean) => void = useAddSubscriptionModalStore((state) => state.setIsAddModalOpen);
  const editModalInitialValues: Subscription | null = useAddSubscriptionModalStore((state) => state.editModalInitialValues);
  const setEditModalInitialValues: (sub: Subscription | null) => void = useAddSubscriptionModalStore((state) => state.setEditModalInitialValues);
  const isEditModalOpen: boolean = useAddSubscriptionModalStore((state) => state.isEditModalOpen);
  const setIsEditModalOpen: (isOpen: boolean) => void = useAddSubscriptionModalStore((state) => state.setIsEditModalOpen);
  const deleteModalInitialValues: Subscription | null = useAddSubscriptionModalStore((state) => state.deleteModalInitialValues);
  const setDeleteModalInitialValues: (sub: Subscription | null) => void = useAddSubscriptionModalStore((state) => state.setDeleteModalInitialValues);
  const isDeleteDialogOpen: boolean = useAddSubscriptionModalStore((state) => state.isDeleteDialogOpen);
  const setIsDeleteDialogOpen: (isOpen: boolean) => void = useAddSubscriptionModalStore((state) => state.setIsDeleteDialogOpen);

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
      let curr: Date = calendarDay.date;
      if (curr > sub.end) {
        break;
      }
      if (curr >= sub.start && curr <= sub.end) {
        calendarDay.subs.push(sub);
      }
    }
  }

  return (
    <>
      <h1>Monthly Calendar</h1>
      
      {
        isDeleteDialogOpen &&
        <SubscriptionDialog
          subscription={deleteModalInitialValues} 
          onSubmit={onDelete} 
          close={() => setIsDeleteDialogOpen(false)} 
        />
      }

      <button className="add-subscription-modal-button" onClick={() => {
        setAddModalInitialValues(null);
        setIsAddModalOpen(true);
      }}>
          Add New
      </button>
      {
        isAddModalOpen && 
        <SubscriptionModal 
          isAdd={true} 
          initValues={addModalInitialValues} 
          closeModal={() => setIsAddModalOpen(false)} 
          onSubmit={onAdd} 
        />
      }

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
              <div className={"calendar-entry" 
                + (entry.date.getMonth() !== currMonth ? " off-month" : "") 
                + (today.getDate() == entry.date.getDate() && today.getMonth() == entry.date.getMonth() && today.getFullYear() == entry.date.getFullYear() ? " today" : "")}
              >
                <div className="calendar-entry-header">
                  <h3>{entry.date.getDate()}</h3>
                </div>
                {entry.subs.map((sub: Subscription) => (
                  <div className={"calendar-entry-sub-entry"}>
                    <p>{sub.name}</p>
                    <span className="calendar-entry-sub-action" onClick={() => {
                      setAddModalInitialValues({
                        ...sub,
                        start: sub.end,
                        end: new Date(sub.end.getTime() + (sub.end.getTime() - sub.start.getTime())),
                        isChanged: false
                      } as Subscription);
                      setIsAddModalOpen(true);
                    }}>
                      +
                    </span>
                    <span className="calendar-entry-sub-action" onClick={() => {
                      setEditModalInitialValues(sub);
                      setIsEditModalOpen(true);
                    }}>
                      *
                    </span>
                    <span className="calendar-entry-sub-action" onClick={() => {
                      setDeleteModalInitialValues(sub);
                      setIsDeleteDialogOpen(true);
                    }}>
                      -
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      {
        isEditModalOpen && 
        <SubscriptionModal 
          isAdd={false}
          initValues={editModalInitialValues} 
          closeModal={() => setIsEditModalOpen(false)} 
          onSubmit={(sub: Subscription) => {
            onEdit(sub.id, sub);
          }}
        />
      }
    </>
  );
}

export default MonthView