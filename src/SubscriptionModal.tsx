// import { create } from 'zustand';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { Button } from "@/components/ui/button"

import type { Subscription } from "./data";
import { TimeUnit, SubscriptionStatus } from "./data";

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
  status: SubscriptionStatus.Upcoming,
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

function SubscriptionModal({ isAdd, initValues, serviceOptions, closeModal, onSubmit }: 
  { 
    isAdd: boolean, 
    initValues: Subscription | null, 
    serviceOptions: string[],
    closeModal: () => void, 
    onSubmit: (subscription: Subscription) => void 
  }) 
{
  let sub: Subscription = initValues ?? blankSub;

  function handleSubmit(formData: FormData): void {
    let id: number = sub.id;
    if (isAdd) {
      id = Math.floor(new Date().getTime() / 10);
    }

    const newSub: Subscription = {
      id: id,
      service: formData.get("serviceName") as string,
      servicePlan: formData.get("servicePlanName") as string,
      name: formData.get("name") as string,
      status: formData.get("status") as SubscriptionStatus,
      start: new Date((formData.get("startDate") + "T00:00:00") as string),
      end: new Date((formData.get("endDate") + "T00:00:00") as string),
      durationLength: Number(formData.get("durationLength")),
      durationUnit: formData.get("durationUnit") as TimeUnit,
      priceAmount: Number(formData.get("amount") as string),
      priceCurrency: "CAD",
      totalAmount: Number(formData.get("totalAmount") as string),
      isAutoRenew: formData.get("isAutoRenew") === "on",
      isChanged: false
    }

    onSubmit(newSub);

    closeModal();
  }

  return (
    <>
      <Dialog open={true}
        onOpenChange={(open) => {
          if (!open) {
            closeModal();
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isAdd ? "Add New Subscription" : "Edit Subscription"}
            </DialogTitle>
          </DialogHeader>
          
          <div id={(isAdd ? "add" : "edit") + "_subscription_modal"} className={(isAdd ? "add" : "edit") + "-subscription-modal"}>
            <form action={handleSubmit} className="add-subscription-form">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="service_name">Service:</FieldLabel>
                  <select id="service_name" name="serviceName" defaultValue={sub.service}>
                    <option value="">Select a Service</option>
                    {serviceOptions.map((service: string) => 
                      <option key={"service_option_" + service} value={service}>{service}</option>
                    )}
                  </select>
                </Field>
                <Field>
                  <FieldLabel htmlFor="service_plan_name">Plan:</FieldLabel>
                  <input type="text" id="service_plan_name" name="servicePlanName" defaultValue={sub.servicePlan} placeholder="Premium" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="sub_name">Name:</FieldLabel>
                  <input type="text" id="sub_name" name="name" defaultValue={sub.name} placeholder="Streamer (Premium)" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="start_date">Start Date:</FieldLabel>
                  <input type="date" id="start_date" name="startDate" defaultValue={sub.start.toISOString().slice(0, 10)} />
                </Field>
                <Field>
                  <FieldLabel htmlFor="end_date">End Date:</FieldLabel>
                  <input type="date" id="end_date" name="endDate" defaultValue={sub.end.toISOString().slice(0, 10)} />
                </Field>
                <Field>
                  <FieldLabel htmlFor="duration_length">Duration:</FieldLabel>
                  <input type="number" id="duration_length" name="durationLength" defaultValue={sub.durationLength} />
                  <select id="duration_unit" name="durationUnit" defaultValue={sub.durationUnit}>
                    {Object.values(TimeUnit).map((unit: string) => (
                      <option key={"timeunit_option_" + unit} value={unit}>{unit.toLowerCase()}</option>
                    ))}
                  </select>
                </Field>
                <Field>
                  <FieldLabel htmlFor="amount">Amount:</FieldLabel>
                  <input type="number" id="amount" name="amount" step="0.01" defaultValue={sub.priceAmount} />
                </Field>
                <Field>
                  <FieldLabel htmlFor="total_amount">Total:</FieldLabel>
                  <input type="number" id="total_amount" name="totalAmount" step="0.01" defaultValue={sub.totalAmount} />
                </Field>
                <Field>
                  <FieldLabel htmlFor="status">Status:</FieldLabel>
                  <select id="status" name="status" defaultValue={sub.status}>
                    {Object.values(SubscriptionStatus).map((status: string) => (
                      <option key={"status_option_" + status} value={status}>{status}</option>
                    ))}
                  </select>
                </Field>
                <Field>
                  <FieldLabel htmlFor="is_auto_renew">Auto-Renew:</FieldLabel>
                  <input type="checkbox" id="is_auto_renew" name="isAutoRenew" defaultChecked={sub.isAutoRenew} />
                </Field>
              </FieldGroup>

              <div className="add-subscription-save-button">
                <Button>
                  Save
                </Button>
              </div>
            </form>
          </div>

        </DialogContent>
      </Dialog>
    </>
  );
}

export default SubscriptionModal;