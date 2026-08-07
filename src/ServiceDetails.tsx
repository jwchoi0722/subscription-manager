import { useState } from 'react';

import { Link, useParams } from 'react-router';

import { getService, getSubscriptionsByService, updateService } from './data.ts'
import type { Service, Subscription } from './data.ts'

import ServiceModal from './ServiceModal.tsx'

// const today: Date = new Date();
const today: Date = new Date(2026, 0, 2);

function ServiceDetails() {
  const { id } = useParams();

  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const listDateTimeFormat = new Intl.DateTimeFormat("en-US", { month: "short", day: "2-digit", year: "numeric", timeZone: "UTC" });

  const serviceResult: Service | undefined = getService(Number(id));
  if (serviceResult === undefined) {
    return (<></>);
  }
  const service: Service = serviceResult;

  let subscriptions: Subscription[] = getSubscriptionsByService(service.name);
  subscriptions.sort((a, b) => b.start.getTime() - a.start.getTime());

  function closeModal(): void {
    setIsEditMode(false);
  }

  function onSubmit(updatedService: Service): void {
    updateService(service.id, updatedService);

    closeModal();
  }

  return (
    <>
      <h1>{service.name}</h1>
      <button onClick={() => setIsEditMode(true)}>EDIT</button>
      { isEditMode && 
        <ServiceModal isEdit={true} initValues={service} closeModal={closeModal} onSubmit={onSubmit} />
      }
      { !isEditMode && 
        <div>
          {service.color &&
            <p style={{ backgroundColor: service.color }}>Color: {service.color}</p>
          }
          {service.homeUrl && 
            <div>
              <label>Website</label>
              <Link to={service.homeUrl}>{service.homeUrl}</Link>
            </div>
          }
          {service.accountUrl && 
            <div>
              <label>Manage Account</label>
              <Link to={service.accountUrl}>{service.accountUrl}</Link>
            </div>
          }
        </div>
      }
      
      <div>
        <h2>Past Subscriptions</h2>
        {subscriptions.length === 0 ? 
          (
            <p>No subscriptions yet.</p>
          ) : 
          subscriptions.map((sub) => (
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
          ))
        }
      </div>
    </>
  );
}

export default ServiceDetails;
