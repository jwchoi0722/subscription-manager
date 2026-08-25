import { useState } from 'react';

import { Link, useParams } from 'react-router';
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from "@/components/ui/table"

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
      <Button onClick={() => setIsEditMode(true)}>
        EDIT
      </Button>
      { isEditMode && 
        <ServiceModal isEdit={true} initValues={service} closeModal={closeModal} onSubmit={onSubmit} />
      }
      { !isEditMode && 
        <div className="py-4">
          <h2>Info</h2>
          {service.color &&
            <div className="py-2">
              <span>Color: </span>
              <span className="p-2" style={{ backgroundColor: service.color }}>{service.color}</span>
            </div>
          }
          {service.homeUrl && 
            <div>
              <span>Website: </span>
              <Link className="underline" to={service.homeUrl}>{service.homeUrl}</Link>
            </div>
          }
          {service.accountUrl && 
            <div>
              <span>Manage Account: </span>
              <Link className="underline" to={service.accountUrl}>{service.accountUrl}</Link>
            </div>
          }
        </div>
      }
      
      <div className="py-4">
        <h2>Past Subscriptions</h2>
        {subscriptions.length === 0 ? 
          (
            <p>No subscriptions yet.</p>
          ) : 
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Duration</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead className="text-right">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-left">
              {subscriptions.map((sub) => (
                <TableRow key={sub.id} className={"list-subscription-entry" + (today <= sub.end && today >= sub.start ? " active-sub" : "")}>
                  <TableCell className="list-subscription-duration">
                    {sub.durationLength} {sub.durationUnit.toLowerCase()}{sub.durationLength > 1 ? "s" : ""}
                  </TableCell>
                  <TableCell className="list-subscription-date">
                    {listDateTimeFormat.format(sub.start)} - {listDateTimeFormat.format(sub.end)}
                  </TableCell>
                  <TableCell className="list-subscription-plan">{sub.servicePlan}</TableCell>
                  <TableCell className="list-subscription-price text-right">{sub.priceAmount} {sub.priceCurrency}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        }
      </div>
    </>
  );
}

export default ServiceDetails;
