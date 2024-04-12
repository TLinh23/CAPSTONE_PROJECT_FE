import React, { useState } from "react";
import SideBarItem from "./SideBarItem";
import {
  ADMIN_MENU,
  PARENT_MENU,
  ROLE_NAME,
  STAFF_MENU,
  TUTOR_MENU,
} from "src/constants/constants";
import { motion } from "framer-motion";
import { useSideBarContext } from "src/context/SideBarContext";
import { useAuthContext } from "src/context/AuthContext";
import { useQueries } from "react-query";
import ClassroomSideBarItem from "./ClassroomSideBarItem";
import { getClassByTutor } from "src/apis/class-module";

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
  const { roleKey, userId } = useAuthContext();
  const [listClassroom, setListClassroom] = useState();

  useQueries([
    {
      queryKey: ["getListClass"],
      queryFn: async () => {
        if (roleKey === ROLE_NAME.TUTOR) {
          const queryObj = {};
          queryObj["PagingRequest.CurrentPage"] = 1;
          queryObj["PagingRequest.PageSize"] = 5;
          queryObj["TutorId"] = userId;
          // change your api request
          const response = await getClassByTutor(queryObj);
          setListClassroom(response?.data?.data);
          return response?.data;
        }
      },
      enabled: !!userId,
    },
  ]);

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
              <ClassroomSideBarItem listClassroom={listClassroom} />
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
              {STAFF_MENU.map((i) => (
                <SideBarItem
                  key={`staff-menu-${i?.id}`}
                  item={i}
                  rolePermission={[]}
                />
              ))}
            </>
          )}
          {roleKey === ROLE_NAME.ADMIN && (
            <>
              {ADMIN_MENU.map((i) => (
                <SideBarItem
                  key={`admin-menu-${i?.id}`}
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
