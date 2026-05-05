import { useParams } from 'react-router'

import "./Service.css";

import type { Subscription } from "./App";

// const today: Date = new Date();
const today: Date = new Date(2026, 0, 2);
const listDateTimeFormat = new Intl.DateTimeFormat("en-US", { month: "short", day: "2-digit", year: "numeric", timeZone: "UTC" });

function getSubscriptionsForService(service: string | undefined): Subscription[] {
  let subscriptions: Subscription[] = [];

  if (service === "netflix") {
    subscriptions = [
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
    ];
  }
  else if (service === "hidive") {
    subscriptions = [
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
  }

  return subscriptions;
}

function Service() {
  const { service } = useParams();

  const subs: Subscription[] = getSubscriptionsForService(service);

  return (
    <>
      <h2>Service {service}</h2>
      <div className="service-container">
        {subs.map((sub: Subscription) => (
          <div className={"service-subscription-entry" + (today <= sub.end && today >= sub.start ? " active" : "")}>
            <div className="service-subscription-time">{listDateTimeFormat.format(sub.start)} - {listDateTimeFormat.format(sub.end)}</div>
            <div className="service-subscription-plan">{sub.servicePlan}</div>
            <div className="service-subscription-price">{sub.priceAmount} {sub.priceCurrency}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Service