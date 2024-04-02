import React from "react";
import Line from "../common/Line";
import SideBarItem from "./SideBarItem";
import {
  PARENT_MENU,
  ROLE_NAME,
  STAFF_MENU,
  TUTOR_MENU,
  mainMenu,
} from "src/constants/constants";
import { motion } from "framer-motion";
import { useSideBarContext } from "src/context/SideBarContext";
import { useAuthContext } from "src/context/AuthContext";

function SideBar() {
  const variants = {
    open: {
      width: 276,
    },
    closed: {
      width: 0,
    },
  };
  const { isOpenSideBar } = useSideBarContext();
  const { roleKey } = useAuthContext();
  return (
    <motion.div
      animate={isOpenSideBar ? "open" : "closed"}
      variants={variants}
      className="!hidden md:!block"
    >
      <div className="flex flex-col z-40 w-full md:w-[276px] overflow-y-auto bg-white px-4 py-[6px] md:px-6 md:pt-3 md:pb-10 shadow-lg fixed top-[79px] bottom-0 left-0">
        <div className="flex flex-col">
          {roleKey === ROLE_NAME.TUTOR && (
            <>
              {mainMenu.map((i) => (
                <SideBarItem
                  key={`menu-${i?.id}`}
                  item={i}
                  rolePermission={[]}
                />
              ))}
              {TUTOR_MENU.map((i) => (
                <SideBarItem
                  key={`tutor-menu-${i?.id}`}
                  item={i}
                  rolePermission={[]}
                />
              ))}
            </>
          )}
          {roleKey === ROLE_NAME.PARENT && (
            <>
              {PARENT_MENU.map((i) => (
                <SideBarItem
                  key={`tutor-menu-${i?.id}`}
                  item={i}
                  rolePermission={[]}
                />
              ))}
            </>
          )}
          {roleKey === ROLE_NAME.STAFF && (
            <>
              {mainMenu.map((i) => (
                <SideBarItem
                  key={`menu-${i?.id}`}
                  item={i}
                  rolePermission={[]}
                />
              ))}
              {STAFF_MENU.map((i) => (
                <SideBarItem
                  key={`tutor-menu-${i?.id}`}
                  item={i}
                  rolePermission={[]}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default SideBar;
