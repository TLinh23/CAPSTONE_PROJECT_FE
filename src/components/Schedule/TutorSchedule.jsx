import React, { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

import { INITIAL_EVENTS } from "src/libs";
import { format } from "date-fns";
import Title from "../common/Title";
import { getWeeksInYear, getYearsRange } from "src/libs/getWeekInYear";
import YearTimeDropDown from "../common/YearTimeDropDown";
import { Link } from "react-router-dom";
import FilterDropDown from "../common/FilterDropDown";

function TutorSchedule(props) {
  const {
    scheduleDetail,
    listClassroom,
    classRoomSelected,
    setClassRoomSelected,
  } = props;
  const [listWeekInYear, setListWeekInYear] = useState(undefined);
  const LIST_YEAR = getYearsRange();
  const currentYear = new Date().getFullYear();
  const calendarRef = useRef(null);
  const [yearSelected, setYearSelected] = useState(currentYear);
  const [weekSelected, setWeekSelected] = useState(undefined);
  const [defaultSelectedWeek, setDefaultSelectedWeek] = useState(undefined);

  useEffect(() => {
    if (yearSelected) {
      const listWeek = getWeeksInYear(yearSelected);
      setListWeekInYear(listWeek);
    }
  }, [yearSelected]);

  const handleSelectItem = (data) => {
    let calendarApi = calendarRef.current.getApi();
    const weekStart = data.split(" ")[0];
    const [day, month] = weekStart.split("/");
    const targetDate = new Date(`${month}-${day}-${yearSelected}`);
    calendarApi.gotoDate(targetDate);
  };
  const events = scheduleDetail?.map((event) => ({
    id: event?.id,
    title: event?.className,
    start: event?.date
      ? new Date(`${event?.date.split("T")[0]}T${event?.sessionStart}`)
      : new Date(),
    end: event?.date
      ? new Date(`${event?.date.split("T")[0]}T${event?.sessionEnd}`)
      : new Date(),
    extendedProps: {
      status: event?.status,
      classId: event?.classId,
      studentName: event?.studentName,
      attendent: event?.attendent,
      date: event?.date,
      sessionStart: event?.sessionStart,
      sessionEnd: event?.sessionEnd,
    },
  }));

  return (
    <div className="bg-[#ffffff] block-border">
      <div className="flex items-center justify-between gap-5">
        <Title>My Schedule</Title>
        <div className="flex items-center gap-3">
          {/* <FilterDropDown
            type="className"
            listDropdown={listClassroom?.items}
            showing={classRoomSelected}
            setShowing={setClassRoomSelected}
            textDefault="Select Class"
            className="!w-[240px]"
          /> */}
          <YearTimeDropDown
            listDropdown={listWeekInYear || []}
            showing={weekSelected}
            setShowing={setWeekSelected}
            className="!w-[240px]"
            textDefault={defaultSelectedWeek}
            handleSelectItem={handleSelectItem}
          />
          <YearTimeDropDown
            listDropdown={LIST_YEAR}
            showing={yearSelected}
            setShowing={setYearSelected}
            className="!w-[120px]"
          />
        </div>
      </div>
      <div className="mt-5 bg-white demo-app">
        <div className="demo-app-main">
          {events && (
            <FullCalendar
              ref={calendarRef}
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                listPlugin,
              ]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "timeGridWeek,timeGridDay,listWeek",
              }}
              initialView="timeGridWeek"
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              initialEvents={INITIAL_EVENTS}
              events={events}
              eventContent={renderEventContent} // custom render function
              firstDay={1}
              height={600}
              eventTimeFormat={{
                hour: "2-digit",
                minute: "2-digit",
                meridiem: false,
                hour12: false,
              }}
              slotLabelFormat={{
                hour: "numeric",
                minute: "2-digit",
                hour12: false,
              }}
              allDaySlot={false}
              dayHeaderContent={(args) => {
                return format(new Date(args?.date), "iii - dd/MM");
              }}
              datesSet={(args) => {
                const startDate = args?.start
                  ? new Date(args?.start)
                  : new Date();
                const endDate = args?.end ? new Date(args?.end) : new Date();
                endDate.setDate(endDate.getDate() - 1);
                setDefaultSelectedWeek(
                  `${startDate && format(new Date(startDate), "dd/MM")} To ${
                    endDate && format(new Date(endDate), "dd/MM")
                  }`
                );
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default TutorSchedule;

function renderEventContent(eventInfo) {
  return (
    <div>
      <div className="text-sm">
        <b>{eventInfo.timeText}</b>
      </div>
      <Link to={`/classrooms/${eventInfo.event?.extendedProps?.classId}`}>
        <div className="text-sm underline truncate-1-line">
          <i>{eventInfo.event.title}</i>
        </div>
      </Link>
      <Link
        to={`/classrooms/attendant/${eventInfo.event?.id}?classId=${eventInfo.event?.extendedProps?.classId}&date=${eventInfo.event?.extendedProps?.date}&start=${eventInfo.event?.extendedProps?.sessionStart}&end=${eventInfo.event?.extendedProps?.sessionEnd}`}
      >
        <div className="mt-1 text-sm underline">Take attendance</div>
      </Link>
    </div>
  );
}
