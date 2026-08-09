import { TimeUnit, SubscriptionStatus, type Subscription } from "./data";

function SubscriptionDetails({ sub, pos = { x: 0, y: 0 }, closeModal, openEditModal, openDeleteDialog, openAddModal }: 
  {
    sub: Subscription | null,
    pos?: { x: number, y: number }, 
    closeModal: () => void,
    openEditModal: () => void,
    openDeleteDialog: () => void,
    openAddModal: (initValues: Subscription) => void
  }) {
  const x: string = (pos.x) + "px";
  const y: string = (pos.y) + "px";
  const durationText: string = sub ? `${sub.durationLength} ${sub.durationUnit.toLowerCase()}${sub.durationLength > 1 ? "s" : ""}` : "";
  
  // TODO pause/skip a month - with renewal date property

  function onRenewClick(): void {
    if (!!!sub) {
      return;
    }

    let renewedSub: Subscription = { ...sub };
    renewedSub.start = new Date(sub.end);
    let renewedEnd: Date = new Date(sub.end);
    switch (sub.durationUnit) {
      case TimeUnit.Day:
        renewedEnd.setDate(renewedEnd.getDate() + sub.durationLength);
        break;
      case TimeUnit.Week:
        renewedEnd.setDate(renewedEnd.getDate() + (sub.durationLength * 7));
        break;
      case TimeUnit.Month:
        renewedEnd.setMonth(renewedEnd.getMonth() + sub.durationLength);
        break;
      case TimeUnit.Year:
        renewedEnd.setFullYear(renewedEnd.getFullYear() + sub.durationLength);
        break;
      default:
        break;
    }
    renewedSub.end = renewedEnd;
    renewedSub.status = SubscriptionStatus.Pending;

    openAddModal(renewedSub);
  }

  return (
    <>
      {
        sub &&
        <dialog id={"sub-details-" + sub.id} className="subscription-details-modal" open={true} style={{ position: "absolute", top: y, left: x }}>
          <div className="modal-close-button" onClick={() => closeModal()}>X</div>
          <div className="modal-edit-button" onClick={() => openEditModal()}>EDIT</div>
          <div className="modal-delete-button" onClick={() => openDeleteDialog()}>DEL</div>
          <div id="sub_details_renew_button" onClick={() => onRenewClick()}>RENEW</div>

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
            <span>Plan Duration: </span>
            <span>{durationText}</span>
          </div>
          <div>
            <span>Status: </span>
            <span>{sub.status}</span>
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
