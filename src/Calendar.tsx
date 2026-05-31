import { create } from 'zustand';
import MonthView from './MonthView';
import './Calendar.css'

import { addSubscription, updateSubscription, deleteSubscription, getSubscriptions, getServices } from "./data";
import type { Subscription, Service } from "./data";

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
  const addFunc = useSubscriptionStore((state) => state.add);
  const editFunc = useSubscriptionStore((state) => state.edit);
  const deleteFunc = useSubscriptionStore((state) => state.delete);

  const onAdd = (subscription: Subscription) => {
    addFunc(subscription);
    addSubscription(subscription);
  };
  const onEdit = (id: number, subscription: Subscription) => {
    editFunc(id, subscription);
    updateSubscription(id, subscription);
  };
  const onDelete = (id: number) => {
    deleteFunc(id);
    deleteSubscription(id);
  }
  
  return (
    <>
      <MonthView subs={currSubs} services={services} onAdd={onAdd} onEdit={onEdit} onDelete={onDelete} />
    </>
  )
}

export default Calendar
