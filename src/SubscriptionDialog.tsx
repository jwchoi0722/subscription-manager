import type { Subscription } from "./data";

function SubscriptionDialog({ subscription, pos = { x: 0, y: 0 }, onSubmit, close }: 
  { 
    subscription: Subscription | null,
    pos?: { x: number, y: number },
    onSubmit: (id: number) => void, 
    close: () => void 
  }) 
{
  if (subscription === null) {
    return null;
  }

  const left: string = (pos.x) + "px";
  const top: string = (pos.y) + "px";

  return (
    <dialog className="subscription-dialog" 
      style={{ position: "absolute", top: top, left: left }} open={true}
    >
      <div className="modal-close-button" onClick={() => close()}>X</div>
      <h3>Delete Subscription</h3>
      <p>Delete {subscription.name} ({subscription.start.toISOString().slice(0, 10)} - {subscription.end.toISOString().slice(0, 10)})?</p>
      <div>
        <button onClick={() => {
          onSubmit(subscription.id);
          close();
        }}>
          Delete
        </button>
      </div>
      <div>
        <button onClick={() => close()}>
          Cancel
        </button>
      </div>
    </dialog>
  );
}

export default SubscriptionDialog;
