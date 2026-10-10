import { create } from 'zustand';

import type { Subscription, Service } from "./data";

import { useSubscriptionModalStore } from './store';
import { getCurrDate } from "./dateTimeService";
import MonthEntryView from './MonthEntryView';
import SubscriptionModal from './SubscriptionModal';
import SubscriptionDialog from './SubscriptionDialog';
import SubscriptionDetails from './SubscriptionDetails';

import "./MonthView.css";

interface CalendarMonthState {
  date: Date
  setYearMonth: (year: number, month: number) => void
}

const calendarHeaderDateTimeFormat = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" });

const useCalendarMonthStore = create<CalendarMonthState>()((set) => ({
  date: new Date(),
  setYearMonth: (year: number, month: number) => set(() => ({ date: new Date(year, month) }))
}));

function MonthView({ subs, services, onAdd, onEdit, onDelete }:
  {
    subs: Subscription[], 
    services: Service[],
    onAdd: (subscription: Subscription) => void, 
    onEdit: (id: number, subscription: Subscription) => void, 
    onDelete: (id: number) => void
  }) 
{
  const today: Date = getCurrDate();

  const addModalInitialValues: Subscription | null = useSubscriptionModalStore((state) => state.addModalInitialValues);
  const setAddModalInitialValues: (sub: Subscription | null) => void = useSubscriptionModalStore((state) => state.setAddModalInitialValues);
  const isAddModalOpen: boolean = useSubscriptionModalStore((state) => state.isAddModalOpen);
  const setIsAddModalOpen: (isOpen: boolean) => void = useSubscriptionModalStore((state) => state.setIsAddModalOpen);
  const editModalInitialValues: Subscription | null = useSubscriptionModalStore((state) => state.editModalInitialValues);
  const isEditModalOpen: boolean = useSubscriptionModalStore((state) => state.isEditModalOpen);
  const setIsEditModalOpen: (isOpen: boolean) => void = useSubscriptionModalStore((state) => state.setIsEditModalOpen);
  const deleteModalInitialValues: Subscription | null = useSubscriptionModalStore((state) => state.deleteModalInitialValues);
  const isDeleteDialogOpen: boolean = useSubscriptionModalStore((state) => state.isDeleteDialogOpen);
  const setIsDeleteDialogOpen: (isOpen: boolean) => void = useSubscriptionModalStore((state) => state.setIsDeleteDialogOpen);
  const detailsModalValues: Subscription | null = useSubscriptionModalStore((state) => state.detailsModalValues);
  const isDetailsModalOpen: boolean = useSubscriptionModalStore((state) => state.isDetailsModalOpen);
  const setIsDetailsModalOpen: (isOpen: boolean) => void = useSubscriptionModalStore((state) => state.setIsDetailsModalOpen);

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
          serviceOptions={services.map((service: Service) => service.name)}
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

        <div>
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
              <MonthEntryView key={entry.date.toISOString().slice(0, 10)} date={entry.date} subs={entry.subs} today={today} />
            ))}
          </div>
        </div>
      </div>
      {
        isEditModalOpen && 
        <SubscriptionModal 
          isAdd={false}
          initValues={editModalInitialValues}
          serviceOptions={services.map((service: Service) => service.name)}
          closeModal={() => setIsEditModalOpen(false)} 
          onSubmit={(sub: Subscription) => {
            onEdit(sub.id, sub);
          }}
        />
      }
      {
        isDetailsModalOpen &&
        <SubscriptionDetails sub={detailsModalValues} 
          closeModal={() => setIsDetailsModalOpen(false)}
          openEditModal={() => console.log("TODO EDIT")}
          openDeleteDialog={() => console.log("TODO DELETE")}
          openAddModal={() => console.log("TODO ADD")}
        />
      }
    </>
  );
}

export default MonthView