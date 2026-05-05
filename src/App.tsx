import { create } from 'zustand';
import MonthView from './MonthView';
import './App.css'

export type Subscription = {
  id: number
  service: string
  servicePlan: string
  name: string
  start: Date
  end: Date
  priceAmount: number
  priceCurrency: string
  totalAmount: number
  isAutoRenew: boolean
  isChanged: boolean
}

interface SubscriptionsState {
  subscriptions: Subscription[]
  add: (subscription: Subscription) => void
}

const useSubscriptionStore = create<SubscriptionsState>()((set) => ({
  subscriptions: [
    {
      id: 1003,
      service: "Netflix",
      servicePlan: "Standard",
      name: "Netflix (Standard)",
      start: new Date("2025-12-04"),
      end: new Date("2026-01-04"),
      priceAmount: 14.93,
      priceCurrency: "CAD",
      totalAmount: 16.72,
      isAutoRenew: true,
      isChanged: false,
    },
    {
      id: 1002,
      service: "Netflix",
      servicePlan: "Standard with ads",
      name: "Netflix (Standard with ads)",
      start: new Date("2025-11-23"),
      end: new Date("2025-12-04"),
      priceAmount: 7.99,
      priceCurrency: "CAD",
      totalAmount: 8.95,
      isAutoRenew: true,
      isChanged: true,
    },
    {
      id: 1001,
      service: "Netflix",
      servicePlan: "Standard with ads",
      name: "Netflix (Standard with ads)",
      start: new Date("2025-10-23"),
      end: new Date("2025-11-23"),
      priceAmount: 7.99,
      priceCurrency: "CAD",
      totalAmount: 8.95,
      isAutoRenew: true,
      isChanged: false,
    },
    {
      id: 2001,
      service: "Disney Plus",
      servicePlan: "Premium",
      name: "Disney+ (Premium)",
      start: new Date("2025-12-02"),
      end: new Date("2026-01-02"),
      priceAmount: 16.99,
      priceCurrency: "CAD",
      totalAmount: 18.98,
      isAutoRenew: false,
      isChanged: false,
    },
    {
      id: 3001,
      service: "Crunchyroll",
      servicePlan: "Fan",
      name: "Crunchyroll (Fan)",
      start: new Date("2025-11-02"),
      end: new Date("2026-11-02"),
      priceAmount: 82.99,
      priceCurrency: "CAD",
      totalAmount: 93.74,
      isAutoRenew: false,
      isChanged: false,
    },
    {
      id: 4001,
      service: "HIDIVE",
      servicePlan: "Free Trial",
      name: "HIDIVE (Free Trial)",
      start: new Date("2026-01-02"),
      end: new Date("2026-01-09"),
      priceAmount: 0.00,
      priceCurrency: "CAD",
      totalAmount: 0.00,
      isAutoRenew: true,
      isChanged: false,
    }
  ],
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
