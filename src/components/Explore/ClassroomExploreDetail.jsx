import React, { useState } from "react";
import ProfileHeader from "../Profile/ProfileHeader";
import RenderStatus from "../common/RenderStatus";
import { format } from "date-fns";
import SecondaryBtn from "../common/SecondaryBtn";
import { Link, useParams } from "react-router-dom";
import { useQueries } from "react-query";
import { getClassDetailData } from "src/apis/class-module";
import { CLASS_REQUEST_TYPE, DAYS_OF_WEEK } from "src/constants/enumConstant";
import { getValueFromKey, slideFromEnd } from "src/libs";
import { useAuthContext } from "src/context/AuthContext";
import { ROLE_NAME } from "src/constants/constants";
import SmallTitle from "../common/SmallTitle";

function ClassroomExploreDetail() {
  const [classRoomDetail, setClassRoomDetail] = useState(undefined);
  const { id } = useParams();
  const { roleKey } = useAuthContext();

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
        {roleKey === ROLE_NAME.PARENT && (
          <Link
            className="w-[200px]"
            to={`/classroom-requests/create?tutorId=${classRoomDetail?.tutorId}&classId=${classRoomDetail?.classId}&requestType=${CLASS_REQUEST_TYPE.JOIN}`}
          >
            <SecondaryBtn>Join</SecondaryBtn>
          </Link>
        )}
      </div>
      <div className="mt-5">
        <SmallTitle>Schedule:</SmallTitle>
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ClassroomExploreDetail;
