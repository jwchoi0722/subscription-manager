import type { Subscription } from "./data";

function SubscriptionDetails({ sub, pos = { x: 0, y: 0 }, closeModal, openEditModal, openDeleteDialog }: 
  {
    sub: Subscription | null,
    pos?: { x: number, y: number }, 
    closeModal: () => void,
    openEditModal: () => void,
    openDeleteDialog: () => void
  }) {
  const x: string = (pos.x) + "px";
  const y: string = (pos.y) + "px";

  return (
    <>
      {
        sub &&
        <dialog id={"sub-details-" + sub.id} className="subscription-details-modal" open={true} style={{ position: "absolute", top: y, left: x, zIndex: 1000 }}>
          <div className="modal-close-button" onClick={() => closeModal()}>X</div>
          <div className="modal-edit-button" onClick={() => openEditModal()}>EDIT</div>
          <div className="modal-delete-button" onClick={() => openDeleteDialog()}>DEL</div>

          <h3>{sub.name}</h3>
          <div>
            <span>Service: </span>
            <span>{sub.service}</span>
          </div>
          <div>
            <span>Plan: </span>
            <span>{sub.servicePlan}</span>
          </div>
          <div>
            <span>Start Date: </span>
            <span>{sub.start.toISOString().slice(0, 10)}</span>
          </div>
          <div>
            <span>End Date: </span>
            <span>{sub.end.toISOString().slice(0, 10)}</span>
          </div>
          <div>
            <span>Auto-renew? </span>
            <span>{sub.isAutoRenew ? "Yes" : "No"}</span>
          </div>
        </dialog>
      }
    </>
  );
}

export default SubscriptionDetails;
