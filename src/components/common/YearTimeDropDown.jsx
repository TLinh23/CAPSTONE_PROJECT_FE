import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import ArrowDownIcon from "../icons/ArrowDownIcon";

function YearTimeDropDown({
  title = "",
  listDropdown,
  showing,
  setShowing,
  textDefault = "",
  className = "",
  required = "",
  classNameDropdown = "",
  disabled = false,
  handleSelectItem = undefined,
}) {
  const node = useRef();
  const listRef = useRef();
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
            <p className="text-[#000000]">{showing || textDefault}</p>
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
          zIndex: 9999,
        }}
      >
        <div
          ref={listRef}
          id="list-dropdown"
          className={`smooth-transform z-9999 flex w-full flex-col gap-1 rounded-b-xl  bg-[#fff] py-3  max-h-[250px] overflow-y-auto ${classNameDropdown}`}
        >
          {listDropdown?.map((i, index) => (
            <DropDownItem
              key={index}
              data={i}
              setShowing={setShowing}
              showing={showing}
              toggleOpen={toggleOpen}
              handleSelectItem={handleSelectItem}
              textDefault={textDefault}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default YearTimeDropDown;

function DropDownItem({
  data,
  showing,
  setShowing,
  toggleOpen,
  handleSelectItem,
  textDefault = "",
}) {
  const isSelected = showing === data || textDefault === data;
  return (
    <div
      onClick={() => {
        setShowing(data);
        toggleOpen(false);
        if (handleSelectItem) {
          handleSelectItem(data);
        }
      }}
      className={`flex items-center w-full px-4 py-3 text-sm cursor-pointer bg-opacity-20 hover:bg-[#2F8DE415] smooth-transform ${
        isSelected ? "bg-[#2F8DE4] text-black" : ""
      }`}
      id={data}
    >
      <p>{data}</p>
      {isSelected && <span className="ml-1">✓</span>}
    </div>
  );
}
