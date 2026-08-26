import { useState } from 'react';

import { Link } from 'react-router';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from "@/components/ui/button"

import ServiceModal from './ServiceModal.tsx'

import { addService, getServices, getSubscriptions } from './data.ts'
import type { Service, Subscription } from './data.ts'

// const today: Date = new Date();
const today: Date = new Date(2026, 0, 2);

function Services() {
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  const services: Service[] = getServices();
  
  const subscriptions: Subscription[] = getSubscriptions();
  const activeSet: Set<string> = new Set<string>();
  for (const subscription of subscriptions) {
    if (!activeSet.has(subscription.service) && subscription.start <= today && today <= subscription.end) {
      activeSet.add(subscription.service);
    }
  }

  const activeServices: Service[] = [];
  const inactiveServices: Service[] = [];
  for (const service of services) {
    if (activeSet.has(service.name)) {
      activeServices.push(service);
    }
    else {
      inactiveServices.push(service);
    }
  }

  function onSubmit(service: Service): void {
    addService(service);

    closeModal();
  }

  function closeModal(): void {
    setIsAddModalOpen(false);
  }

  return (
    <div>
      <h1>Services</h1>
      {
        isAddModalOpen && (
          <ServiceModal isEdit={false} onSubmit={onSubmit} closeModal={closeModal} />
        )
      }
      <Button onClick={() => {setIsAddModalOpen(true)}}>
        + Add New
      </Button>
      <div className="py-4">
        <h2>Active Services</h2>
        <div className="grid grid-cols-3 gap-4">
          {activeServices.length === 0 && <p>No active services.</p>}
          {activeServices.map((service) => (
            <Card key={`service_link_${service.id}`}>
              <Link to={`${service.id}`}>
                <CardHeader>
                  <CardTitle>
                    {service.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-6 w-6 mx-auto my-1" style={{ backgroundColor: service.color }}></div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>

      <div className="py-4">
        <h2>Inactive Services</h2>
        <div>
          {inactiveServices.length === 0 && <p>No inactive services.</p>}
          {inactiveServices.map((service) => (
            <Card key={`service_link_${service.id}`}>
              <Link to={`${service.id}`}>{service.name}</Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Services;
