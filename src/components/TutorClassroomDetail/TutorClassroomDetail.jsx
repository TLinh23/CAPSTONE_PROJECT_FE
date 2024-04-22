import React, { useState } from "react";
import ProfileHeader from "../Profile/ProfileHeader";
import RenderStatus from "../common/RenderStatus";
import { format } from "date-fns";
import SecondaryBtn from "../common/SecondaryBtn";
import { Link, useParams } from "react-router-dom";
import { useQueries } from "react-query";
import { getClassDetailData } from "src/apis/class-module";
import PrimaryBtn from "../common/PrimaryBtn";
import { getValueFromKey, slideFromEnd } from "src/libs";
import { DAYS_OF_WEEK } from "src/constants/enumConstant";

function TutorClassroomDetail() {
  const [classRoomDetail, setClassRoomDetail] = useState(undefined);
  const { id } = useParams();

  useQueries([
    {
      queryKey: ["getClassDetail", id],
      queryFn: async () => {
        const response = await getClassDetailData(id);
        setClassRoomDetail(response?.data?.data);
        return response?.data;
      },
    },
  ]);

  return (
    <div className="bg-[#ffffff] block-border">
      <div className="flex items-center gap-4">
        <ProfileHeader title="Classroom detail" />
        <RenderStatus status={classRoomDetail?.status}>
          {classRoomDetail?.status}
        </RenderStatus>
      </div>
      <div className="grid gap-5 mt-5 block-border md:grid-cols-37">
        <div>Classroom Code:</div>
        <div>{id}</div>
        <div>Classroom Name:</div>
        <div>{classRoomDetail?.className}</div>
        <div>Schedule:</div>
        {/* <div className="flex flex-col gap-2">
          <Link
            to={`/schedule/${classRoomDetail?.classId}?classId=${classRoomDetail?.classId}`}
            className="w-[200px]"
          >
            <PrimaryBtn>View Schedule</PrimaryBtn>
          </Link>
        </div> */}
        <div className="flex flex-col gap-2 max-h-[200px] overflow-auto">
          {classRoomDetail?.schedules?.map((item) => (
            <div>
              From:{" "}
              <span className="mr-5">
                {slideFromEnd(item?.sessionStart, -3)}
              </span>
              To:{" "}
              <span className="mr-5">{slideFromEnd(item?.sessionEnd, -3)}</span>{" "}
              On {getValueFromKey(item?.dayOfWeek, DAYS_OF_WEEK)}{" "}
              {item?.date ? format(new Date(item?.date), "dd-MM-yyyy") : ""}
            </div>
          ))}
        </div>
        <div>Date Started:</div>
        <div>
          {classRoomDetail?.startDate
            ? format(new Date(classRoomDetail?.startDate), "dd-MM-yyyy")
            : "---"}
        </div>
        <div>Subject:</div>
        <div>{classRoomDetail?.subjectName}</div>
        <div>Price:</div>
        <div>{classRoomDetail?.price}</div>
        <div>Grade:</div>
        <div>{classRoomDetail?.classLevel}</div>
        <div>Number of Session:</div>
        <div>{classRoomDetail?.numOfSession}</div>

        <Link className="max-w-[200px]" to={`/tutor-classrooms/${id}/students`}>
          <SecondaryBtn>List of Students</SecondaryBtn>
        </Link>
      </div>
    </div>
  );
}

export default TutorClassroomDetail;
