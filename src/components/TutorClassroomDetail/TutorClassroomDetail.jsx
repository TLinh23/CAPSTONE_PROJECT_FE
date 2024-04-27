import React, { useState } from "react";
import RenderStatus from "../common/RenderStatus";
import { format } from "date-fns";
import SecondaryBtn from "../common/SecondaryBtn";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQueries } from "react-query";
import { getClassDetailData } from "src/apis/class-module";
import { getValueFromKey, slideFromEnd } from "src/libs";
import { DAYS_OF_WEEK } from "src/constants/enumConstant";
import SmallTitle from "../common/SmallTitle";
import Title from "../common/Title";
import ArrowLeftIcon from "../icons/ArrowLeftIcon";

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
  const navigate = useNavigate();
  return (
    <div className="bg-[#ffffff] block-border">
      <div className="flex items-center gap-4">
        <div
          className="flex items-center gap-3 cursor-pointer w-fit"
          onClick={() => {
            navigate("/tutor-classrooms");
          }}
        >
          <div className="cursor-pointer">
            <ArrowLeftIcon />
          </div>
          <Title>Classroom detail</Title>
        </div>
        <RenderStatus status={classRoomDetail?.status}>
          {classRoomDetail?.status}
        </RenderStatus>
      </div>
      <div className="grid gap-5 mt-5 block-border md:grid-cols-37">
        <div>Classroom Code:</div>
        <div>{id}</div>
        <div>Classroom Name:</div>
        <div>{classRoomDetail?.className}</div>
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
      </div>
      <div className="flex items-center gap-5 mt-5">
        <Link className="w-[200px]" to={`/tutor-classrooms/${id}/students`}>
          <SecondaryBtn>List of Students</SecondaryBtn>
        </Link>
        <Link className="max-w-[200px]" to={`/assessesments?id=${id}`}>
          <SecondaryBtn>List Assessments</SecondaryBtn>
        </Link>
      </div>
      <div className="mt-5">
        <SmallTitle>Schedule</SmallTitle>
        <div className="flex flex-col gap-2 max-h-[200px] overflow-auto mt-5">
          {classRoomDetail?.schedules?.map((item, index) => (
            <div className="grid gap-3 grid-cols-2020202020" key={index}>
              <div>
                From: <span>{slideFromEnd(item?.sessionStart, -3)}</span>
              </div>
              <div>
                To:{" "}
                <span className="mr-12">
                  {slideFromEnd(item?.sessionEnd, -3)}
                </span>
              </div>
              <div>
                On {getValueFromKey(item?.dayOfWeek, DAYS_OF_WEEK)}{" "}
                {item?.date ? format(new Date(item?.date), "dd-MM-yyyy") : ""}
              </div>
              {/* classrooms/attendant/5?classId=0&date=2024-04-23T00:00:00&start=19:10:00&end=21:10:00 */}
              <Link
                to={`/classrooms/attendant/${item?.id}?classId=${id}&date=${item?.date}&start=${item?.sessionStart}&end=${item?.sessionEnd}`}
              >
                <div className="underline text-blue">Take Attendance</div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TutorClassroomDetail;
