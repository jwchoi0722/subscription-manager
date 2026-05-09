import { getSubscriptions, type Subscription } from "./data";

type MonthSubscription = {
  service: string
  amount: number
  percentage: number
}

type ChartMonth = {
  firstDate: Date
  lastDate: Date
  subscriptions: MonthSubscription[]
}

// const today: Date = new Date();
const today: Date = new Date(2026, 0, 2);

const calendarHeaderDateTimeFormat = new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" });

function Chart() {
  const year: number = today.getFullYear();
  
  const subs: Subscription[] = getSubscriptions();

  const months: ChartMonth[] = [];
  for (let jump = 11; jump >= 0; jump--) {
    const month: number = today.getMonth() - jump;
    months.push({
      firstDate: new Date(year, month, 1),
      lastDate: new Date(year, month + 1, 0),
      subscriptions: []
    });
  }
  const startDate: Date = new Date(months[0].firstDate);
  const endDate: Date = new Date(months[months.length - 1].lastDate);

  console.log(startDate.toISOString() + " " + endDate.toISOString());

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
      month.subscriptions.push({ service: sub.service, amount: monthAmount, percentage: 0 });
    }
  }

  for (const month of months) {
    const monthTotal: number = month.subscriptions.reduce((total: number, entry: MonthSubscription) => total + entry.amount, 0);
    for (let entry of month.subscriptions) {
      entry.percentage = Math.round(entry.amount * 100 / monthTotal); // TODO rounding errors
    }
  }
  console.log(months);

  return (
    <>
      <h2>Chart</h2>
      {months.map((month: ChartMonth) => (
        <>
          <h4 key={month.firstDate.getFullYear() + "-" + month.firstDate.getMonth()}>
            {calendarHeaderDateTimeFormat.format(month.firstDate)}
          </h4>
          {month.subscriptions.map((entry: MonthSubscription) => (
            <div key={entry.service}>
              {entry.service} - {entry.amount} ({entry.percentage}%)
            </div>
          ))}
        </>
      ))}
    </>
  );
}

export default Chart;