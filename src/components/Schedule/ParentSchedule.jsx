import React, { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

import { INITIAL_EVENTS, getValueFromId } from "src/libs";
import { format } from "date-fns";
import Title from "../common/Title";
import { getWeeksInYear, getYearsRange } from "src/libs/getWeekInYear";
import YearTimeDropDown from "../common/YearTimeDropDown";
import { Link } from "react-router-dom";
import { LIST_ATTEND_STATUS } from "src/constants/enumConstant";

function ParentSchedule(props) {
  const { scheduleDetail } = props;
  const [listWeekInYear, setListWeekInYear] = useState(undefined);
  const LIST_YEAR = getYearsRange();
  const currentYear = new Date().getFullYear();
  const calendarRef = useRef(null);
  const [yearSelected, setYearSelected] = useState(currentYear);
  const [weekSelected, setWeekSelected] = useState(undefined);

  useEffect(() => {
    if (yearSelected) {
      const listWeek = getWeeksInYear(yearSelected);
      setListWeekInYear(listWeek);
    }
  }, [yearSelected]);

  const calendarApi = calendarRef.current?.getApi();
  const endDate = calendarApi?.view?.activeEnd
    ? new Date(calendarApi?.view?.activeEnd)
    : new Date();
  endDate.setDate(endDate.getDate() - 1);

  const defaultSelectedDWeek = `${
    calendarApi?.view?.activeStart &&
    format(new Date(calendarApi?.view?.activeStart), "dd/MM")
  } To 
  ${endDate && format(new Date(endDate), "dd/MM")}
  `;

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
      ? new Date(event?.date).toISOString().replace(/T.*$/, "") +
        `T${event?.sessionStart}`
      : new Date(),
    end: event?.date
      ? new Date(event?.date).toISOString().replace(/T.*$/, "") +
        `T${event?.sessionEnd}`
      : new Date(),
    extendedProps: {
      status: event?.status,
      classId: event?.classId,
      studentName: event?.studentName,
      attendent: event?.attendent,
    },
  }));

  return (
    <div className="bg-[#ffffff] block-border">
      <div className="flex items-center justify-between gap-5">
        <Title>My Schedule</Title>
        <div className="flex items-center gap-3">
          <YearTimeDropDown
            listDropdown={listWeekInYear || []}
            showing={weekSelected}
            setShowing={setWeekSelected}
            className="!w-[240px]"
            textDefault={defaultSelectedDWeek}
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
                return format(args.date, "iii - dd/MM");
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ParentSchedule;

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
      <div className="text-sm">
        <b>{eventInfo?.event?.extendedProps?.studentName}</b>
      </div>
      {eventInfo.event?.extendedProps?.attendent && (
        <div
          className={`p-1 mt-1 bg-white ${
            eventInfo.event?.extendedProps?.attendent === 1
              ? "text-successBtn"
              : "text-denied"
          } w-fit`}
        >
          {getValueFromId(
            eventInfo.event?.extendedProps?.attendent,
            LIST_ATTEND_STATUS
          )}
        </div>
      )}
    </div>
  );
}
