// import { create } from 'zustand';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

import type { Subscription } from "./data";
import { TimeUnit, SubscriptionStatus } from "./data";
import { getCurrDate } from "./dateTimeService";

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

const durationUnitOptions: { label: string, value: string }[] = Object.values(TimeUnit).map((unit: string) => ({ label: unit.toLowerCase(), value: unit }));

function SubscriptionModal({ isAdd, initValues, serviceOptions, closeModal, onSubmit }: 
  { 
    isAdd: boolean, 
    initValues: Subscription | null, 
    serviceOptions: string[],
    closeModal: () => void, 
    onSubmit: (subscription: Subscription) => void 
  }) 
{
  const today: Date = getCurrDate();
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
                  <Select id="service_name" name="serviceName" defaultValue={sub.service}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Select a Service</SelectItem>
                      {serviceOptions.map((service: string) => 
                        <SelectItem key={"service_option_" + service} value={service}>
                          {service}
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel htmlFor="service_plan_name">Plan:</FieldLabel>
                  <Input type="text" id="service_plan_name" name="servicePlanName" defaultValue={sub.servicePlan} placeholder="Premium" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="sub_name">Name:</FieldLabel>
                  <Input type="text" id="sub_name" name="name" defaultValue={sub.name} placeholder="Streamer (Premium)" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="start_date">Start Date:</FieldLabel>
                  <Input type="date" id="start_date" name="startDate" defaultValue={sub.start.toISOString().slice(0, 10)} />
                </Field>
                <Field>
                  <FieldLabel htmlFor="end_date">End Date:</FieldLabel>
                  <Input type="date" id="end_date" name="endDate" defaultValue={sub.end.toISOString().slice(0, 10)} />
                </Field>
                <Field orientation="horizontal">
                  <FieldLabel htmlFor="duration_length">Duration:</FieldLabel>
                  <Input type="number" id="duration_length" name="durationLength" defaultValue={sub.durationLength} />
                  <Select id="duration_unit" name="durationUnit" items={durationUnitOptions} defaultValue={sub.durationUnit}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {durationUnitOptions.map((option) => (
                        <SelectItem key={"timeunit_option_" + option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel htmlFor="amount">Amount:</FieldLabel>
                  <Input type="number" id="amount" name="amount" step="0.01" defaultValue={sub.priceAmount} />
                </Field>
                <Field>
                  <FieldLabel htmlFor="total_amount">Total:</FieldLabel>
                  <Input type="number" id="total_amount" name="totalAmount" step="0.01" defaultValue={sub.totalAmount} />
                </Field>
                <Field orientation="horizontal">
                  <FieldLabel htmlFor="status">Status:</FieldLabel>
                  <Select id="status" name="status" defaultValue={sub.status}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(SubscriptionStatus).map((status: string) => (
                        <SelectItem key={"status_option_" + status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field orientation="horizontal">
                  <FieldLabel htmlFor="is_auto_renew">Auto-Renew:</FieldLabel>
                  <Checkbox id="is_auto_renew" name="isAutoRenew" defaultChecked={sub.isAutoRenew} />
                </Field>
                <Field>
                  <div className="add-subscription-save-button">
                    <Button type="submit">
                      Save
                    </Button>
                  </div>
                  </Field>
              </FieldGroup>
            </form>
          </div>

        </DialogContent>
      </Dialog>
    </>
  );
}

export default SubscriptionModal;