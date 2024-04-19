import React, { useState } from "react";
import ArrowRightIcon from "../icons/ArrowRightIcon";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

function SideBarItem({ item, rolePermission }) {
  const navigate = useNavigate();
  const location = useLocation();
  const test = item?.listActiveRouter?.some((path) =>
    location.pathname.includes(path)
  );
  const [open, setOpen] = useState(test || false);

  const handleClickChildrenItem = (e) => {
    e.stopPropagation();
    setOpen(!open);
    if (item?.href) {
      navigate(item.href);
    }
  };

  if (item.childrens) {
    return (
      <div>
        {(rolePermission?.includes(item?.permissionKey) ||
          !item?.permissionKey) && (
          <div
            className={`flex items-center justify-between pr-2 py-3 pl-2 cursor-pointer menu-item hover:bg-[#2F8DE415] ${
              test
                ? "bg-[#2F8DE415] text-primary icon-active"
                : "bg-transparent text-[#4F4F4F]"
            } ${item?.childrens && !item?.icon && "pl-5"}
          `}
            onClick={handleClickChildrenItem}
          >
            <div
              className={`flex items-center gap-2 ${
                item?.childrens && !item?.icon && "border-l pl-2"
              }`}
            >
              {item?.icon}
              <p className="text-sm">{item?.name}</p>
            </div>
            <div className={`${open && "rotate-90"} smooth-transform`}>
              <ArrowRightIcon />
            </div>
          </div>
        )}
        {/* @ts-ignore */}
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
              {item?.childrens?.map((i, index) => (
                <SideBarItem
                  key={`sub-menu-${i?.id}-${index}`}
                  item={i}
                  rolePermission={rolePermission}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  } else {
    return (
      (rolePermission?.includes(item?.permissionKey) ||
        !item?.permissionKey) && (
        <div
          className="cursor-pointer"
          onClick={() => {
            navigate(item?.href || "/");
          }}
        >
          <div
            className={`flex items-center gap-2 menu-item py-3 smooth-transform pr-2 ${
              test
                ? "bg-[#2F8DE415] text-primary icon-active"
                : "bg-transparent text-[#4F4F4F]"
            } ${item?.icon ? "pl-2" : "pl-7"} hover:bg-[#2F8DE415]`}
          >
            {item?.icon}
            <p className="text-sm">{item?.name}</p>
          </div>
        </div>
      )
    );
  }
}

export default SideBarItem;

const variants = {
  open: { opacity: 1, height: "auto" },
  collapsed: {
    opacity: 0,
    height: 0,
  },
};
