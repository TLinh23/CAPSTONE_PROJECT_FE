import React, { useRef, useState } from "react";
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

import { INITIAL_EVENTS, createEventId } from "src/libs";
import { format } from "date-fns";
import PrimaryBtn from "src/components/common/PrimaryBtn";
import Layout from "src/components/layout/Layout";

export default function DemoApp() {
  const calendarRef = useRef(null);

  const handleClick = () => {
    if (calendarRef.current) {
      let calendarApi = calendarRef.current.getApi();
      console.log("Go go", calendarRef.current, "calendarApi: ", calendarApi);
      calendarApi.gotoDate("2023-01-01");
    }
  };

  return (
    <Layout>
      <div className="bg-white demo-app">
        <div className="mt-5 demo-app-main">
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
            eventContent={renderEventContent} // custom render function
            firstDay={1}
            height={500}
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
        </div>
      </div>
    </Layout>
  );
}

function renderEventContent(eventInfo) {
  return (
    <div>
      <div>
        <b>{eventInfo.timeText}</b> - <i>{eventInfo.event.title}</i>
      </div>
      <div className="flex items-center gap-2">
        <div>Quang Hai</div>
        <div className="p-1 bg-white text-successBtn w-fit">
          {eventInfo.event?.extendedProps?.description}
        </div>
      </div>
    </div>
  );
}

function Sidebar({ weekendsVisible, handleWeekendsToggle, currentEvents }) {
  return (
    <div className="demo-app-sidebar">
      <div className="demo-app-sidebar-section">
        <h2>Instructions</h2>
        <ul>
          <li>Select dates and you will be prompted to create a new event</li>
          <li>Drag, drop, and resize events</li>
          <li>Click an event to delete it</li>
        </ul>
      </div>
      <div className="demo-app-sidebar-section">
        <label>
          <input
            type="checkbox"
            checked={weekendsVisible}
            onChange={handleWeekendsToggle}
          ></input>
          toggle weekends
        </label>
      </div>
      <div className="demo-app-sidebar-section">
        <h2>All Events ({currentEvents.length})</h2>
        <ul>
          {currentEvents.map((event) => (
            <SidebarEvent key={event.id} event={event} />
          ))}
        </ul>
      </div>
    </div>
  );
}

function SidebarEvent({ event }) {
  return (
    <li key={event.id}>
      <b>
        {formatDate(event.start, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </b>
      <i>{event.title}</i>
    </li>
  );
}
