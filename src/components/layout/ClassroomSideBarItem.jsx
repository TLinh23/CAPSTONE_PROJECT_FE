import React, { useState } from "react";
import ClassRoomIcon from "../icons/ClassRoomIcon";
import ArrowLeftIcon from "../icons/ArrowLeftIcon";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import SideBarItem from "./SideBarItem";
import { TUTOR_HREF } from "src/constants/navbarConstant";
import { shortenValue } from "src/libs/shortenAddress";

const LIST_CLASSROOM_ITEM = {
  id: 1,
  name: "List Classroom",
  href: TUTOR_HREF.LIST_CLASSROOMS,
  listActiveRouter: [TUTOR_HREF.LIST_CLASSROOMS],
};

function ClassroomSideBarItem({ listClassroom }) {
  const [open, setOpen] = useState(false);
  const handleOpenSideBar = () => {
    setOpen(!open);
  };
  return (
    <div>
      <div
        className={`pl-2 flex items-center justify-between pr-2 py-3 cursor-pointer menu-item hover:bg-[#2F8DE415] ${
          open
            ? "bg-[#2F8DE415] text-primary icon-active"
            : "bg-transparent text-[#4F4F4F]"
        }
          `}
        onClick={handleOpenSideBar}
      >
        <div className={`flex items-center gap-2`}>
          <ClassRoomIcon />
          <p className="text-sm">Class rooms</p>
        </div>
        <div
          className={`${open ? "-rotate-90" : "rotate-180"} smooth-transform`}
        >
          <ArrowLeftIcon />
        </div>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="flex flex-col gap-1"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={variants}
            transition={{
              duration: 0.2,
            }}
          >
            <>
              <SideBarItem
                key={`first`}
                item={LIST_CLASSROOM_ITEM}
                rolePermission={[]}
              />
              {listClassroom?.items?.map((i, index) => (
                <ClassroomItem key={`sub-menu-${i?.id}-${index}`} item={i} />
              ))}
            </>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ClassroomSideBarItem;

const variants = {
  open: { opacity: 1, height: "auto" },
  collapsed: {
    opacity: 0,
    height: 0,
  },
};

function ClassroomItem({ item }) {
  return (
    <div className="flex items-center gap-2 py-1">
      <Link
        to={`/tutor-classrooms/${item?.classId}`}
        className={`w-[115px] cursor-pointer flex items-center gap-2 py-2 smooth-transform pr-2 bg-transparent text-[#4F4F4F] ml-2 pl-2 hover:bg-[#2F8DE415] border-b border-[#2F8DE475]`}
      >
        <p className="text-sm">{shortenValue(item?.className, 13)}</p>
      </Link>
      <Link
        className="text-sm cursor-pointer flex items-center gap-2 py-2 smooth-transform pr-2 bg-transparent text-[#4F4F4F] hover:bg-[#2F8DE415] border-b border-[#2F8DE475]"
        to={`/assessesments?id=${item?.classId}`}
      >
        Assessments
      </Link>
    </div>
  );
}
