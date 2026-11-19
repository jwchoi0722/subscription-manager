import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell, TableFooter } from "@/components/ui/table"

import type { Subscription } from "./data";

type DaySub = {
  name: string
  service: string
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
    const subEntry: DaySub = { name: sub.name, service: sub.service, amount: amount };

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

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Service</TableHead>
              <TableHead className="text-right">Daily Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {daySubs.map((sub) => (
              <TableRow key={sub.name}>
                <TableCell>{sub.name}</TableCell>
                <TableCell>{sub.service}</TableCell>
                <TableCell className="text-right">${sub.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow key="total">
              <TableCell colSpan={2} className="font-bold">Daily Total</TableCell>
              <TableCell className="text-right">${dayTotal}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>

      </DialogContent>
    </Dialog>
  );
}

export default CalendarDateDetails;
