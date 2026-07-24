import { create } from 'zustand';
import { useState, useRef } from 'react';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import SubscriptionDetails from './SubscriptionDetails';
import SubscriptionModal from './SubscriptionModal';
import SubscriptionDialog from './SubscriptionDialog';
import CalendarDateDetails from './CalendarDateDetails';

import './Calendar.css'

import { addSubscription, updateSubscription, deleteSubscription, TimeUnit } from "./data";
import { getSubscriptions, getServices } from "./data";
import type { Subscription, Service } from "./data";

import { useSubscriptionModalStore } from './store';

// const today: Date = new Date();
const today: Date = new Date(2026, 0, 2);

interface SubscriptionsState {
  subscriptions: Subscription[]
  services: Service[]
  add: (subscription: Subscription) => void
  edit: (id: number, subscription: Subscription) => void
  delete: (id: number) => void
}

const useSubscriptionStore = create<SubscriptionsState>()((set) => ({
  subscriptions: getSubscriptions(),
  services: getServices(),
  add: (subscription: Subscription) => set((state: SubscriptionsState) => ({ subscriptions: [...state.subscriptions, subscription] })),
  edit: (id: number, subscription: Subscription) => set((state: SubscriptionsState) => ({ subscriptions: [...state.subscriptions.map((entry) => entry.id === id ? subscription : entry)] })),
  delete: (id: number) => set((state: SubscriptionsState) => ({ subscriptions: [...state.subscriptions.filter((entry) => entry.id !== id )] }))
}));

