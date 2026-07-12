// import { create } from 'zustand';

import type { Subscription } from "./data";
import { TimeUnit } from "./data";

// interface SubscriptionModalState {
//   isOpen: boolean
//   setIsOpen: (open: boolean) => void
// }

// interface SubscriptionFormState {
//   serviceName: string,
//   servicePlanName: string,
//   name: string,
//   startDate: string,

// }

// const useAddSubscriptionModalStore = create<SubscriptionModalState>()((set) => ({
//   isOpen: false,
//   setIsOpen: (open: boolean) => set(() => ({ isOpen: open}))
// }));

// const today: Date = new Date();
const today: Date = new Date(2026, 0, 2);

const blankSub: Subscription = {
  id: 0,
  service: "",
  servicePlan: "",
  name: "",
  start: today,
  end: new Date(today.getFullYear(), today.getMonth() + 1, today.getDate()),
  durationLength: 1,
  durationUnit: TimeUnit.Month,
  priceAmount: 0,
  priceCurrency: "CAD",
  totalAmount: 0,
  isAutoRenew: true,
  isChanged: false,
};

function SubscriptionModal({ isAdd, initValues, serviceOptions, pos = { x: 0, y: 0 }, closeModal, onSubmit }: 
  { 
    isAdd: boolean, 
    initValues: Subscription | null, 
    serviceOptions: string[],
    pos?: { x: number, y: number },
    closeModal: () => void, 
    onSubmit: (subscription: Subscription) => void 
  }) 
{
  let sub: Subscription = initValues ?? blankSub;

  const left: string = (pos.x) + "px";
  const top: string = (pos.y) + "px";

  function handleSubmit(formData: FormData): void {
    let id: number = sub.id;
    if (isAdd) {
      id = Math.floor(new Date().getTime() / 10);
    }

    const addedSub: Subscription = {
      id: id,
      service: formData.get("serviceName") as string,
      servicePlan: formData.get("servicePlanName") as string,
      name: formData.get("name") as string,
      start: new Date(formData.get("startDate") as string),
      end: new Date(formData.get("endDate") as string),
      durationLength: Number(formData.get("durationLength")),
      durationUnit: formData.get("durationUnit") as TimeUnit,
      priceAmount: Number(formData.get("amount") as string),
      priceCurrency: "CAD",
      totalAmount: Number(formData.get("totalAmount") as string),
      isAutoRenew: formData.get("isAutoRenew") === "on",
      isChanged: false
    }

    onSubmit(addedSub);

    closeModal();
  }

  return (
    <>
      <dialog id={(isAdd ? "add" : "edit") + "_subscription_modal"} className={(isAdd ? "add" : "edit") + "-subscription-modal"} 
        style={{ position: "absolute", top: top, left: left }} open={true}
      >
        <div className="modal-close-button" onClick={() => closeModal()}>X</div>
        <h3>{isAdd ? "Add New Subscription" : "Edit Subscription"}</h3>
        <form action={handleSubmit} className="add-subscription-form">
          <div>
            <label htmlFor="service_name">Service:</label>
            <select id="service_name" name="serviceName" defaultValue={sub.service}>
              <option value="">Select a Service</option>
              {serviceOptions.map((service: string) => 
                <option key={"service_option_" + service} value={service}>{service}</option>
              )}
            </select>
            <label htmlFor="service_plan_name">Plan:</label>
            <input type="text" id="service_plan_name" name="servicePlanName" defaultValue={sub.servicePlan} placeholder="Premium" />
          </div>
          <div>
            <label htmlFor="sub_name">Name:</label>
            <input type="text" id="sub_name" name="name" defaultValue={sub.name} placeholder="Streamer (Premium)" />
          </div>
          <div>
            <label htmlFor="start_date">Start Date:</label>
            <input type="date" id="start_date" name="startDate" defaultValue={sub.start.toISOString().slice(0, 10)} />
            <label htmlFor="end_date">End Date:</label>
            <input type="date" id="end_date" name="endDate" defaultValue={sub.end.toISOString().slice(0, 10)} />
          </div>
          <div>
            <label htmlFor="duration_length">Duration:</label>
            <input type="number" id="duration_length" name="durationLength" defaultValue={sub.durationLength} />
            <select id="duration_unit" name="durationUnit" defaultValue={sub.durationUnit}>
              {Object.values(TimeUnit).map((unit: string) => (
                <option key={"timeunit_option_" + unit} value={unit}>{unit.toLowerCase()}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="amount">Amount:</label>
            <input type="number" id="amount" name="amount" step="0.01" defaultValue={sub.priceAmount} />
            <label htmlFor="total_amount">Total:</label>
            <input type="number" id="total_amount" name="totalAmount" step="0.01" defaultValue={sub.totalAmount} />
          </div>
          <div>
            <label htmlFor="is_auto_renew">Auto-Renew:</label>
            <input type="checkbox" id="is_auto_renew" name="isAutoRenew" defaultChecked={sub.isAutoRenew} />
          </div>
          <div className="add-subscription-save-button">
            <button>
              Save
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}

export default SubscriptionModal;