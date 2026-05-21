import type { Subscription } from "./data";

function SubscriptionDetails({ sub, closeModal }: { sub: Subscription | null, closeModal: () => void}) {
  return (
    <>
      {
        sub &&
        <dialog id={"sub-details-" + sub.id} className="subscription-details-modal" open={true}>
          <div className="modal-close-button" onClick={() => closeModal()}>X</div>
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
