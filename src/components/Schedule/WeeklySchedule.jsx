import React, { useState } from "react";
import { useAuthContext } from "src/context/AuthContext";
import { ROLE_NAME } from "src/constants/constants";
import TutorSchedule from "./TutorSchedule";
import ParentSchedule from "./ParentSchedule";
import { useQueries } from "react-query";
import {
  getClassByTutor,
  getFiteredSchedule,
  getScheduleByClass,
} from "src/apis/class-module";

function WeeklySchedule() {
  const { roleKey, userId } = useAuthContext();
  const [listClassroom, setListClassroom] = useState(undefined);
  const [classRoomSelected, setClassRoomSelected] = useState(undefined);
  const [scheduleDetail, setScheduleDetail] = useState(undefined);

  useQueries([
    {
      queryKey: ["getListClassroom"],
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
      queryKey: ["getSchedule", classRoomSelected],
      queryFn: async () => {
        let queryObj = {
          personId: userId,
        };
        if (classRoomSelected && classRoomSelected?.className !== "All Class") {
          queryObj["classId"] = classRoomSelected?.classId;
        }
        if (classRoomSelected?.className === "All Class") {
          queryObj = {
            personId: userId,
          };
        }

        const response = await getFiteredSchedule(queryObj);
        setScheduleDetail(response?.data?.data);
        return response?.data;
      },
      enabled: !!userId,
    },
  ]);

  return (
    <div>
      {roleKey === ROLE_NAME.TUTOR && (
        <TutorSchedule
          scheduleDetail={scheduleDetail}
          listClassroom={listClassroom}
          classRoomSelected={classRoomSelected}
          setClassRoomSelected={setClassRoomSelected}
        />
      )}
      {roleKey === ROLE_NAME.PARENT && (
        <ParentSchedule
          scheduleDetail={scheduleDetail}
          listClassroom={listClassroom}
        />
      )}
    </div>
  );
}

export default WeeklySchedule;
