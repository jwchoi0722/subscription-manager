import { create } from 'zustand';
import { clsx } from 'clsx'
import { useState, lazy } from 'react';

import { EventCalendar } from '@/components/event-calendar'

import SubscriptionDetails from './SubscriptionDetails';
const SubscriptionModal = lazy(() => import('./SubscriptionModal'));
import SubscriptionDialog from './SubscriptionDialog';
import CalendarDateDetails from './CalendarDateDetails';

import './Calendar.css'

import { addSubscription, updateSubscription, deleteSubscription, SubscriptionStatus } from "./data";
import { getSubscriptions, getServices } from "./data";
import type { Subscription, Service } from "./data";

import { useSubscriptionModalStore } from './store';
import { getCurrDate } from './dateTimeService';

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
  const today: Date = getCurrDate();
  
  const currSubs = useSubscriptionStore((state) => state.subscriptions);
  const services = useSubscriptionStore((state) => state.services);
  const serviceNames: string[] = services.map((ser) => ser.name);

  const addFunc = useSubscriptionStore((state) => state.add);
  const editFunc = useSubscriptionStore((state) => state.edit);
  const deleteFunc = useSubscriptionStore((state) => state.delete);

  const [selectedSub, setSelectedSub] = useState<Subscription | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDateDetailsOpen, setIsDateDetailsOpen] = useState<boolean>(false);

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
    if (sub === undefined) {
      return;
    }

    setIsAddModalOpen(false);
    setIsEditModalOpen(false);

    setSelectedSub(sub);
    setDetailsModalValues(sub as Subscription);
    setIsDetailsModalOpen(true);
  };

  const onDateClick = (info: { date: Date, dayEl: HTMLElement }) => {
    if (selectedDate?.getTime() === info.date.getTime()) {
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
    let classes: string = clsx(
      sub.status === SubscriptionStatus.Upcoming && "upcoming-event-bar italic",
      selectedSub?.id == sub.id && "selected-event"
    );
    let event = { id: String(sub.id), title: sub.name, start: sub.start, end: sub.end, allDay: true, 
      className: classes,
      color: (serviceColors.get(sub.service) ?? "")
    };

    events.push(event);
  }
  
  const addSubscriptionButton = {
    text: "+ Add New",
    click: () => {
      setIsEditModalOpen(false);
      setDetailsModalValues(null);
      setIsAddModalOpen(true);
    }
  };

  // TODO Undo Redo buttons

  return (
    <div className="calendar-container">
      {
        isAddModalOpen &&
        <SubscriptionModal initValues={detailsModalValues} serviceOptions={serviceNames}
          isAdd={true}
          onSubmit={onAdd} closeModal={() => setIsAddModalOpen(false)}
        />
      }
      {
        isDateDetailsOpen &&
        <CalendarDateDetails 
          date={selectedDate as Date}
          subs={currSubs.filter((sub) => selectedDate !== null && sub.start <= selectedDate && selectedDate <= sub.end)} 
          closeModal={() => setIsDateDetailsOpen(false)}
        />
      }
      <EventCalendar initialView="dayGridMonth" 
        events={events}
        eventClass="event-bar"
        selectable={false}
        eventStartEditable={true}
        eventDurationEditable={false}
        eventResizableFromStart={false}
        eventDrop={onEventDrop}
        now={today}
        eventClick={onEventClick}
        dateClick={onDateClick}
        dayCellTopClass="mb-8"
        dayCellClass={(info: { date: Date }) => clsx(selectedDate !== null && info.date.getTime() == selectedDate.getTime() && "date-selected")}
        height="auto"
        addButton={addSubscriptionButton}
      />
      {
        isDetailsModalOpen &&
        <SubscriptionDetails sub={detailsModalValues}
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
          isAdd={false}
          onSubmit={onEdit} closeModal={() => setIsEditModalOpen(false)}
        />
      }
      {
        isDeleteDialogOpen &&
        <SubscriptionDialog
          subscription={detailsModalValues}
          onSubmit={onDelete} 
          close={() => setIsDeleteDialogOpen(false)} 
        />
      }
    </div>
  )
}

export default Calendar
