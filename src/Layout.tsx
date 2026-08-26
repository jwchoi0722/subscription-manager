import { Outlet } from "react-router";

import TopNavBar from "./TopNavBar";

function Layout() {
  return (
    <>
      <TopNavBar />
      <Outlet />
    </>
  );
}

export default Layout;
