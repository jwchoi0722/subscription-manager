import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

import type { Subscription } from "./data";

type DaySub = {
  name: string
  amount: number
}

function CalendarDateDetails({ date, subs, pos = { x: 0, y: 0 }, closeModal }: {
  date: Date,
  subs: Subscription[],
  pos?: { x: number, y: number },
  closeModal: () => void
}) {
  const x: string = (pos.x) + "px";
  const y: string = (pos.y) + "px";

  let daySubs: DaySub[] = [];
  let dayTotal: number = 0;
  
  for (const sub of subs) {
    const daysInSub: number = Math.floor((sub.end.getTime() - sub.start.getTime()) / (1000 * 3600 * 24));
    const amount: number = Math.floor(sub.totalAmount / daysInSub * 100) / 100;
    const subEntry: DaySub = { name: sub.name, amount: amount };

    daySubs.push(subEntry);
    dayTotal += amount;
    // TODO percentage?
  }

  // TODO position className="date-details-modal" style={{ position: "absolute", top: y, left: x }}
  console.log(`(${x},${y}`);

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
            {date.toDateString()}
          </DialogTitle>
        </DialogHeader>
        
        {daySubs.map((sub) => (
          <div key={sub.name}>
            <span>{sub.name}: $ {sub.amount}</span>
          </div>
        ))}

        <h4>Daily Total : </h4>
        <span>$ {dayTotal}</span>
      </DialogContent>
    </Dialog>
  );
}

export default CalendarDateDetails;
