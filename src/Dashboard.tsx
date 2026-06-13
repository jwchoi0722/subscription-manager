import { Link } from 'react-router'

import { PieChart, Pie, Tooltip } from "recharts";

import { getSubscriptions } from "./data";
import type { Subscription } from "./data";

type DaySub = {
  name: string
  amount: number
}

type DayCategory = {
  name: string
  amount: number
}

const UNCATEGORIZED_TEXT: string = "(Uncategorized)";

// const today: Date = new Date();
const today: Date = new Date(2026, 0, 2);

const subs: Subscription[] = getSubscriptions();

function Dashboard() {
  const activeSubs: Subscription[] = subs.filter((sub) => sub.start <= today && today <= sub.end).sort((a, b) => a.end.getTime() - b.end.getTime());
  
  const subsByCategory: Map<string, DaySub[]> = new Map<string, DaySub[]>();
  const sortedPieCategories: DayCategory[] = [];
  const sortedPieSubs: DaySub[] = [];
  let pieTotal: number = 0;
  for (const sub of activeSubs) {
    const daysInSub: number = Math.floor((sub.end.getTime() - sub.start.getTime()) / (1000 * 3600 * 24));
    const amount: number = Math.floor(sub.totalAmount / daysInSub * 100) / 100;
    const subEntry: DaySub = { name: sub.name, amount: amount };

    const categoryName: string = sub.category ?? UNCATEGORIZED_TEXT;
    if (subsByCategory.has(categoryName)) {
      subsByCategory.get(categoryName)?.push(subEntry);
    }
    else {
      subsByCategory.set(categoryName, [ subEntry ]);
    }
    pieTotal += amount;
  }

  const isCategoryPieActive: boolean = subsByCategory.size > 1 || subsByCategory.has(UNCATEGORIZED_TEXT);

  for (const [category, subEntries] of subsByCategory) {
    const categoryAmount: number = subEntries.reduce((sum, entry) => sum + entry.amount, 0);
    sortedPieCategories.push({ name: category, amount: categoryAmount });
    sortedPieSubs.push(...subEntries);
  }

  return (
    <>
      <h1>Dashboard</h1>

      <div id="views_list">
        <Link to="/Calendar">Calendar View</Link>
        <br />
        <Link to="/List">List View</Link>
        <br />
        <Link to="/Chart">Chart View</Link>
        <br />
      </div>

      <h2>Today is: {today.toDateString()}</h2>
      <h3>Active Subscriptions</h3>
      <div>
        {activeSubs.map((sub) => (
          <div key={sub.id}>
            <b>{sub.name}</b> {(sub.isAutoRenew ? "renews" : "ends")} on {sub.end.toDateString()} ({Math.floor((sub.end.getTime() - today.getTime()) / (1000 * 3600 * 24))} day(s) left)
          </div>
        ))}
      </div>

      <h3>Upcoming Subscriptions</h3>

      <h3>Daily spending: ${pieTotal}</h3>
      <PieChart style={{ width: "100%", height: "70vh" }}>
        {isCategoryPieActive && (
          <>
            <Pie data={sortedPieCategories} dataKey="amount" outerRadius="55%" />
            <Pie data={sortedPieSubs} dataKey="amount" label={true} innerRadius="60%" outerRadius="85%" />
          </>
        )}
        {!isCategoryPieActive && (
          <Pie data={sortedPieSubs} dataKey="amount" label={true} />
        )}
        <Tooltip />
      </PieChart>
    </>
  );
}

export default Dashboard;
