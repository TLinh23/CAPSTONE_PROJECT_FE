import React, { useState } from "react";
import Title from "../common/Title";
import SearchInput from "../common/SearchInput";
import FilterDropDown from "../common/FilterDropDown";

function TutorSchedule({ scheduleDetail }) {
  const [searchParam, setSearchParam] = useState("");
  console.log("scheduleDetail: ", scheduleDetail);
  return (
    <div className="bg-[#ffffff] block-border">
      <Title>My Schedule</Title>

      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
        <SearchInput
          placeholder="Search by key"
          onChange={(e) => setSearchParam(e.target.value)}
          className="w-full my-5 min-w-[170px]"
          value={searchParam || ""}
        />
        <FilterDropDown
          listDropdown={[]}
          showing={undefined}
          setShowing={undefined}
          className="max-w-[240px]"
        />
      </div>

      <div className="grid grid-cols-7 mt-5">
        <div className="schedule-border">Mon</div>
        <div className="schedule-border">Tue</div>
        <div className="schedule-border">Wen</div>
        <div className="schedule-border">Thu</div>
        <div className="schedule-border">Fri</div>
        <div className="schedule-border">Sat</div>
        <div className="schedule-border border-end-line">Sun</div>

        <div className="schedule-border">
          <span className="underline">ClassName</span>
          <br /> 12h-20h
        </div>
        <div className="schedule-border">Toan 3 - 21h - 23h</div>
        <div className="schedule-border">---</div>
        <div className="schedule-border">---</div>
        <div className="schedule-border">---</div>
        <div className="schedule-border">---</div>
        <div className="schedule-border border-end-line">---</div>

        <div className="schedule-border border-end-row">---</div>
        <div className="schedule-border border-end-row">---</div>
        <div className="schedule-border border-end-row">---</div>
        <div className="schedule-border border-end-row">---</div>
        <div className="schedule-border border-end-row">---</div>
        <div className="schedule-border border-end-row">---</div>
        <div className="schedule-border border-end-row border-end-line">
          ---
        </div>
      </div>
    </div>
  );
}

export default TutorSchedule;
