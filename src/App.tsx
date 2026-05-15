import { create } from 'zustand';
import MonthView from './MonthView';
import './App.css'

import { addSubscription, updateSubscription, getSubscriptions, type Subscription } from "./data";

interface SubscriptionsState {
  subscriptions: Subscription[]
  add: (subscription: Subscription) => void
  edit: (id: number, subscription: Subscription) => void
}

const useSubscriptionStore = create<SubscriptionsState>()((set) => ({
  subscriptions: getSubscriptions(),
  add: (subscription: Subscription) => set((state: SubscriptionsState) => ({ subscriptions: [...state.subscriptions, subscription] })),
  edit: (id: number, subscription: Subscription) => set((state: SubscriptionsState) => ({ subscriptions: [...state.subscriptions.map((entry) => entry.id === id ? subscription : entry)] }))
}));

function App() {
  const currSubs = useSubscriptionStore((state) => state.subscriptions);
  const addFunc = useSubscriptionStore((state) => state.add);
  const editFunc = useSubscriptionStore((state) => state.edit);

  const onAdd = (subscription: Subscription) => {
    addFunc(subscription);
    addSubscription(subscription);
  };
  const onEdit = (id: number, subscription: Subscription) => {
    editFunc(id, subscription);
    updateSubscription(id, subscription);
  };
  
  return (
    <>
      <MonthView subs={currSubs} onAdd={onAdd} onEdit={onEdit}/>
    </>
  )
}

export default App
