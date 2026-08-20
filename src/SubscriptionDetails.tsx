import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

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
    renewedSub.status = SubscriptionStatus.Upcoming;

    openAddModal(renewedSub);
  }

  return (
    sub &&
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
            {sub.name}
          </DialogTitle>
        </DialogHeader>
        <div id={"sub-details-" + sub.id} >
          <div className="py-2">
            <Button className="modal-edit-button" onClick={() => openEditModal()}>EDIT</Button>
            <Button className="modal-delete-button" onClick={() => openDeleteDialog()}>DEL</Button>
            <Button id="sub_details_renew_button" onClick={() => onRenewClick()}>RENEW</Button>
          </div>
          
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
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SubscriptionDetails;
