import React, { useState } from "react";
import Line from "src/components/common/Line";
import { useMutation, useQueries } from "react-query";
import { createOrderRequest } from "src/apis/order-module";
import { toast } from "react-toastify";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PrimaryBtn from "src/components/common/PrimaryBtn";
import SmallTitle from "src/components/common/SmallTitle";
import PrimaryInput from "src/components/common/PrimaryInput";
import FilterDropDown from "src/components/common/FilterDropDown";
import ProfileHeader from "src/components/Profile/ProfileHeader";
import { getClassDetailData } from "src/apis/class-module";
import { getProfileByIdDetail, getProfileDetail } from "src/apis/tutor-module";
import { getListSubjects } from "src/apis/subject-module";
import { CLASS_REQUEST_TYPE, STUDENT_LEVEL } from "src/constants/enumConstant";
import { useAuthContext } from "src/context/AuthContext";

const TOAST_CREATE_ORDER_REQUEST = "toast-create-order-request-id";

const EXCLUDED_KEY = [];

function CreateOrderRequest() {
  const { userId } = useAuthContext();
  const [newOrderRequest, setNewOrderRequest] = useState(undefined);
  const [studentSelected, setStudentSelected] = useState(undefined);
  const navigate = useNavigate();
  const [classRoomDetail, setClassRoomDetail] = useState(undefined);
  const { search } = useLocation();
  const { requestType, tutorId, classId } = Object.fromEntries(
    new URLSearchParams(search)
  );
  const [tutorProfileDetail, setTutorProfileDetail] = useState(undefined);
  const [listAllSubjects, setListAllSubjects] = useState(undefined);
  const [subjectRequestSelected, setSubjectRequestSelected] =
    useState(undefined);
  const [profileDetail, setProfileDetail] = useState(undefined);
  const [studentLevelSelected, setStudentLevelSelected] = useState(undefined);

  useQueries([
    {
      queryKey: ["getClassDetail", classId],
      queryFn: async () => {
        const response = await getClassDetailData(classId);
        setClassRoomDetail(response?.data?.data);
        return response?.data;
      },
      enabled: !!classId,
    },
    {
      queryKey: ["getProfileById", tutorId],
      queryFn: async () => {
        if (tutorId) {
          const response = await getProfileByIdDetail(tutorId);
          setTutorProfileDetail(response?.data?.data);
          return response?.data;
        }
      },
      enabled: !!tutorId,
    },
    {
      queryKey: ["getListSubjects"],
      queryFn: async () => {
        const queryObj = {};
        queryObj["PagingRequest.CurrentPage"] = 1;
        queryObj["PagingRequest.PageSize"] = 99;
        queryObj["Status"] = "CREATED";

        const response = await getListSubjects(queryObj);
        setListAllSubjects(response?.data?.data);
        return response?.data;
      },
    },
    {
      queryKey: ["getStudentsData"],
      queryFn: async () => {
        const response = await getProfileDetail();
        setProfileDetail(response?.data?.data);
        return response?.data;
      },
    },
  ]);

  const createOrderRequestMutation = useMutation(
    async (newData) => {
      return await createOrderRequest(newData);
    },
    {
      onSuccess: (data) => {
        console.log("Data: ", data);
        if (data?.status >= 200 && data?.status < 300) {
          toast.success("Create order request successfully");
          navigate("/classroom-requests");
          toast.dismiss(TOAST_CREATE_ORDER_REQUEST);
        } else {
          toast.error(
            data?.message ||
              data?.response?.data?.message ||
              data?.response?.data ||
              "Oops! Something went wrong..."
          );
          toast.dismiss(TOAST_CREATE_ORDER_REQUEST);
        }
      },
      onError: (err) => {
        toast.error(
          // @ts-ignore
          err?.response?.data?.message || err?.message || "Create error"
        );
        toast.dismiss(TOAST_CREATE_ORDER_REQUEST);
      },
    }
  );

  const handleSendData = () => {
    toast.loading("Sending request...", {
      toastId: TOAST_CREATE_ORDER_REQUEST,
    });
    if (!studentSelected) {
      toast.error("Please select your student!");
      return;
    }
    if (!newOrderRequest?.Price && !classRoomDetail?.price) {
      toast.error("Please type price!");
      return;
    }
    if (!studentLevelSelected && !classRoomDetail?.classLevel) {
      toast.error("Please choose class level!");
      return;
    }
    if (!subjectRequestSelected && !classRoomDetail?.subjectName) {
      toast.error("Please select subject!");
      return;
    }

    const openClassRequestObj = {
      RequestType: CLASS_REQUEST_TYPE.OPEN,
      ParentId: Number(userId),
      TutorId: Number(tutorId),
      StudentId: Number(studentSelected?.studentId),
      Level: Number(studentLevelSelected?.key),
      Price: newOrderRequest?.Price,
      SubjectId: Number(subjectRequestSelected?.subjectId),
    };
    const joinClassRequestObj = {
      RequestType: CLASS_REQUEST_TYPE.JOIN,
      ParentId: Number(userId),
      TutorId: Number(tutorId),
      StudentId: Number(studentSelected?.studentId),
      Level: Number(classRoomDetail?.classLevel),
      Price: classRoomDetail?.price,
      ClassId: Number(classId),
      SubjectId: Number(classRoomDetail?.subjectId),
    };
    if (requestType === CLASS_REQUEST_TYPE.OPEN) {
      const formData = new FormData();
      for (const key in openClassRequestObj) {
        const value = openClassRequestObj[key];
        const isExcludedKey = EXCLUDED_KEY.includes(key);

        if (isExcludedKey || !value) {
          continue;
        }

        formData.append(key, value);
      }
      console.log("openClassRequestObj====: ", openClassRequestObj);
      // @ts-ignore
      createOrderRequestMutation.mutate(formData);
    } else {
      const formData = new FormData();
      for (const key in joinClassRequestObj) {
        const value = joinClassRequestObj[key];
        const isExcludedKey = EXCLUDED_KEY.includes(key);

        if (isExcludedKey || !value) {
          continue;
        }

        formData.append(key, value);
      }
      console.log("joinClassRequestObj====: ", joinClassRequestObj);
      // @ts-ignore
      createOrderRequestMutation.mutate(formData);
    }
  };

  return (
    <div>
      <ProfileHeader title="Create Order Request" />
      <Line className="my-3" />
      <div className="bg-white block-border">
        <SmallTitle>Request Info</SmallTitle>
        <div className="md:max-w-[860px] mt-5">
          <div className="grid gap-4 grid-cols-2080">
            <div>Tutor</div>
            <div>{tutorProfileDetail?.fullName}</div>
            {requestType === CLASS_REQUEST_TYPE.JOIN && (
              <>
                <div>Class Name</div>
                <div>{classRoomDetail?.className}</div>
              </>
            )}
            <div>
              Subject <span className="text-dangerous">*</span>
            </div>
            <FilterDropDown
              listDropdown={listAllSubjects?.items || []}
              showing={subjectRequestSelected}
              setShowing={setSubjectRequestSelected}
              textDefault={
                classRoomDetail?.subjectName ||
                "Select the subject you want to open"
              }
              disabled={requestType === CLASS_REQUEST_TYPE.JOIN}
            />
            <div>
              Student <span className="text-dangerous">*</span>
            </div>
            <FilterDropDown
              listDropdown={profileDetail?.students || []}
              showing={studentSelected}
              setShowing={setStudentSelected}
              textDefault="Select your student"
            />
            <div>Request Type</div>
            <PrimaryInput value={requestType} readOnly />
            <div>
              Level <span className="text-dangerous">*</span>
            </div>

            <FilterDropDown
              textDefault={classRoomDetail?.classLevel || "Select class level"}
              listDropdown={STUDENT_LEVEL}
              showing={studentLevelSelected}
              setShowing={setStudentLevelSelected}
              disabled={requestType === CLASS_REQUEST_TYPE.JOIN}
            />
            <div>
              Price <span className="text-dangerous">*</span>
            </div>
            <PrimaryInput
              onChange={(e) => {
                setNewOrderRequest({
                  ...newOrderRequest,
                  Price: e.target.value,
                });
              }}
              value={newOrderRequest?.Price || classRoomDetail?.price || ""}
              readOnly={requestType === CLASS_REQUEST_TYPE.JOIN}
              type="number"
            />
          </div>
          <div className="flex items-center justify-center gap-3 mt-5">
            <PrimaryBtn onClick={handleSendData} className="max-w-[200px]">
              Send
            </PrimaryBtn>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateOrderRequest;
