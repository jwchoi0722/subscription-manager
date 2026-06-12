import { Link } from 'react-router'

import { PieChart, Pie, Tooltip } from "recharts";

import { getSubscriptions } from "./data";
import type { Subscription } from "./data";

type DayEntry = {
  name: string
  amount: number
  percentage: number
}

// const today: Date = new Date();
const today: Date = new Date(2026, 0, 2);

const subs: Subscription[] = getSubscriptions();

function Dashboard() {
  const activeSubs: Subscription[] = subs.filter((sub) => sub.start <= today && today <= sub.end).sort((a, b) => a.end.getTime() - b.end.getTime());
  
  const pieData: DayEntry[] = [];
  let pieTotal: number = 0;
  for (const sub of activeSubs) {
    const daysInSub: number = Math.floor((sub.end.getTime() - sub.start.getTime()) / (1000 * 3600 * 24));
    const amount: number = Math.floor(sub.totalAmount / daysInSub * 100) / 100;
    pieData.push({ name: sub.name, amount: amount, percentage: 0 });
    pieTotal += amount;
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

      <h3>Daily spending: ${pieTotal}</h3>
      <PieChart style={{ width: "100%", height: "70vh" }}>
        <Pie data={pieData} dataKey="amount" label={true} />
        <Tooltip />
      </PieChart>
    </>
  );
}

export default Dashboard;
