import React, { useState } from "react";
import { useAuthContext } from "src/context/AuthContext";
import { ROLE_NAME } from "src/constants/constants";
import TutorSchedule from "./TutorSchedule";
import ParentSchedule from "./ParentSchedule";
import { useQueries } from "react-query";
import { getClassByTutor, getScheduleByClass } from "src/apis/class-module";

function WeeklySchedule() {
  const { roleKey, userId } = useAuthContext();
  const [listClassroom, setListClassroom] = useState(undefined);
  const [scheduleDetail, setScheduleDetail] = useState(undefined);

  useQueries([
    {
      queryKey: ["getListClass"],
      queryFn: async () => {
        if (roleKey === ROLE_NAME.TUTOR) {
          const queryObj = {};
          queryObj["PagingRequest.CurrentPage"] = 1;
          queryObj["PagingRequest.PageSize"] = 99;
          queryObj["TutorId"] = userId;

          const response = await getClassByTutor(queryObj);
          setListClassroom(response?.data?.data);
          return response?.data;
        }
      },
      enabled: !!userId,
    },
    {
      queryKey: ["getSchedule"],
      queryFn: async () => {
        const queryObj = {};

        const response = await getScheduleByClass(queryObj);
        setScheduleDetail(response?.data?.data);
        return response?.data;
      },
      enabled: !!userId,
    },
  ]);

  // getScheduleByClass
  return (
    <div>
      {roleKey === ROLE_NAME.TUTOR && (
        <TutorSchedule scheduleDetail={scheduleDetail} />
      )}
      {roleKey === ROLE_NAME.PARENT && <ParentSchedule />}
    </div>
  );
}

export default WeeklySchedule;
