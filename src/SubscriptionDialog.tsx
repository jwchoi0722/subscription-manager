import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

import type { Subscription } from "./data";

function SubscriptionDialog({ subscription, onSubmit, close }: 
  { 
    subscription: Subscription | null,
    onSubmit: (id: number) => void, 
    close: () => void 
  }) 
{
  if (subscription === null) {
    return null;
  }

  return (
    <Dialog open={true}
      onOpenChange={(open) => {
        if (!open) {
          close();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Delete Subscription
          </DialogTitle>
          <DialogDescription>
            Delete {subscription.name} ({subscription.start.toISOString().slice(0, 10)} - {subscription.end.toISOString().slice(0, 10)})?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button onClick={() => {
            onSubmit(subscription.id);
            close();
          }}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    
    
  );
}

export default SubscriptionDialog;
