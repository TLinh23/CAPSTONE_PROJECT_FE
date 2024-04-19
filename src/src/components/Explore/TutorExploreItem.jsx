import React from "react";
import { Link } from "react-router-dom";
import SecondaryBtn from "../common/SecondaryBtn";
import { format } from "date-fns";
import { useAuthContext } from "src/context/AuthContext";
import { ROLE_NAME } from "src/constants/constants";
import PrimaryBtn from "../common/PrimaryBtn";

function TutorExploreItem(props) {
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
        <div className="flex items-center gap-2">
          <img
            src={item?.userAvatar || "/images/logo-default.png"}
            alt=""
            className="w-[46px] h-[46px] object-cover rounded-full"
          />
          <div>
            <p className="text-base font-bold">{item?.fullName}</p>
            <p className="text-sm font-light">{item?.school}</p>
          </div>
        </div>

        <div className="grid mt-5 grid-cols-37 gap-x-3 gap-y-1">
          <div className="text-left">Gender:</div>
          <div className="text-right">{item?.gender}</div>
          <div className="text-left">Graduation:</div>
          <div className="text-right">{item?.graduationYear}</div>
          <div className="text-left">Birth Date:</div>
          <div className="text-right">
            {item?.dob ? format(new Date(item?.dob), "dd-MM-yyyy") : "---"}
          </div>
          <div className="text-left">CV:</div>
          <div className="text-right">
            <a
              className="underline hover:text-primary smooth-transform"
              href={item?.cv}
              target="_blank"
              rel="noreferrer"
            >
              View Now
            </a>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 mt-2">
          <Link to={`/profile/${item?.personId}`}>
            <SecondaryBtn className="!w-[100px]">Detail</SecondaryBtn>
          </Link>
          {roleKey === ROLE_NAME.PARENT && (
            <div className="flex justify-center">
              <Link
                to={`/classroom-requests/create?requestType=OPEN&tutorId=${item?.personId}`}
                className="md:max-w-[222px]"
              >
                <PrimaryBtn>Send Request</PrimaryBtn>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TutorExploreItem;
