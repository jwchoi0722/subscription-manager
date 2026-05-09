import { getSubscriptions, type Subscription } from "./data";

type MonthSubscription = {
  month: number
  service: string
  amount: number
  percentage: number
}

// const today: Date = new Date();
const today: Date = new Date(2026, 0, 2);

const calendarHeaderDateTimeFormat = new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" });

function Chart() {
  const year: number = today.getFullYear();
  
  const subs: Subscription[] = getSubscriptions();

  const months: MonthSubscription[][] = [];
  const daysInMonths: number[] = [];
  for (let month = 0; month < 12; month++) {
    months.push([]);
    daysInMonths.push(new Date(year, month + 1, 0).getDate());
  }

  for (const sub of subs) {
    if (sub.start.getFullYear() !== year && sub.end.getFullYear() !== year && (sub.start.getFullYear() > year || sub.end.getFullYear() < year)) {
      continue;
    }

    let subDayCount: number = Math.ceil((sub.end.getTime() - sub.start.getTime()) / (1000 * 3600 * 24) + 1);
    let startMonth: number = 0;
    let endMonth: number = 11;
    if (sub.start.getFullYear() == year) {
      startMonth = sub.start.getMonth();
    }
    if (sub.end.getFullYear() == year) {
      endMonth = sub.end.getMonth();
    }

    for (let month: number = startMonth; month <= endMonth; month++) {
      const daysInMonth: number = daysInMonths[month];
      let dayCount: number = daysInMonth;
      if (sub.start.getFullYear() === year && sub.start.getMonth() === month) {
        dayCount = dayCount - sub.start.getDate() + 1;
      }
      if (sub.end.getFullYear() === year && sub.end.getMonth() === month) {
        dayCount = dayCount - (daysInMonth - sub.end.getDate());
      }
      const monthAmount = Math.round(sub.totalAmount * (dayCount / subDayCount) * 100) / 100 // TODO rounding errors
      months[month].push({ month: month, service: sub.service, amount: monthAmount, percentage: 0 });
    }
  }

  for (let month: number = 0; month < months.length; month++) {
    const monthTotal: number = months[month].reduce((total: number, entry: MonthSubscription) => total + entry.amount, 0);
    for (let entry of months[month]) {
      entry.percentage = Math.round(entry.amount * 100 / monthTotal); // TODO rounding errors
    }
  }
  console.log(months);

  return (
    <>
      <h2>Chart</h2>
      {months.map((entries: MonthSubscription[], index: number) => (
        <>
          <h4 key={year + "-" + index}>
            {calendarHeaderDateTimeFormat.format(new Date(year, index, 1))}
          </h4>
          {entries.map((entry: MonthSubscription) => (
            <div key={year + "-" + entry.month + "-" + entry.service}>
              {entry.service} - {entry.amount} ({entry.percentage}%)
            </div>
          ))}
        </>
      ))}
    </>
  );
}

export default Chart;