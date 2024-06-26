import React from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createClassDetail } from "src/apis/class-module";
import PrimaryBtn from "src/components/common/PrimaryBtn";
import PrimaryInputCheckbox from "src/components/common/PrimaryInputCheckbox";
import PrimaryTextArea from "src/components/common/PrimaryTextArea";
import SmallTitle from "src/components/common/SmallTitle";
import { useAuthContext } from "src/context/AuthContext";
import { combineStrings } from "src/libs";

const TOAST_CREATE_CLASSROOM = "toast-create-classroom-id";

function TutorCreateClassroomConfirm(props) {
  const {
    classRoomDetail,
    setClassRoomDetail,
    isConfirmCreated,
    setIsConfirmCreated,
    listLevels,
  } = props;
  const navigate = useNavigate();
  const { userId } = useAuthContext();
  const createClassroomMutation = useMutation(
    async (newData) => {
      return await createClassDetail(newData);
    },
    {
      onSuccess: (data) => {
        console.log("Data: ", data);
        if (data?.status >= 200 && data?.status < 300) {
          toast.success("Create classroom successfully");
          navigate("/tutor-classrooms");
          toast.dismiss(TOAST_CREATE_CLASSROOM);
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
          toast.dismiss(TOAST_CREATE_CLASSROOM);
        }
      },
      onError: (err) => {
        toast.error(
          // @ts-ignore
          err?.response?.data?.message || err?.message || "Create error"
        );
        toast.dismiss(TOAST_CREATE_CLASSROOM);
      },
    }
  );

  const handleCreateClassroom = () => {
    if (!classRoomDetail?.className) {
      toast.error("Please fill classroom name");
      return;
    }
    if (!classRoomDetail?.classLevel) {
      toast.error("Please fill classroom level");
      return;
    }
    const queryObj = {
      ...classRoomDetail,
      tutorId: Number(userId),
      status: "ACTIVE",
      addScheduleDto: listLevels,
      startDate: new Date(),
    };
    console.log("Here is data send to BE", queryObj);
    toast.loading("Sending request...", {
      toastId: TOAST_CREATE_CLASSROOM,
    });
    createClassroomMutation.mutate(queryObj);
  };

  return (
    <div className="bg-white block-border">
      <SmallTitle className="!font-bold">Confirm</SmallTitle>
      <div className="max-w-[1200px] flex flex-col gap-5 mt-8">
        <PrimaryTextArea
          title="1. Description for classroom"
          onChange={(e) => {
            setClassRoomDetail({
              ...classRoomDetail,
              classDesc: e.target.value,
            });
          }}
          rows={6}
          value={classRoomDetail?.classDesc || ""}
        />
        <div>
          <p>2. Confirm</p>
          <PrimaryInputCheckbox
            className="mt-3"
            checked={isConfirmCreated}
            onChange={() => {
              setIsConfirmCreated(!isConfirmCreated);
            }}
            accessoriesRight={"I want to open this classroom"}
          />
        </div>
      </div>
      <div className="max-w-[1200px] flex gap-5 justify-center items-center mt-10">
        <PrimaryBtn
          disabled={!isConfirmCreated}
          onClick={handleCreateClassroom}
          className="!w-[160px]"
        >
          Create
        </PrimaryBtn>
      </div>
    </div>
  );
}

export default TutorCreateClassroomConfirm;
