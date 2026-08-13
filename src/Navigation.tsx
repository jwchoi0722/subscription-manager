import { Link } from "react-router";

function Navigation() {
  return (
    <div id="views_list" className="link-list">
      <Link to="/Dashboard" className="link-item">Dashboard</Link>
      <Link to="/Calendar" className="link-item">Calendar View</Link>
      <Link to="/List" className="link-item">List View</Link>
      <Link to="/Chart" className="link-item">Chart View</Link>
      <Link to="/Services" className="link-item">Manage Services</Link>
    </div>
  );
}

export default Navigation;
