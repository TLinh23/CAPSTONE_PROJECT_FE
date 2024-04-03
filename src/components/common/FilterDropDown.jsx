import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import ArrowDownIcon from "../icons/ArrowDownIcon";

function FilterDropDown({
  title = "",
  listDropdown,
  showing,
  setShowing,
  textDefault = "",
  className = "",
  required = "",
  type = "",
  classNameDropdown = "",
  disabled = false,
}) {
  const node = useRef();
  const [isOpen, toggleOpen] = useState(false);

  const toggleOpenMenu = () => {
    if (listDropdown?.length > 0 && !disabled) {
      toggleOpen(!isOpen);
    }
  };

  const handleClickOutside = (e) => {
    // @ts-ignore
    if (node.current && node.current?.contains(e.target)) {
      return;
    }
    toggleOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const subMenuAnimate = {
    enter: {
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.2,
      },
      display: "block",
    },
    exit: {
      opacity: 0,
      rotateX: -15,
      transition: {
        duration: 0.2,
        delay: 0.05,
      },
      transitionEnd: {
        display: "none",
      },
    },
  };

  return (
    <motion.div className={`relative text-[#000000] w-full ${className}`}>
      <div>
        {title && (
          <div className="flex gap-1 mb-2">
            <p className="text-sm font-bold text-gray">{title}</p>
            {required && <p className="text-red-500">{required}</p>}
          </div>
        )}

        <div
          ref={node}
          onClick={toggleOpenMenu}
          className={`h-[46px] flex items-center ${
            disabled ? "bg-readOnly" : "bg-[#fff]"
          } justify-between gap-2 px-4 py-3 border rounded cursor-pointer border-gray hover:border-primary smooth-transform ${
            listDropdown === undefined || listDropdown?.length === 0
              ? "bg-readOnly"
              : "bg-[#fff]"
          }`}
        >
          <div className="flex items-center gap-1">
            <p className="text-[#000000]">
              {showing?.name || showing?.value || textDefault}
            </p>
          </div>
          <ArrowDownIcon color="#373737" />
        </div>
      </div>

      <motion.div
        initial="exit"
        animate={isOpen ? "enter" : "exit"}
        variants={subMenuAnimate}
        className={`absolute right-0 w-full shadow-md`}
        style={{
          borderRadius: 5,
          backgroundColor: "#ECF1F4",
          transformOrigin: "50% -30px",
          zIndex: 1,
        }}
      >
        <div
          id="list-dropdown"
          className={`smooth-transform z-50 flex w-full flex-col gap-1 rounded-b-xl  bg-[#fff] py-3  max-h-[250px] overflow-y-auto ${classNameDropdown}`}
        >
          {listDropdown?.map((i, index) => (
            <DropDownItem
              key={index}
              data={i}
              setShowing={setShowing}
              showing={showing}
              toggleOpen={toggleOpen}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default FilterDropDown;

function DropDownItem({ data, showing, setShowing, toggleOpen }) {
  const isSelected = showing === data;

  return (
    <div
      onClick={() => {
        setShowing(data);
        toggleOpen(false);
      }}
      className={`flex items-center w-full px-4 py-3 text-sm cursor-pointer bg-opacity-20 hover:bg-[#2F8DE415] smooth-transform ${
        isSelected ? "bg-[#2F8DE4] text-black" : ""
      }`}
    >
      <p>{data?.name || data?.value}</p>
      {isSelected && <span className="ml-1">✓</span>}
    </div>
  );
}
