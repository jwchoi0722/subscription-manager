import { create } from "zustand";

import "./List.css";

import type { Subscription } from "./App";

const testSubscriptions: Subscription[] = [
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
  },
];

// const today: Date = new Date();
const today: Date = new Date(2026, 0, 2);
const listDateTimeFormat = new Intl.DateTimeFormat("en-US", { month: "short", day: "2-digit", year: "numeric", timeZone: "UTC" });

interface SubscriptionListState {
  serviceSelectStates: { [service: string]: boolean }
  setServiceSelectState: (service: string, isSelected: boolean) => void
  setAllSelectStates: () => void
}

const useSubscriptionListStore = create<SubscriptionListState>()((set) => ({
  serviceSelectStates: {},
  setServiceSelectState: (service: string, isSelected: boolean) => set((state) => ({ serviceSelectStates: { ...state.serviceSelectStates, [service]: isSelected }})),
  setAllSelectStates: () => set(() => ({ serviceSelectStates: {} }))
}));

function List() {
  const subs: Subscription[] = testSubscriptions;

  subs.sort((a: Subscription, b: Subscription) => b.start.getTime() - a.start.getTime());

  const services: string[] = Array.from(new Set(subs.map((sub: Subscription) => sub.service)));

  const serviceSelectStates = useSubscriptionListStore((state) => state.serviceSelectStates);
  const setServiceSelectState: (service: string, isSelected: boolean) => void = useSubscriptionListStore((state) => state.setServiceSelectState);
  const setAllSelectStates: () => void = useSubscriptionListStore((state) => state.setAllSelectStates);

  return (
    <>
      <h2>List</h2>
      <div className="button-container">
        {services.map((service: string) => (
          <button key={service} className={((serviceSelectStates[service] === true) ? "selected" : "")} onClick={() => setServiceSelectState(service, !serviceSelectStates[service])}>
            {service}
          </button>
        ))}
        <button onClick={() => setAllSelectStates()}>SHOW ALL</button>
      </div>
      <div className="list-container">
        {subs.map((sub: Subscription) => (
          <div key={sub.id} className={"list-subscription-entry" + (today <= sub.end && today >= sub.start ? " active-sub" : "")}>
            <div className="list-subscription-service">{sub.service}</div> 
            <div className="list-subscription-time">{listDateTimeFormat.format(sub.start)} - {listDateTimeFormat.format(sub.end)}</div>
            <div className="list-subscription-plan">{sub.servicePlan}</div>
            <div className="list-subscription-price">{sub.priceAmount} {sub.priceCurrency}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default List