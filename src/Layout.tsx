import { Outlet } from "react-router";

import TopNavBar from "./TopNavBar";
import Footer from "./Footer";

function Layout() {
  return (
    <>
      <TopNavBar />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
