import type { Service } from "./data";

function ServiceModal({ closeModal, onSubmit }: { closeModal: () => void, onSubmit: (service: Service) => void }) {
  function handleSubmit(formData: FormData): void {
    const service: Service = {
      id: Math.floor(Date.now() / 10),
      name: formData.get("serviceName") as string,
      homeUrl: formData.get("serviceHomeUrl") as string,
      color: formData.get("serviceColor") as string
    };

    onSubmit(service);

    closeModal();
  }

  return (
    <>
      <dialog id="add_service_modal" open>
        <div className="modal-close-button" onClick={() => closeModal()}>X</div>
        <h3>Add New Service</h3>
        <form action={handleSubmit}>
          <label htmlFor="service_name">Name:</label>
          <input type="text" id="service_name" name="serviceName" />
          <label htmlFor="service_home_url">Home URL:</label>
          <input type="text" id="service_home_url" name="serviceHomeUrl" />
          <label htmlFor="service_account_url">Account URL:</label>
          <input type="text" id="service_account_url" name="serviceAccountUrl" />
          <label htmlFor="service_color">Color:</label>
          <input type="text" id="service_color" name="serviceColor" />
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
