import { useState } from 'react';

import { Link } from 'react-router';

import ServiceModal from './ServiceModal.tsx'

import { addService, getServices } from './data.ts'
import type { Service } from './data.ts'

function Services() {
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  const services: Service[] = getServices();

  return (
    <div>
      <h1>Services</h1>
      {
        isAddModalOpen && (
          <ServiceModal onSubmit={addService} closeModal={() => setIsAddModalOpen(false)} />
        )
      }
      <button onClick={() => {setIsAddModalOpen(true)}}>
        + Add New
      </button>
      {services.map((service) => (
        <p key={`service_link_${service.id}`}><Link to={`${service.id}`} key={"entry_" + service.id}>{service?.name}</Link></p>
      ))}
    </div>
  );
}

export default Services;
