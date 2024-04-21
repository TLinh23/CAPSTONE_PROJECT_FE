import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import DemoApp from "./DemoApp";

const events = [{ title: "Meeting", start: new Date() }];

function PageTest() {
  const [filterButtonState, setFilterButtonState] = useState(0);

  return (
    <div>
      <div>ABCD</div>
      <DemoApp />
    </div>
  );
}

export default PageTest;

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}
