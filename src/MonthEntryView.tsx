import type { Subscription } from "./data";

import { useSubscriptionModalStore } from './store';

function MonthEntryView({ date, subs, today }: { date: Date, subs: Subscription[], today: Date }) {
  const setAddModalInitialValues: (sub: Subscription | null) => void = useSubscriptionModalStore((state) => state.setAddModalInitialValues);
  const setIsAddModalOpen: (isOpen: boolean) => void = useSubscriptionModalStore((state) => state.setIsAddModalOpen);
  const setEditModalInitialValues: (sub: Subscription | null) => void = useSubscriptionModalStore((state) => state.setEditModalInitialValues);
  const setIsEditModalOpen: (isOpen: boolean) => void = useSubscriptionModalStore((state) => state.setIsEditModalOpen);
  const setDeleteModalInitialValues: (sub: Subscription | null) => void = useSubscriptionModalStore((state) => state.setDeleteModalInitialValues);
  const setIsDeleteDialogOpen: (isOpen: boolean) => void = useSubscriptionModalStore((state) => state.setIsDeleteDialogOpen);
  const setDetailsModalValues: (sub: Subscription | null) => void = useSubscriptionModalStore((state) => state.setDetailsModalValues);
  const setIsDetailsModalOpen: (isOpen: boolean) => void = useSubscriptionModalStore((state) => state.setIsDetailsModalOpen);

  return (
    <div className={"calendar-entry" 
      + (date.getMonth() !== today.getMonth() ? " off-month" : "") 
      + (today.getDate() == date.getDate() && today.getMonth() == date.getMonth() && today.getFullYear() == date.getFullYear() ? " today" : "")}
    >
      <div className="calendar-entry-header">
        <h3>{date.getDate()}</h3>
      </div>
      {subs.map((sub: Subscription) => (
        <div className={"calendar-entry-sub-entry"}>
          <p className="sub-name" onClick={() => {
            setDetailsModalValues(sub);
            setIsDetailsModalOpen(true);
          }}>
            {sub.name}
          </p>
          <span className="calendar-entry-sub-action" onClick={() => {
            setAddModalInitialValues({
              ...sub,
              start: sub.end,
              end: new Date(sub.end.getTime() + (sub.end.getTime() - sub.start.getTime())),
              isChanged: false
            } as Subscription);
            setIsAddModalOpen(true);
          }}>
            +
          </span>
          <span className="calendar-entry-sub-action" onClick={() => {
            setEditModalInitialValues(sub);
            setIsEditModalOpen(true);
          }}>
            *
          </span>
          <span className="calendar-entry-sub-action" onClick={() => {
            setDeleteModalInitialValues(sub);
            setIsDeleteDialogOpen(true);
          }}>
            -
          </span>
        </div>
      ))}
    </div>
  );
}

export default MonthEntryView;