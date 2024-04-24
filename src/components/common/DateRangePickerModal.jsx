import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { DateRangePicker } from "react-date-range";
import { format } from "date-fns";
import {
  DROPDOWN_SUBMENU_ANIMATE,
  MODAL_DIRECTION,
} from "src/constants/constants";

function DateRangePickerModal({
  modalDirection = MODAL_DIRECTION.LEFT,
  dateRange,
  setDateRange,
  className = "",
}) {
  const dateRageNode = useRef();
  const [isOpenDateRage, toggleOpenDateRange] = useState(false);

  const toggleOpenDateRangeMenu = () => {
    toggleOpenDateRange(!isOpenDateRage);
  };

  const handleClickOutsideDateRage = (e) => {
    // @ts-ignore
    if (dateRageNode?.current?.contains(e.target)) {
      return;
    }
    toggleOpenDateRange(false);
  };

  useEffect(() => {
    if (isOpenDateRage) {
      document.addEventListener("mousedown", handleClickOutsideDateRage);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideDateRage);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDateRage);
    };
  }, [isOpenDateRage]);

  return (
    <div className="relative w-full h-full md:w-fit" ref={dateRageNode}>
      <div
        className="h-full px-4 py-3 bg-white border rounded cursor-pointer border-gray hover:border-primary"
        onClick={toggleOpenDateRangeMenu}
      >
        <div className={`flex justify-between ${className}`}>
          <div className="text-[#7F7F7F]">
            From&nbsp;
            <span className="font-medium text-grayDark">
              {dateRange[0]?.startDate
                ? format(dateRange[0]?.startDate, "dd/MM/yyyy")
                : "dd/mm/yyyy"}
            </span>
            &nbsp;-&nbsp;
            <span className="font-medium text-grayDark">
              {dateRange[0]?.endDate
                ? format(dateRange[0]?.endDate, "dd/MM/yyyy")
                : "dd/mm/yyyy"}
            </span>
          </div>
        </div>
      </div>

      <motion.div
        initial="exit"
        animate={isOpenDateRage ? "enter" : "exit"}
        variants={DROPDOWN_SUBMENU_ANIMATE}
        className={`absolute top-[70] ${modalDirection} w-auto`}
        style={{
          borderRadius: 5,
          backgroundColor: "#ECF1F4",
          transformOrigin: "50% -30px",
          zIndex: 50,
        }}
      >
        <div className="smooth-transform z-50 flex w-full min-w-[240px] flex-col rounded-lg bg-[#fff] py-2 px-2 shadow-md">
          <DateRangePicker
            months={2}
            // @ts-ignore
            onChange={(item) => setDateRange([item.selection])}
            ranges={dateRange}
            direction="horizontal"
            rangeColors={["#2F8DE4", "#2F8DE4", "#2F8DE4"]}
          />
        </div>
      </motion.div>
    </div>
  );
}

export default DateRangePickerModal;
