import { create } from 'zustand';
import MonthView from './MonthView';
import './App.css'

import { getSubscriptions, type Subscription } from "./data";

interface SubscriptionsState {
  subscriptions: Subscription[]
  add: (subscription: Subscription) => void
}

const useSubscriptionStore = create<SubscriptionsState>()((set) => ({
  subscriptions: getSubscriptions(),
  add: (subscription: Subscription) => set((state: SubscriptionsState) => ({ subscriptions: [...state.subscriptions, subscription]}))
}));

function App() {
  // const [ currSubs, addFunc ] = useSubscriptionStore((state) => [ state.subscriptions, state.add ]);
  const currSubs = useSubscriptionStore((state) => state.subscriptions);
  const addFunc = useSubscriptionStore((state) => state.add);
  
  return (
    <>
      <MonthView subs={currSubs} onAdd={addFunc} />
    </>
  )
}

export default App
