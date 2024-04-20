import React from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import { useLocation } from "react-router-dom";
import Footer from "./Footer";
import { useSideBarContext } from "src/context/SideBarContext";
import { useAuthContext } from "src/context/AuthContext";

/**
 * isSideBar: boolean, active when in router in side, check by router or something
 */

function Layout(props) {
  const location = useLocation();
  const { isOpenSideBar } = useSideBarContext();
  const { roleKey } = useAuthContext();
  return (
    <div>
      <Header />
      <div className="flex w-full">
        {isOpenSideBar && roleKey && <SideBar />}
        <div
          className={`w-full p-5 bg-background ${
            isOpenSideBar && roleKey && "md:pl-[66px]"
          }`}
        >
          {props.children}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
