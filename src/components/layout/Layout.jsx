import React from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import { useLocation } from "react-router-dom";
import Footer from "./Footer";

/**
 * isSideBar: boolean, active when in router in side, check by router or something
 */

function Layout(props) {
  const location = useLocation();
  const isSideBar = location.pathname !== "/";
  return (
    <div>
      <Header />
      <div className="flex w-full">
        {isSideBar && <SideBar />}
        <div
          className={`w-full p-5 bg-background ${isSideBar && "md:pl-[296px]"}`}
        >
          {props.children}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
