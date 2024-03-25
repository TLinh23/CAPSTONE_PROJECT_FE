import React from "react";
import Line from "../common/Line";
import SideBarItem from "./SideBarItem";
import { mainMenu } from "src/constants/constants";

function SideBar() {
  return (
    <div className="flex flex-col z-40 w-full md:w-[276px] overflow-y-auto bg-white px-4 py-[6px] md:px-6 md:pt-3 md:pb-10 shadow-lg fixed top-[79px] bottom-0 left-0">
      <div className="flex flex-col">
        {mainMenu.map((i) => (
          <SideBarItem key={`menu-${i?.id}`} item={i} rolePermission={[]} />
        ))}
      </div>
    </div>
  );
}

export default SideBar;
