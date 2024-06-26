import { format } from "date-fns";
import React from "react";
import PrimaryBtn from "../common/PrimaryBtn";
import { Link } from "react-router-dom";
import { CLASS_REQUEST_TYPE } from "src/constants/enumConstant";
import SecondaryBtn from "../common/SecondaryBtn";
import { useAuthContext } from "src/context/AuthContext";
import { ROLE_NAME } from "src/constants/constants";

function ClassroomExploreItem(props) {
  const { item, isFeatured = false } = props;
  const { roleKey } = useAuthContext();
  return (
    <div className="border border-gray-300 rounded-md">
      {isFeatured && (
        <div className="relative">
          <div className="absolute right-0 top-[6px] px-2 py-1 bg-red-500 text-white text-xs rounded-l-md">
            FEATURED
          </div>
        </div>
      )}
      <div className="p-5">
        <div className="grid items-end gap-x-3 gap-y-1 grid-cols-37">
          <div>Name:</div>
          <div className="text-xl font-semibold">{item?.className}</div>
          <div>Subject:</div>
          <div>{item?.subjectName}</div>
          <div>Level</div>
          <div>{item?.classLevel}</div>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <img
            src={item?.tutorAvatar || "/images/logo-default.png"}
            alt=""
            className="w-[46px] h-[46px] object-cover rounded-full"
          />
          <div>
            <p className="text-base font-bold">{item?.tutorName}</p>
            <p className="text-sm font-light">{item?.school || "Dai Hoc"}</p>
          </div>
        </div>

        <div className="grid mt-5 grid-cols-3367 gap-x-3 gap-y-1">
          <div className="text-left">Start Date:</div>
          <div className="text-right">
            {item?.startDate
              ? format(new Date(item?.startDate), "dd-MM-yyyy")
              : "---"}
          </div>
          <div className="text-left">Price:</div>
          <div className="font-semibold text-right">{item?.price || "---"}</div>
        </div>
        <div className="flex justify-between gap-3 mt-2">
          <Link to={`/classrooms/${item?.classId}`}>
            <SecondaryBtn className="!w-[100px]">Detail</SecondaryBtn>
          </Link>
          {roleKey === ROLE_NAME.PARENT && (
            <Link
              to={`/classroom-requests/create?tutorId=${item?.tutorId}&classId=${item?.classId}&requestType=${CLASS_REQUEST_TYPE.JOIN}`}
            >
              <PrimaryBtn className="!w-[100px]">Join</PrimaryBtn>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default ClassroomExploreItem;
