import { create } from 'zustand';
import { useState } from 'react';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import SubscriptionDetails from './SubscriptionDetails';
import SubscriptionModal from './SubscriptionModal';
import SubscriptionDialog from './SubscriptionDialog';

import './Calendar.css'

// import { addSubscription, updateSubscription, deleteSubscription, getSubscriptions, getServices } from "./data";
import { updateSubscription, deleteSubscription } from "./data";
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
  // const services = useSubscriptionStore((state) => state.services);
  // const addFunc = useSubscriptionStore((state) => state.add);
  const editFunc = useSubscriptionStore((state) => state.edit);
  const deleteFunc = useSubscriptionStore((state) => state.delete);

  const [selectedSub, setSelectedSub] = useState<Subscription | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const detailsModalValues: Subscription | null = useSubscriptionModalStore((state) => state.detailsModalValues);
  const setDetailsModalValues: (sub: Subscription | null) => void = useSubscriptionModalStore((state) => state.setDetailsModalValues);
  const isDetailsModalOpen: boolean = useSubscriptionModalStore((state) => state.isDetailsModalOpen);
  const setIsDetailsModalOpen: (isOpen: boolean) => void = useSubscriptionModalStore((state) => state.setIsDetailsModalOpen);
  const isEditModalOpen: boolean = useSubscriptionModalStore((state) => state.isEditModalOpen);
  const setIsEditModalOpen: (isOpen: boolean) => void = useSubscriptionModalStore((state) => state.setIsEditModalOpen);
  const isDeleteDialogOpen: boolean = useSubscriptionModalStore((state) => state.isDeleteDialogOpen);
  const setIsDeleteDialogOpen: (isOpen: boolean) => void = useSubscriptionModalStore((state) => state.setIsDeleteDialogOpen);

  // const onAdd = (subscription: Subscription) => {
  //   addFunc(subscription);
  //   addSubscription(subscription);
  // };
  const onEdit = (subscription: Subscription) => {
    editFunc(subscription.id, subscription);
    updateSubscription(subscription.id, subscription); // TODO func signature
  };
  const onDelete = (id: number) => {
    deleteFunc(id);
    deleteSubscription(id);
  }

  const onEventClick = (info: { event: { id: string, title: string }, jsEvent: { pageX: number, pageY: number } }) => {
    setIsEditModalOpen(false);
    const sub: Subscription | undefined = currSubs.find((sub) => sub.id === Number(info.event.id));
    if (sub === undefined) {
      return;
    }
    setSelectedSub(sub);
    setDetailsModalValues(sub as Subscription);
    setIsDetailsModalOpen(true);
  };

  const onDateClick = (info: { date: Date, dateStr: string }) => {
    setSelectedDate(info.date);
  };

  const events = currSubs.map((sub) => {
    let event = { id: String(sub.id), title: sub.name, start: sub.start, end: sub.end, allDay: true, 
      borderColor: (selectedSub?.id == sub.id ? "white" : "")
    };
    return event;
  });
  
  return (
    <div className="calendar-container">
      <FullCalendar plugins={[ dayGridPlugin, interactionPlugin ]} initialView="dayGridMonth" 
        events={events}
        selectable={false}
        droppable={true}
        editable={true}
        eventDurationEditable={false}
        eventResizableFromStart={false}
        eventClassNames={["event-bar"]}
        now={today}
        eventClick={onEventClick}
        dateClick={onDateClick}
        dayCellClassNames={(arg: { date: Date }) => selectedDate !== null && arg.date.getTime() == selectedDate.getTime() ? "date-selected" : ""}
        height="auto"
        headerToolbar={{ left: "title", right: "today prevYear prev next nextYear" }}
        footerToolbar={{ left: "", right: "today prevYear prev next nextYear" }}
      />
      {
        isDetailsModalOpen &&
        <SubscriptionDetails sub={detailsModalValues} relX={0} relY={5}
          closeModal={() => {
            setSelectedSub(null);
            setIsDetailsModalOpen(false);
          }}
          openEditModal={() => {
            setIsDetailsModalOpen(false);
            setIsEditModalOpen(true);
          }}
          openDeleteDialog={() => {
            setIsDetailsModalOpen(false);
            setIsDeleteDialogOpen(true);
          }}
        />
      }
      {
        isEditModalOpen &&
        <SubscriptionModal initValues={detailsModalValues} serviceOptions={[detailsModalValues?.service ?? ""]} // TODO proper category list
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
