import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell, TableFooter } from "@/components/ui/table"

import type { Subscription } from "./data";

type DaySub = {
  name: string
  service: string
  amount: number
}

function CalendarDateDetails({ date, subs, closeModal }: {
  date: Date,
  subs: Subscription[],
  closeModal: () => void
}) {
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

  return (
    <Sheet open={true}
      onOpenChange={(open) => {
        if (!open) {
          closeModal();
        }
      }}
      modal={false}
      disablePointerDismissal={true}
    >
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>
            {date.toDateString()}
          </SheetTitle>
        </SheetHeader>

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

      </SheetContent>
    </Sheet>
  );
}

export default CalendarDateDetails;
