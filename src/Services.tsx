import { useState } from 'react';

import { Link } from 'react-router';

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
      <button onClick={() => {setIsAddModalOpen(true)}}>
        + Add New
      </button>
      <h2>Active Services</h2>
      <div>
        {activeServices.length === 0 && <p>No active services.</p>}
        {activeServices.map((service) => (
          <p key={`service_link_${service.id}`}><Link to={`${service.id}`}>{service.name}</Link></p>
        ))}
      </div>
      <h2>Inactive Services</h2>
      <div>
        {inactiveServices.length === 0 && <p>No inactive services.</p>}
        {inactiveServices.map((service) => (
          <p key={`service_link_${service.id}`}><Link to={`${service.id}`}>{service.name}</Link></p>
        ))}
      </div>
    </div>
  );
}

export default Services;
