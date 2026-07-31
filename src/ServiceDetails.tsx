import { Link, useParams } from 'react-router';

import { getService, getSubscriptionsByService } from './data.ts'
import type { Service, Subscription } from './data.ts'

// const today: Date = new Date();
const today: Date = new Date(2026, 0, 2);

function ServiceDetails() {
  const { id } = useParams();

  const listDateTimeFormat = new Intl.DateTimeFormat("en-US", { month: "short", day: "2-digit", year: "numeric", timeZone: "UTC" });

  const serviceResult: Service | undefined = getService(Number(id));
  if (serviceResult === undefined) {
    return (<></>);
  }
  const service: Service = serviceResult;

  let subscriptions: Subscription[] = getSubscriptionsByService(service.name);
  subscriptions.sort((a, b) => b.start.getTime() - a.start.getTime());

  return (
    <>
      <h1>{service.name}</h1>
      <div>
        <p style={{ backgroundColor: service.color }}>Color: {service.color}</p>
        {service.homeUrl && <p><Link to={service.homeUrl}>Website</Link></p>}
        {service.accountUrl && <p><Link to={service.accountUrl}>Manage Account</Link></p>}
      </div>
      <div>
        <h2>Past Subscriptions</h2>
        {subscriptions.map((sub) => (
          <div key={sub.id} className={"list-subscription-entry" + (today <= sub.end && today >= sub.start ? " active-sub" : "")}>
            <div className="list-subscription-duration">
              {sub.durationLength} {sub.durationUnit.toLowerCase()}{sub.durationLength > 1 ? "s" : ""}
            </div>
            <div className="list-subscription-date">
              {listDateTimeFormat.format(sub.start)} - {listDateTimeFormat.format(sub.end)}
            </div>
            <div className="list-subscription-plan">{sub.servicePlan}</div>
            <div className="list-subscription-price">{sub.priceAmount} {sub.priceCurrency}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ServiceDetails;
