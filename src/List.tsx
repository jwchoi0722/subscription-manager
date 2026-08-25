import "./List.css";

import { Button } from "@/components/ui/button"

import { getSubscriptions, getServices, SubscriptionStatus } from "./data";
import type { Subscription, Service } from "./data";

import { useSubscriptionListStore } from "./store";

const UNCATEGORIZED_TEXT: string = "(Uncategorized)";

// const today: Date = new Date();
// const today: Date = new Date(2026, 0, 2);
const listDateTimeFormat = new Intl.DateTimeFormat("en-US", { month: "short", day: "2-digit", year: "numeric", timeZone: "UTC" });



function List() {
  const subs: Subscription[] = getSubscriptions();
  const services: Service[] = getServices();

  const serviceNames: string[] = Array.from(new Set(subs.map((sub: Subscription) => sub.service)));
  const categoryNames: string[] = Array.from(new Set(subs.filter((sub: Subscription) => sub.category !== undefined).map((sub: Subscription) => sub.category as string)));

  const selectedServices: Set<string> = useSubscriptionListStore((state) => state.selectedServices);
  const setServiceSelectState: (service: string, isSelected: boolean) => void = useSubscriptionListStore((state) => state.setServiceSelectState);
  const setAllServicesUnselected: () => void = useSubscriptionListStore((state) => state.setAllServicesUnselected);
  const selectedCategories: Set<string> = useSubscriptionListStore((state) => state.selectedCategories);
  const setCategorySelectState: (category: string, isSelected: boolean) => void = useSubscriptionListStore((state) => state.setCategorySelectState);
  const setAllCategoriesUnselected: () => void = useSubscriptionListStore((state) => state.setAllCategoriesUnselected);
  const isUncategorizedSelected: boolean = useSubscriptionListStore((state) => state.isUncategorizedSelected);
  const setUncategorizedSelected: (isSelected: boolean) => void = useSubscriptionListStore((state) => state.setUncategorizedSelected);

  let filteredSubs: Subscription[] = subs;
  let selectedServiceDetails: Service[] = [];
  if (selectedServices.size > 0) {
    filteredSubs = subs.filter((sub: Subscription) => selectedServices.has(sub.service));
    selectedServiceDetails = services.filter((service: Service) => selectedServices.has(service.name)); // TODO use ID
  }
  if (selectedCategories.size > 0 || isUncategorizedSelected) {
    filteredSubs = filteredSubs.filter((sub: Subscription) => isUncategorizedSelected && sub.category === undefined || sub.category !== undefined && selectedCategories.has(sub.category as string));
  }
  filteredSubs.sort((a: Subscription, b: Subscription) => b.start.getTime() - a.start.getTime());

  return (
    <>
      <h1>List</h1>
      <div id="service_button_list" className="button-container">
        {serviceNames.map((service: string) => (
          <Button key={service} className={(selectedServices.has(service) ? "selected" : "")} onClick={() => setServiceSelectState(service, !selectedServices.has(service))}>
            {service}
          </Button>
        ))}
        <Button onClick={() => setAllServicesUnselected()}>SHOW ALL</Button>
      </div>
      <div id="category_button_list" className="button-container">
        {categoryNames.map((category: string) => (
          <Button key={category} className={(selectedCategories.has(category) ? "selected" : "")} onClick={() => setCategorySelectState(category, !selectedCategories.has(category))}>
            {category}
          </Button>
        ))}
        <Button className={(isUncategorizedSelected ? "selected" : "")} onClick={() => setUncategorizedSelected(!isUncategorizedSelected)}>{UNCATEGORIZED_TEXT}</Button>
        <Button onClick={() => setAllCategoriesUnselected()}>SHOW ALL</Button>
      </div>

      <div className="list-container">
        {filteredSubs.map((sub: Subscription) => (
          <div key={"sub_" + sub.id} className={`list-subscription-entry ${sub.status === SubscriptionStatus.Subscribed ? "active-sub" : ""} ${sub.status === SubscriptionStatus.Upcoming ? "upcoming-sub": ""}`}>
            <div className="list-subscription-service">{sub.service}</div> 
            <div className="list-subscription-duration">
              {sub.durationLength} {sub.durationUnit.toLowerCase()}{sub.durationLength > 1 ? "s" : ""}
            </div>
            <div className="list-subscription-date">
              {listDateTimeFormat.format(sub.start)} - {listDateTimeFormat.format(sub.end)}
            </div>
            <div className="list-subscription-plan">{sub.servicePlan}</div>
            <div className="list-subscription-price">{sub.priceAmount} {sub.priceCurrency}</div>
            <div className="list-subscription-category">{sub.category ?? ""}</div>
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