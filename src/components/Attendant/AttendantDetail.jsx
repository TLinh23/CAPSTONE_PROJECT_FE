import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ProfileHeader from "../Profile/ProfileHeader";
import PrimaryBtn from "../common/PrimaryBtn";
import SecondaryBtn from "../common/SecondaryBtn";
import { useMutation, useQueries } from "react-query";
import {
  getAttendStudents,
  getClassDetailData,
  updateAttendStudents,
} from "src/apis/class-module";
import { format } from "date-fns";
import { combineStrings, slideFromEnd } from "src/libs";
import PrimaryInputCheckbox from "../common/PrimaryInputCheckbox";
import { toast } from "react-toastify";

const TOAST_UPDATE_ATTENTDANT = "TOAST_ATTENTDANT_ID";

function AttendantDetail() {
  const [classroomDetail, setClassroomDetail] = useState(undefined);
  const location = useLocation();
  const { id } = useParams();
  const params = new URLSearchParams(location.search);
  const classId = params.get("classId");
  const currentDate = params.get("date");
  const start = params.get("start");
  const end = params.get("end");
  const [attendDetail, setAttendDetail] = useState(undefined);
  const navigate = useNavigate();

  useQueries([
    {
      queryKey: ["getClassDetail", classId],
      queryFn: async () => {
        const response = await getClassDetailData(classId);
        setClassroomDetail(response?.data?.data);
        return response?.data;
      },
      enabled: !!classId,
    },
    {
      queryKey: ["getAttendStudents", id],
      queryFn: async () => {
        const response = await getAttendStudents(id);
        setAttendDetail(response?.data?.data);
        return response?.data;
      },
      enabled: !!id,
    },
  ]);

  const createOrderRequestMutation = useMutation(
    async (newData) => {
      return await updateAttendStudents(newData);
    },
    {
      onSuccess: (data) => {
        console.log("Data: ", data);
        if (data?.status >= 200 && data?.status < 300) {
          toast.success("Update attendant successfully");
          toast.dismiss(TOAST_UPDATE_ATTENTDANT);
        } else {
          toast.error(
            // @ts-ignore
            combineStrings(data?.response?.data?.errors) ||
              // @ts-ignore
              combineStrings(data?.response?.data?.message) ||
              // @ts-ignore
              combineStrings(data?.message) ||
              "Oops! Something went wrong..."
          );
          toast.dismiss(TOAST_UPDATE_ATTENTDANT);
        }
      },
      onError: (err) => {
        toast.error(
          // @ts-ignore
          err?.response?.data?.message || err?.message || "Create error"
        );
        toast.dismiss(TOAST_UPDATE_ATTENTDANT);
      },
    }
  );

  const handleAttentdantRequest = () => {
    toast.loading("Sending request...", {
      toastId: TOAST_UPDATE_ATTENTDANT,
    });
    console.log("Send attend: ", attendDetail);
    createOrderRequestMutation.mutate(attendDetail);
  };

  return (
    <div className="bg-white block-border">
      <ProfileHeader title="Take attendant" />
      <div className="grid mt-5 grid-cols-2080">
        <div>Class Name:</div>
        <div>{classroomDetail?.className}</div>
        <div>Date:</div>
        <div className="flex items-center gap-4">
          <div>
            {currentDate ? format(new Date(currentDate), "dd-MM-yyyy") : "---"}
          </div>
          <div>From {slideFromEnd(start, -3)}</div>
          <div>to {slideFromEnd(end, -3)}</div>
        </div>
      </div>
      <div className="mt-5">
        <div className="grid pb-2 mb-2 border-b grid-cols-155530 border-b-gray">
          <div>Avatar</div>
          <div>Full Name</div>
          <div>Checkbox</div>
        </div>
        {attendDetail?.map((item, index) => (
          <AttentdantItem
            key={index}
            data={item}
            attendDetail={attendDetail}
            setAttendDetail={setAttendDetail}
          />
        ))}
      </div>
      <div className="flex items-center justify-end gap-3 mt-8">
        <PrimaryBtn onClick={handleAttentdantRequest} className="!w-[120px]">
          Save
        </PrimaryBtn>
        <SecondaryBtn
          onClick={() => {
            navigate(-1);
          }}
          className="!w-[120px]"
        >
          Cancel
        </SecondaryBtn>
      </div>
    </div>
  );
}

export default AttendantDetail;

function AttentdantItem({ data, attendDetail, setAttendDetail }) {
  const isChecked = attendDetail?.find(
    (item) => item?.studentId === data?.studentId
  )?.attentdent;

  const handleClickCheckbox = () => {
    const updatedList = attendDetail?.map((item) => {
      if (item?.studentId === data?.studentId) {
        return {
          ...item,
          attentdent: item.attentdent === 1 ? 0 : 1,
        };
      }
      return item;
    });

    setAttendDetail(updatedList);
  };

  return (
    <div className="grid items-center grid-cols-155530">
      <div>
        <img
          className="w-[60px] h-[60px] object-cover"
          src={data?.userAvatar || "/images/logo-default.png"}
        />
      </div>
      <div>{data?.fullName}</div>
      <div>
        <PrimaryInputCheckbox
          onChange={handleClickCheckbox}
          checked={isChecked}
        />
      </div>
    </div>
  );
}
