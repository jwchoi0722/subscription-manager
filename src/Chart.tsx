import { useState } from "react";

import { getSubscriptions, type Subscription } from "./data";

type MonthSubscription = {
  service: string
  amount: number
  percentage: number
}

type ChartMonth = {
  firstDate: Date
  lastDate: Date
  subscriptions: Map<string, MonthSubscription>
  totalAmount: number
}

// const today: Date = new Date();
const today: Date = new Date(2026, 0, 2);

const calendarHeaderDateTimeFormat = new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" });

function Chart() {
  const monthCountInRange: number = 12;

  const [{ startDate, endDate }, setStartAndEndDates] = useState<{ startDate: Date, endDate: Date }>({
    startDate: new Date(today.getFullYear(), today.getMonth() - monthCountInRange + 1, 1),
    endDate: new Date(today.getFullYear(), today.getMonth() + 1, 0)
  });

  console.log(startDate.toISOString() + " " + endDate.toISOString());

  const months: ChartMonth[] = [];
  for (let monthIndex = 0; monthIndex < monthCountInRange; monthIndex++) {
    const month: number = startDate.getMonth() + monthIndex;
    months.push({
      firstDate: new Date(startDate.getFullYear(), month, 1),
      lastDate: new Date(startDate.getFullYear(), month + 1, 0),
      subscriptions: new Map<string, MonthSubscription>(),
      totalAmount: 0
    });
  }

  const subs: Subscription[] = getSubscriptions();

  for (const sub of subs) {
    if (sub.start > endDate || sub.end < startDate) {
      continue;
    }

    let subDayCount: number = Math.ceil((sub.end.getTime() - sub.start.getTime()) / (1000 * 3600 * 24) + 1);

    for (const month of months) {
      if (sub.start > month.lastDate || sub.end < month.firstDate) {
        continue;
      }
      let monthDayCount: number = month.lastDate.getDate();
      if (sub.start > month.firstDate) {
        monthDayCount = monthDayCount - sub.start.getDate() + 1;
      }
      if (sub.end < month.lastDate) {
        monthDayCount = monthDayCount - (month.lastDate.getDate() - sub.end.getDate());
      }
      
      const monthAmount = Math.round(sub.totalAmount * (monthDayCount / subDayCount) * 100) / 100 // TODO rounding errors
        + (month.subscriptions.get(sub.service)?.amount ?? 0);
      month.subscriptions.set(sub.service, { service: sub.service, amount: monthAmount, percentage: 0 });
      month.totalAmount += monthAmount;
    }
  }

  for (const month of months) {
    for (const entry of month.subscriptions.values()) {
      entry.percentage = Math.round(entry.amount * 100 / month.totalAmount); // TODO rounding errors
    }
  }
  
  function setDateRange(yearChange: number, monthChange: number): void {
    setStartAndEndDates({
      startDate: new Date(startDate.getFullYear() + yearChange, startDate.getMonth() + monthChange),
      endDate: new Date(endDate.getFullYear() + yearChange, endDate.getMonth() + monthChange) 
    });
  }

  return (
    <>
      <h2>Chart</h2>
      <div className="control-container">
        <button onClick={() => setDateRange(-1, 0)}>
          &lt;&lt;
        </button>
        <button onClick={() => setDateRange(0, -1)}>
          &lt;
        </button>
        <button onClick={() => setDateRange(0, 1)}>
          &gt;
        </button>
        <button onClick={() => setDateRange(1, 0)}>
          &gt;&gt;
        </button>
      </div>
      {months.map((month: ChartMonth) => (
        <>
          <h4 key={month.firstDate.getFullYear() + "-" + month.firstDate.getMonth()}>
            {calendarHeaderDateTimeFormat.format(month.firstDate)}
          </h4>
          {Array.from(month.subscriptions.entries()).map(([ service, entry ]) => (
            <div key={month.firstDate.getFullYear() + "-" + month.firstDate.getMonth() + "-" + service}>
              {entry.service} - {entry.amount} ({entry.percentage}%)
            </div>
          ))}
          <div>TOTAL: ${month.totalAmount}</div>
        </>
      ))}
    </>
  );
}

export default Chart;