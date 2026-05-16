import { create } from 'zustand';
import MonthView from './MonthView';
import './App.css'

import { addSubscription, updateSubscription, deleteSubscription, getSubscriptions, type Subscription } from "./data";

interface SubscriptionsState {
  subscriptions: Subscription[]
  add: (subscription: Subscription) => void
  edit: (id: number, subscription: Subscription) => void
  delete: (id: number) => void
}

const useSubscriptionStore = create<SubscriptionsState>()((set) => ({
  subscriptions: getSubscriptions(),
  add: (subscription: Subscription) => set((state: SubscriptionsState) => ({ subscriptions: [...state.subscriptions, subscription] })),
  edit: (id: number, subscription: Subscription) => set((state: SubscriptionsState) => ({ subscriptions: [...state.subscriptions.map((entry) => entry.id === id ? subscription : entry)] })),
  delete: (id: number) => set((state: SubscriptionsState) => ({ subscriptions: [...state.subscriptions.filter((entry) => entry.id !== id )] }))
}));

function App() {
  const currSubs = useSubscriptionStore((state) => state.subscriptions);
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
      <MonthView subs={currSubs} onAdd={onAdd} onEdit={onEdit} onDelete={onDelete} />
    </>
  )
}

export default App