function Calendar() {
  const currSubs = useSubscriptionStore((state) => state.subscriptions);
  const services = useSubscriptionStore((state) => state.services);
  const serviceNames: string[] = services.map((ser) => ser.name);

  const addFunc = useSubscriptionStore((state) => state.add);
  const editFunc = useSubscriptionStore((state) => state.edit);
  const deleteFunc = useSubscriptionStore((state) => state.delete);

  const [selectedSub, setSelectedSub] = useState<Subscription | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [eventClickCoords, setEventClickCoords] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
  const [dateClickCoords, setDateClickCoords] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
  const [isDateDetailsOpen, setIsDateDetailsOpen] = useState<boolean>(false);

  const containerElement = useRef<HTMLDivElement>(null);

  const detailsModalValues: Subscription | null = useSubscriptionModalStore((state) => state.detailsModalValues);
  const setDetailsModalValues: (sub: Subscription | null) => void = useSubscriptionModalStore((state) => state.setDetailsModalValues);
  const isDetailsModalOpen: boolean = useSubscriptionModalStore((state) => state.isDetailsModalOpen);
  const setIsDetailsModalOpen: (isOpen: boolean) => void = useSubscriptionModalStore((state) => state.setIsDetailsModalOpen);
  const isAddModalOpen: boolean = useSubscriptionModalStore((state) => state.isAddModalOpen);
  const setIsAddModalOpen: (isOpen: boolean) => void = useSubscriptionModalStore((state) => state.setIsAddModalOpen);
  const isEditModalOpen: boolean = useSubscriptionModalStore((state) => state.isEditModalOpen);
  const setIsEditModalOpen: (isOpen: boolean) => void = useSubscriptionModalStore((state) => state.setIsEditModalOpen);
  const isDeleteDialogOpen: boolean = useSubscriptionModalStore((state) => state.isDeleteDialogOpen);
  const setIsDeleteDialogOpen: (isOpen: boolean) => void = useSubscriptionModalStore((state) => state.setIsDeleteDialogOpen);

  const onAdd = (subscription: Subscription) => {
    addFunc(subscription);
    addSubscription(subscription);
  };
  const onEdit = (subscription: Subscription) => {
    editFunc(subscription.id, subscription);
    updateSubscription(subscription.id, subscription); // TODO func signature
  };
  const onDelete = (id: number) => {
    deleteFunc(id);
    deleteSubscription(id);
  }

  const onEventClick = (info: { event: { id: string, title: string }, jsEvent: { clientX: number, clientY: number } }) => {
    const sub: Subscription | undefined = currSubs.find((sub) => sub.id === Number(info.event.id)); // TODO filter out upcoming subs properly instead of id match
    if (sub === undefined || containerElement.current === null) {
      return;
    }

    setIsAddModalOpen(false);
    setIsEditModalOpen(false);

    const containerRect = containerElement.current.getBoundingClientRect();
    setEventClickCoords({ x: info.jsEvent.clientX - containerRect.left, y: info.jsEvent.clientY - containerRect.top + 50 });
    setSelectedSub(sub);
    setDetailsModalValues(sub as Subscription);
    setIsDetailsModalOpen(true);
  };

  const onDateClick = (info: { date: Date, dayEl: HTMLElement }) => {
    if (selectedDate?.getTime() === info.date.getTime() && containerElement.current !== null) {
      const containerRect = containerElement.current.getBoundingClientRect();
      const dayElementRect = info.dayEl.getBoundingClientRect();
      setDateClickCoords({ x: 0, y: dayElementRect.bottom - containerRect.top + 20 });

      setIsDateDetailsOpen(true);
    }
    setSelectedDate(info.date);
  };

  const onEventDrop = (info: { event: { id: string, start: Date | null, end: Date | null } }) => {
    const idNum: number = Number(info.event.id);
    const sub: Subscription | undefined = currSubs.find((sub) => sub.id === idNum);
    if (sub === undefined) {
      return;
    }
    sub.start = info.event.start ?? sub.start;
    sub.end = info.event.end ?? sub.end;

    setSelectedSub(sub);
    editFunc(idNum, sub);
    updateSubscription(idNum, sub);
  };

  // TODO drag to resize

  const serviceColors: Map<string, string> = new Map();
  for (const service of services) {
    if (service.color !== undefined) {
      serviceColors.set(service.name, service.color);
    }
  }

  const events: { id: string, title: string, start: Date, end: Date, allDay: boolean }[] = [];
  for (const sub of currSubs) {
    let event = { id: String(sub.id), title: sub.name, start: sub.start, end: sub.end, allDay: true, 
      backgroundColor: (serviceColors.get(sub.service) ?? ""),
      borderColor: (selectedSub?.id == sub.id ? "white" : "")
    };

    events.push(event);

    if (sub.isAutoRenew && sub.start <= today && sub.end > today) {
      const nextStart: Date = new Date(sub.end);
      const nextEnd: Date = new Date(sub.end);
      switch (sub.durationUnit) {
        case TimeUnit.Year:
          nextEnd.setFullYear(nextEnd.getFullYear() + sub.durationLength);
          break;
        case TimeUnit.Month:
          nextEnd.setMonth(nextEnd.getMonth() + sub.durationLength);
          break;
        case TimeUnit.Week:
          nextEnd.setDate(nextEnd.getDate() + 7 * sub.durationLength);
          break;
        case TimeUnit.Day:
          nextEnd.setDate(nextEnd.getDate() + sub.durationLength);
          break;
        default:
          break;
      }
      let next = { id: String(sub.id) + "_upcoming", title: sub.name, start: nextStart, end: nextEnd, allDay: true, 
        classNames: [ "upcoming-event-bar" ],
        backgroundColor: (serviceColors.get(sub.service) ?? "")
      }
      events.push(next);
    }
  }
  
  const calendarButtons = {
    addSubscriptionButton: {
      text: "+ Add New",
      click: () => {
        setIsEditModalOpen(false);
        setDetailsModalValues(null);
        setIsAddModalOpen(true);
      }
    }
  };

  // TODO Undo Redo buttons

  return (
    <div className="calendar-container" ref={containerElement}>
      {
        isAddModalOpen &&
        <SubscriptionModal initValues={detailsModalValues} serviceOptions={serviceNames}
          pos={eventClickCoords}
          isAdd={true}
          onSubmit={onAdd} closeModal={() => setIsAddModalOpen(false)}
        />
      }
      {
        isDateDetailsOpen &&
        <CalendarDateDetails 
          subs={currSubs.filter((sub) => selectedDate !== null && sub.start <= selectedDate && selectedDate <= sub.end)} 
          pos={dateClickCoords}
          closeModal={() => setIsDateDetailsOpen(false)}
        />
      }
      <FullCalendar plugins={[ dayGridPlugin, interactionPlugin ]} initialView="dayGridMonth" 
        events={events}
        eventClassNames={["event-bar"]}
        selectable={false}
        eventStartEditable={true}
        eventDurationEditable={false}
        eventResizableFromStart={false}
        eventDrop={onEventDrop}
        now={today}
        eventClick={onEventClick}
        dateClick={onDateClick}
        dayCellClassNames={(arg: { date: Date }) => selectedDate !== null && arg.date.getTime() == selectedDate.getTime() ? "date-selected" : ""}
        height="auto"
        customButtons={calendarButtons}
        headerToolbar={{ left: "title", center: "addSubscriptionButton", right: "today prevYear prev next nextYear" }}
        footerToolbar={{ left: "", right: "today prevYear prev next nextYear" }}
      />
      {
        isDetailsModalOpen &&
        <SubscriptionDetails sub={detailsModalValues} pos={eventClickCoords}
          closeModal={() => {
            setSelectedSub(null);
            setIsDetailsModalOpen(false);
          }}
          openEditModal={() => {
            setIsDetailsModalOpen(false);
            setIsAddModalOpen(false);
            setIsEditModalOpen(true);
          }}
          openDeleteDialog={() => {
            setIsDetailsModalOpen(false);
            setIsAddModalOpen(false);
            setIsDeleteDialogOpen(true);
          }}
          openAddModal={(initValues: Subscription) => {
            setIsDetailsModalOpen(false);
            setIsEditModalOpen(false);
            setDetailsModalValues(initValues);
            setIsAddModalOpen(true);
          }}
        />
      }
      {
        isEditModalOpen &&
        <SubscriptionModal initValues={detailsModalValues} serviceOptions={serviceNames}
          pos={eventClickCoords}
          isAdd={false}
          onSubmit={onEdit} closeModal={() => setIsEditModalOpen(false)}
        />
      }
      {
        isDeleteDialogOpen &&
        <SubscriptionDialog
          subscription={detailsModalValues} 
          pos={eventClickCoords}
          onSubmit={onDelete} 
          close={() => setIsDeleteDialogOpen(false)} 
        />
      }
    </div>
  )
}

export default Calendar
