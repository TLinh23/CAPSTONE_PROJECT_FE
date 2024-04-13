import React, { useState } from "react";
import { toast } from "react-toastify";
import FilterDropDown from "src/components/common/FilterDropDown";
import PrimaryBtn from "src/components/common/PrimaryBtn";
import PrimaryInput from "src/components/common/PrimaryInput";
import SecondaryBtn from "src/components/common/SecondaryBtn";
import SmallTitle from "src/components/common/SmallTitle";
import AddPlusIcon from "src/components/icons/AddPlusIcon";
import GarbageIcon from "src/components/icons/GarbageIcon";
import { DAYS_OF_WEEK } from "src/constants/enumConstant";

function TutorCreateClassroomTime(props) {
  const {
    setActiveTab,
    listLevels,
    setListLevels,
    sessionStart,
    setSessionStart,
    sessionEnd,
    setSessionEnd,
    dayOfWeek,
    setDayOfWeek,
  } = props;

  const handleAddNewLevel = () => {
    if (sessionStart && sessionEnd && dayOfWeek) {
      if (sessionStart > sessionEnd) {
        toast.error("Session end must be greater than sesstion start");
        return;
      }
      setListLevels([
        ...listLevels,
        {
          sessionStart: sessionStart,
          sessionEnd: sessionEnd,
          dayOfWeek: dayOfWeek?.key,
          dayValue: dayOfWeek?.value,
          status: "CREATED",
        },
      ]);
      setSessionEnd("");
      setSessionStart("");
      setDayOfWeek(undefined);
    }
  };

  return (
    <div className="bg-white block-border">
      <SmallTitle className="!font-bold">Schedule</SmallTitle>
      <div>
        {listLevels?.length > 0 && (
          <div className="max-h-[276px] overflow-y-auto my-2">
            {listLevels.map((i, index) => (
              <TableLevelRow
                key={`level-row-${index}`}
                data={i}
                itemIndex={index}
                listLevels={listLevels}
                setListLevels={setListLevels}
              />
            ))}
          </div>
        )}
        <AdditionLevelRow
          handleAddNewLevel={handleAddNewLevel}
          sessionStart={sessionStart}
          sessionEnd={sessionEnd}
          setSessionStart={setSessionStart}
          setSessionEnd={setSessionEnd}
          dayOfWeek={dayOfWeek}
          setDayOfWeek={setDayOfWeek}
          scheduleNumber={listLevels?.length + 1}
        />
      </div>
      <div className="flex items-center justify-center gap-5 mt-20">
        <SecondaryBtn
          onClick={() => {
            setActiveTab("information");
          }}
          className="!w-[160px]"
        >
          Back
        </SecondaryBtn>
        <PrimaryBtn
          onClick={() => {
            setActiveTab("confirm");
          }}
          className="!w-[160px]"
        >
          Continue
        </PrimaryBtn>
      </div>
    </div>
  );
}

export default TutorCreateClassroomTime;

function AdditionLevelRow({
  handleAddNewLevel,
  sessionStart,
  sessionEnd,
  setSessionStart,
  setSessionEnd,
  dayOfWeek,
  setDayOfWeek,
  scheduleNumber,
}) {
  return (
    <div className="grid items-end gap-3 mt-3 grid-cols-3530305">
      <div className="flex items-center gap-3">
        <h1>Schedule {scheduleNumber}:</h1>
        <FilterDropDown
          textDefault="Select date"
          className="!w-[200px]"
          listDropdown={DAYS_OF_WEEK}
          showing={dayOfWeek}
          setShowing={setDayOfWeek}
        />
      </div>
      <div className="flex items-center gap-3">
        <p>Start time</p>
        <input
          type="time"
          value={sessionStart || ""}
          onChange={(e) => {
            setSessionStart(e.target.value);
          }}
        />
      </div>
      <div className="flex items-center gap-3">
        <p>End time</p>
        <input
          type="time"
          value={sessionEnd || ""}
          onChange={(e) => {
            setSessionEnd(e.target.value);
          }}
        />
      </div>
      <div className="h-[46px] flex items-center justify-center cursor-pointer">
        <SecondaryBtn
          className="!w-10 !h-10 !px-0 !py-0 rounded"
          onClick={handleAddNewLevel}
        >
          <AddPlusIcon />
        </SecondaryBtn>
      </div>
    </div>
  );
}

function TableLevelRow({ data, listLevels, setListLevels, itemIndex }) {
  const handleRemoveLevel = () => {
    const listRemove = listLevels.filter((i, index) => index !== itemIndex);
    setListLevels(listRemove);
  };

  return (
    <div className="grid items-end gap-3 mt-3 grid-cols-3530305">
      <div className="flex items-center gap-3">
        <h1>Schedule {itemIndex + 1}:</h1>
        <FilterDropDown
          textDefault={data?.dayValue}
          className="!w-[200px]"
          listDropdown={DAYS_OF_WEEK}
          showing={undefined}
          setShowing={undefined}
          disabled
        />
      </div>
      <div className="flex items-center gap-3">
        <p>Start time</p>
        <input type="time" value={data?.sessionStart || ""} readOnly />
      </div>
      <div className="flex items-center gap-3">
        <p>End time</p>
        <input type="time" value={data?.sessionEnd || ""} readOnly />
      </div>
      <div className="h-[46px] flex items-center justify-center cursor-pointer">
        <div onClick={handleRemoveLevel}>
          <GarbageIcon />
        </div>
      </div>
    </div>
  );
}
