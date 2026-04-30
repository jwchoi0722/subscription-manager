import { create } from 'zustand';

import type { Subscription } from "./App";

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

const testSub: Subscription = {
  id: 4002,
  service: "HIDIVE",
  servicePlan: "Standard",
  name: "HIDIVE (Standard)",
  start: new Date("2026-01-09"),
  end: new Date("2026-02-09"),
  priceAmount: 8.99,
  priceCurrency: "CAD",
  totalAmount: 10.07,
  isAutoRenew: true,
  isChanged: false,
};

function SubscriptionModal({ initValues, closeModal, onSubmit }: { initValues: Subscription | null, closeModal: () => void, onSubmit: (subscription: Subscription) => void } ) {
  // const isModalOpen: boolean = useAddSubscriptionModalStore((state) => state.isOpen);
  // const modalOpenFunc: (open: boolean) => void = useAddSubscriptionModalStore((state) => state.setIsOpen);

  let sub: Subscription = initValues ?? testSub;

  function handleSubmit(formData: FormData): void {
    const addedSub: Subscription = {
      id: 0,
      service: formData.get("serviceName") as string,
      servicePlan: formData.get("servicePlanName") as string,
      name: formData.get("name") as string,
      start: new Date(formData.get("startDate") as string),
      end: new Date(formData.get("endDate") as string),
      priceAmount: Number(formData.get("amount") as string),
      priceCurrency: "CAD",
      totalAmount: Number(formData.get("totalAmount") as string),
      isAutoRenew: formData.get("isAutoRenew") === "on",
      isChanged: false
    }
    // console.log(addedSub);
    onSubmit(addedSub);

    closeModal();
  }

  return (
    <>
      <dialog id="add-subscription-modal" className="add-subscription-modal" open={true}>
          <div className="modal-close-button" onClick={() => closeModal()}>X</div>
          <h3>Add New Subscription</h3>
          <form action={handleSubmit} className="add-subscription-form">
            <div>
              <label htmlFor="serviceName">Service:</label>
              <input type="text" name="serviceName" defaultValue={sub.service} />
              <label htmlFor="servicePlanName">Plan:</label>
              <input type="text" name="servicePlanName" defaultValue={sub.servicePlan} />
            </div>
            <div>
              <label htmlFor="name">Name:</label>
              <input type="text" name="name" defaultValue={sub.name} />
            </div>
            <div>
              <label htmlFor="startDate">Start Date:</label>
              <input type="date" name="startDate" defaultValue={sub.start.toISOString().slice(0, 10)} />
              <label htmlFor="endDate">End Date:</label>
              <input type="date" name="endDate" defaultValue={sub.end.toISOString().slice(0, 10)} />
            </div>
            <div>
              <label htmlFor="amount">Amount:</label>
              <input type="number" name="amount" step="0.01" defaultValue={sub.priceAmount} />
              <label htmlFor="totalAmount">Total:</label>
              <input type="number" name="totalAmount" step="0.01" defaultValue={sub.totalAmount} />
            </div>
            <div>
              <label htmlFor="isAutoRenew">Auto-Renew:</label>
              <input type="checkbox" name="isAutoRenew" defaultChecked={sub.isAutoRenew} />
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