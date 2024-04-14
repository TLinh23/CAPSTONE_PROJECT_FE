import React, { useState } from "react";
import Title from "../common/Title";
import FilterDropDown from "../common/FilterDropDown";
import { VALUE_DAYS_OF_WEEK } from "src/constants/enumConstant";
import { Link } from "react-router-dom";
import { slideEndItem } from "src/libs";

function TutorSchedule(props) {
  const {
    scheduleDetail,
    listClassroom,
    classRoomSelected,
    setClassRoomSelected,
  } = props;

  return (
    <div className="bg-[#ffffff] block-border">
      <Title>My Schedule</Title>

      <div className="flex justify-end gap-5">
        <FilterDropDown
          listDropdown={listClassroom?.items}
          showing={classRoomSelected}
          setShowing={setClassRoomSelected}
          className="max-w-[240px]"
          textDefault="Select classroom"
          type="className"
        />
      </div>

      <div className="grid grid-cols-7 gap-2 mt-5 border">
        <div className="schedule-border">Mon</div>
        <div className="schedule-border">Tue</div>
        <div className="schedule-border">Wed</div>
        <div className="schedule-border">Thu</div>
        <div className="schedule-border">Fri</div>
        <div className="schedule-border">Sat</div>
        <div className="schedule-border">Sun</div>

        {scheduleDetail &&
          VALUE_DAYS_OF_WEEK.map((day) => (
            <div key={day}>
              {scheduleDetail
                ?.filter((item) => item?.dayOfWeek === day)
                ?.map((item) => (
                  <div className="schedule-border-item" key={item?.id}>
                    <Link to={`/classrooms/${item?.classId}`}>
                      <span className="underline truncate-1-line">
                        {item?.className}
                      </span>
                    </Link>
                    <div className="mt-2">
                      {`${slideEndItem(item?.sessionStart, 3)} - ${slideEndItem(
                        item?.sessionEnd,
                        3
                      )}`}
                    </div>
                  </div>
                ))}
            </div>
          ))}
      </div>
    </div>
  );
}

export default TutorSchedule;
