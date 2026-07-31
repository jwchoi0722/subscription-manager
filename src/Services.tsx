import { Link } from 'react-router';

import { getServices } from './data.ts'
import type { Service } from './data.ts'

function Services() {
  const services: Service[] = getServices();

  return (
    <div>
      <h1>Services</h1>
      <button>
        + Add New
      </button>
      {services.map((service) => (
        <p><Link to={`${service.id}`} key={"entry_" + service.id}>{service?.name}</Link></p>
      ))}
    </div>
  );
}

export default Services;
