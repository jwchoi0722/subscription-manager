import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import type { Service } from "./data";

function ServiceModal({ initValues, isEdit, closeModal, onSubmit }: { initValues?: Service, isEdit: boolean, closeModal: () => void, onSubmit: (service: Service) => void }) {
  
  function handleSubmit(formData: FormData): void {
    const service: Service = {
      id: (isEdit && initValues !== undefined ? initValues.id : Math.floor(Date.now() / 10)),
      name: formData.get("serviceName") as string,
      homeUrl: formData.get("serviceHomeUrl") as string,
      accountUrl: formData.get("serviceAccountUrl") as string,
      color: formData.get("serviceColor") as string
    };

    onSubmit(service);
  }

  const title: string = isEdit ? "Edit Service" : "Add New Service";
  const defaultValues: Service = (isEdit && initValues !== undefined) ? 
    initValues 
    : { id: -1, name: "" };

  return (
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
            {title}
          </DialogTitle>
        </DialogHeader>
        
        <form action={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="service_name">Name:</FieldLabel>
              <Input type="text" id="service_name" name="serviceName" defaultValue={defaultValues.name} />
            </Field>
            <Field>
              <FieldLabel htmlFor="service_home_url">Home URL:</FieldLabel>
              <Input type="text" id="service_home_url" name="serviceHomeUrl" defaultValue={defaultValues.homeUrl} />
            </Field>
            <Field>
              <FieldLabel htmlFor="service_account_url">Account URL:</FieldLabel>
              <Input type="text" id="service_account_url" name="serviceAccountUrl" defaultValue={defaultValues.accountUrl} />
            </Field>
            <Field>
              <FieldLabel htmlFor="service_color">Color:</FieldLabel>
              <Input type="text" id="service_color" name="serviceColor" defaultValue={defaultValues.color} />
            </Field>
            <Field>
              <div className="add-service-save-button">
                <Button type="submit">
                  Save
                </Button>
              </div>
            </Field>
          </FieldGroup>
        </form>

      </DialogContent>
    </Dialog>
  );
}

export default ServiceModal;
