import type { Subscription } from "./data";

type DaySub = {
  name: string
  amount: number
}

function CalendarDateDetails({ subs, pos = { x: 0, y: 0 }, closeModal }: {
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

  return (
    <dialog className="date-details-modal" style={{ position: "absolute", top: y, left: x }} open={true}>
      <div className="modal-close-button" onClick={() => closeModal()}>X</div>
      {daySubs.map((sub) => (
        <div key={sub.name}>
          <h4>{sub.name}</h4>
          <span>$ {sub.amount}</span>
        </div>
      ))}
      <h3>Daily Total : </h3>
      <span>$ {dayTotal}</span>
    </dialog>
  );
}

export default CalendarDateDetails;
