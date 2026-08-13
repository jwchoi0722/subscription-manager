import { Outlet } from "react-router";

import Navigation from "./Navigation";

import "./Layout.css";

function Layout() {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}

export default Layout;
