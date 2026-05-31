import { Link } from 'react-router'

function Dashboard() {
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
    </>
  );
}

export default Dashboard;
