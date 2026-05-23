import { create } from "zustand";

import "./List.css";

import { getSubscriptions, getServices, type Subscription, type Service } from "./data";

// const today: Date = new Date();
const today: Date = new Date(2026, 0, 2);
const listDateTimeFormat = new Intl.DateTimeFormat("en-US", { month: "short", day: "2-digit", year: "numeric", timeZone: "UTC" });

interface SubscriptionListState {
  selectedServices: Set<string>
  setServiceSelectState: (service: string, isSelected: boolean) => void
  setAllServicesUnselected: () => void
}

const useSubscriptionListStore = create<SubscriptionListState>()((set) => ({
  selectedServices: new Set(),
  setServiceSelectState: (service: string, isSelected: boolean) => set((state) => {
    const newSet: Set<string> = new Set(state.selectedServices);
    if (isSelected) {
      newSet.add(service);
    }
    else {
      newSet.delete(service);
    }
    return { selectedServices: newSet };
  }),
  setAllServicesUnselected: () => set(() => ({ selectedServices: new Set() }))
}));

function List() {
  const subs: Subscription[] = getSubscriptions();
  const services: Service[] = getServices();

  const serviceNames: string[] = Array.from(new Set(subs.map((sub: Subscription) => sub.service)));

  const selectedServices: Set<string> = useSubscriptionListStore((state) => state.selectedServices);
  const setServiceSelectState: (service: string, isSelected: boolean) => void = useSubscriptionListStore((state) => state.setServiceSelectState);
  const setAllServicesUnselected: () => void = useSubscriptionListStore((state) => state.setAllServicesUnselected);

  let filteredSubs: Subscription[] = subs;
  let selectedServiceDetails: Service[] = [];
  if (selectedServices.size > 0) {
    filteredSubs = subs.filter((sub: Subscription) => selectedServices.has(sub.service));
    selectedServiceDetails = services.filter((service: Service) => selectedServices.has(service.name)); // TODO use ID
  }

  filteredSubs.sort((a: Subscription, b: Subscription) => b.start.getTime() - a.start.getTime());

  return (
    <>
      <h2>List</h2>
      <div className="button-container">
        {serviceNames.map((service: string) => (
          <button key={service} className={(selectedServices.has(service) ? "selected" : "")} onClick={() => setServiceSelectState(service, !selectedServices.has(service))}>
            {service}
          </button>
        ))}
        <button onClick={() => setAllServicesUnselected()}>SHOW ALL</button>
      </div>
      <div className="list-container">
        {filteredSubs.map((sub: Subscription) => (
          <div key={"sub_" + sub.id} className={"list-subscription-entry" + (today <= sub.end && today >= sub.start ? " active-sub" : "")}>
            <div className="list-subscription-service">{sub.service}</div> 
            <div className="list-subscription-time">{listDateTimeFormat.format(sub.start)} - {listDateTimeFormat.format(sub.end)}</div>
            <div className="list-subscription-plan">{sub.servicePlan}</div>
            <div className="list-subscription-price">{sub.priceAmount} {sub.priceCurrency}</div>
          </div>
        ))}
      </div>
      <div className="services-container">
        {selectedServiceDetails.map((service: Service) => (
          <div key={"service_" + service.id}>
            <h4>{service.name}</h4>
            <div>
              <a href={service.homeUrl}>Website</a>
            </div>
            <div>
              <a href={service.accountUrl}>Manage</a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default List