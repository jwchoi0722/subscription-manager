import { create } from 'zustand';

import type { Subscription } from "./App";

interface SubscriptionModalState {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const useAddSubscriptionModalStore = create<SubscriptionModalState>()((set) => ({
  isOpen: false,
  setIsOpen: (open: boolean) => set(() => ({ isOpen: open}))
}));

const testSub = {
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

function SubscriptionModal({ onSubmit }: { onSubmit: (subscription: Subscription) => void } ) {
  const isModalOpen: boolean = useAddSubscriptionModalStore((state) => state.isOpen);
  const modalOpenFunc: (open: boolean) => void = useAddSubscriptionModalStore((state) => state.setIsOpen);

  return (
    <>
      <button className="add-subscription-modal-button" onClick={() => modalOpenFunc(true)}>
          Add New
      </button>
      <dialog id="add-subscription-modal" className="add-subscription-modal" open={isModalOpen}>
          <div className="modal-close-button" onClick={() => modalOpenFunc(false)}>X</div>
          <h3>Add New Subscription</h3>
          <form className="add-subscription-form">
            <div>
              <label htmlFor="service-name">Service:</label>
              <input type="text" name="service-name" />
              <label htmlFor="service-plan-name">Plan:</label>
              <input type="text" name="service-plan-name" />
            </div>
            <div>
              <label htmlFor="name">Name:</label>
              <input type="text" name="name" />
            </div>
            <div>
              <label htmlFor="start-date">Start Date:</label>
              <input type="date" name="start-date" />
              <label htmlFor="end-date">End Date:</label>
              <input type="date" name="end-date" />
            </div>
            <div>
              <label htmlFor="amount">Amount:</label>
              <input type="number" name="amount" />
              <label htmlFor="total-amount">Total:</label>
              <input type="number" name="total-amount" />
            </div>
            <div>
              <label htmlFor="is-renew">Auto-Renew:</label>
              <input type="checkbox" name="is-renew" />
            </div>
          </form>
          <div className="add-subscription-save-button">
            <button onClick={() => {
              onSubmit(testSub);
              modalOpenFunc(false);
            }}>
              Save
            </button>
          </div>
        </dialog>
      </>
  );
}

export default SubscriptionModal;