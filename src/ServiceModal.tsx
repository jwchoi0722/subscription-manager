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
    <>
      <dialog id="add_service_modal" open>
        <div className="modal-close-button" onClick={() => closeModal()}>X</div>
        <h3>{title}</h3>
        <form action={handleSubmit}>
          <label htmlFor="service_name">Name:</label>
          <input type="text" id="service_name" name="serviceName" defaultValue={defaultValues.name} />
          <label htmlFor="service_home_url">Home URL:</label>
          <input type="text" id="service_home_url" name="serviceHomeUrl" defaultValue={defaultValues.homeUrl} />
          <label htmlFor="service_account_url">Account URL:</label>
          <input type="text" id="service_account_url" name="serviceAccountUrl" defaultValue={defaultValues.accountUrl} />
          <label htmlFor="service_color">Color:</label>
          <input type="text" id="service_color" name="serviceColor" defaultValue={defaultValues.color} />
          <div className="add-service-save-button">
            <button>
              Save
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}

export default ServiceModal;
