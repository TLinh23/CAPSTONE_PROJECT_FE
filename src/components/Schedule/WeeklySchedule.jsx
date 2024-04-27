import React, { useState } from "react";
import { useAuthContext } from "src/context/AuthContext";
import { ROLE_NAME } from "src/constants/constants";
import TutorSchedule from "./TutorSchedule";
import ParentSchedule from "./ParentSchedule";
import { useQueries } from "react-query";
import {
  getClassByParent,
  getClassByTutor,
  getFiteredSchedule,
} from "src/apis/class-module";

function WeeklySchedule() {
  const { roleKey, userId } = useAuthContext();
  const [listClassroom, setListClassroom] = useState(undefined);
  const [classRoomSelected, setClassRoomSelected] = useState(undefined);
  const [scheduleDetail, setScheduleDetail] = useState(undefined);
  const [childrenName, setChildrenName] = useState(undefined);

  useQueries([
    {
      queryKey: ["getListClassroom", userId],
      queryFn: async () => {
        if (roleKey === ROLE_NAME.TUTOR) {
          const queryObj = {};
          queryObj["PagingRequest.CurrentPage"] = 1;
          queryObj["PagingRequest.PageSize"] = 99;
          queryObj["TutorId"] = userId;
          queryObj["status"] = "ACTIVE";
          const response = await getClassByTutor(queryObj);
          setListClassroom(response?.data?.data);
          return response?.data;
        }
      },
      enabled: !!userId,
    },
    {
      queryKey: ["getSchedule", classRoomSelected, childrenName],
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
        if (childrenName?.fullName) {
          queryObj["studentName"] = childrenName?.fullName;
        }

        const response = await getFiteredSchedule(queryObj);
        setScheduleDetail(response?.data?.data);
        return response?.data;
      },
      enabled: !!userId,
    },
    {
      queryKey: ["getListClass", userId],
      queryFn: async () => {
        if (roleKey === ROLE_NAME.PARENT) {
          const queryObj = {};
          queryObj["PagingRequest.CurrentPage"] = 1;
          queryObj["PagingRequest.PageSize"] = 99;
          queryObj["ParentId"] = userId;
          queryObj["Status"] = "ACTIVE";
          const response = await getClassByParent(queryObj);
          setListClassroom(response?.data?.data);
          return response?.data;
        }
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
          childrenName={childrenName}
          setChildrenName={setChildrenName}
          classRoomSelected={classRoomSelected}
          setClassRoomSelected={setClassRoomSelected}
        />
      )}
    </div>
  );
}

export default WeeklySchedule;
