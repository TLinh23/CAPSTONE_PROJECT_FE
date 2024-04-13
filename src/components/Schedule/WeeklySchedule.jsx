import React, { useState } from "react";
import Title from "../common/Title";
import SearchInput from "../common/SearchInput";
import FilterDropDown from "../common/FilterDropDown";
import { useAuthContext } from "src/context/AuthContext";
import { ROLE_NAME } from "src/constants/constants";
import TutorSchedule from "./TutorSchedule";
import ParentSchedule from "./ParentSchedule";

function WeeklySchedule() {
  const { roleKey } = useAuthContext();

  return (
    <div>
      {roleKey === ROLE_NAME.TUTOR && <TutorSchedule />}
      {roleKey === ROLE_NAME.PARENT && <ParentSchedule />}
    </div>
  );
}

export default WeeklySchedule;
