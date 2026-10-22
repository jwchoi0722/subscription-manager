import { Outlet } from "react-router";

import TopNavBar from "./TopNavBar";
import Footer from "./Footer";

function Layout() {
  return (
    <div className="max-w-6xl text-center m-auto p-2">
      <TopNavBar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
