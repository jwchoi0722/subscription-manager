import { Link } from 'react-router'

import { getSubscriptions } from "./data";
import type { Subscription } from "./data";

// const today: Date = new Date();
const today: Date = new Date(2026, 0, 2);

const subs: Subscription[] = getSubscriptions();

function Dashboard() {
  const activeSubs: Subscription[] = subs.filter((sub) => sub.start <= today && today <= sub.end).sort((a, b) => a.end.getTime() - b.end.getTime());

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

      <h2>Active Subscriptions</h2>
      <h4>Today is: {today.toDateString()}</h4>
      <div>
        {activeSubs.map((sub) => (
          <div key={sub.id}>
            <b>{sub.name}</b> {(sub.isAutoRenew ? "renews" : "ends")} on {sub.end.toDateString()} ({Math.floor((sub.end.getTime() - today.getTime()) / (1000 * 3600 * 24))} day(s) left)
          </div>
        ))}
      </div>
    </>
  );
}

export default Dashboard;
