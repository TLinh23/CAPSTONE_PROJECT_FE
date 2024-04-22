import React, { useState } from "react";
import Layout from "../../layout/Layout";
import Title from "../../common/Title";
import PrimaryBtn from "../../common/PrimaryBtn";
import FilterDropDown from "src/components/common/FilterDropDown";
import PrimaryInput from "../../common/PrimaryInput";
import PrimaryTextArea from "src/components/common/PrimaryTextArea";
import { useMutation, useQueries } from "react-query";
import { useAuthContext } from "src/context/AuthContext";
import { ROLE_NAME } from "src/constants/constants";
import {
  addNewEvaluation,
  getClassByTutor,
  getClassDetailData,
} from "src/apis/class-module";
import ClassNameFilterDropdown from "src/components/common/ClassNameFilterDropdown";
import { toast } from "react-toastify";
import { format } from "date-fns";
import HeaderDetail from "src/components/common/HeaderDetail";
import ProfileHeader from "src/components/Profile/ProfileHeader";

function AddAssessment() {
  const { roleKey, userId } = useAuthContext();
  const [newTransactionDetail, setNewTransactionDetail] = useState(undefined);
  const [listClassroom, setListClassroom] = useState(undefined);
  const [classRoomSelected, setClassRoomSelected] = useState(undefined);
  const [listStudent, setListStudent] = useState(undefined);
  const [studentSelected, setStudentSelected] = useState(undefined);

  useQueries([
    {
      queryKey: ["getListClassRooms"],
      queryFn: async () => {
        if (roleKey === ROLE_NAME.TUTOR) {
          const queryObj = {};
          queryObj["PagingRequest.CurrentPage"] = 1;
          queryObj["PagingRequest.PageSize"] = 99;
          queryObj["TutorId"] = userId;
          queryObj["Status"] = "ACTIVE";
          const response = await getClassByTutor(queryObj);
          setListClassroom(response?.data?.data);
          return response?.data;
        }
      },
      enabled: !!userId,
    },
    {
      queryKey: ["getListStudents", classRoomSelected],
      queryFn: async () => {
        if (classRoomSelected) {
          const response = await getClassDetailData(classRoomSelected?.classId);
          setListStudent(response?.data?.data?.studentInformationDto);
          return response?.data;
        }
      },
      enabled: !!classRoomSelected,
    },
  ]);

  const addEvaluationMutation = useMutation(
    async (newData) => {
      console.log("newData: ", newData);
      return await addNewEvaluation(newData);
    },
    {
      onSuccess: (data) => {
        console.log("Data: ", data);
        if (data?.status >= 200 && data?.status < 300) {
          toast.success("Create successfully");
        } else {
          toast.error(
            data?.message ||
              data?.response?.data?.message ||
              data?.response?.data ||
              "Oops! Something went wrong..."
          );
        }
      },
      onError: (err) => {
        toast.error(
          // @ts-ignore
          err?.response?.data?.message || err?.message || "Create error"
        );
      },
    }
  );

  const handleClickCreateAssessment = () => {
    const queryObj = {
      ClassId: classRoomSelected?.classId,
      StudentId: studentSelected?.studentId,
      Status: "CREATED",
      ...newTransactionDetail,
    };
    console.log("queryObj: ", queryObj);
    addEvaluationMutation.mutate(queryObj);
  };
  return (
    <Layout>
      <div className="bg-white block-border">
        <ProfileHeader title="Add New Assessment" />
        <div className="grid grid-cols-37 max-w-[1000px] mt-5 gap-x-5 gap-y-3 items-center">
          <div>
            Class <span className="text-red-500">*</span>
          </div>
          <ClassNameFilterDropdown
            listDropdown={listClassroom?.items}
            showing={classRoomSelected}
            setShowing={setClassRoomSelected}
            textDefault="Select Class"
          />
          <div>
            Student <span className="text-red-500">*</span>
          </div>
          <FilterDropDown
            listDropdown={listStudent}
            showing={studentSelected}
            setShowing={setStudentSelected}
            textDefault={
              classRoomSelected ? "Select Student" : "Select class first"
            }
          />
          <div>
            Score <span className="text-red-500">*</span>
          </div>
          <PrimaryInput
            placeholder="Enter score rate"
            type="number"
            onChange={(e) => {
              setNewTransactionDetail({
                ...newTransactionDetail,
                Score: Number(e.target.value),
              });
            }}
            value={newTransactionDetail?.Score || ""}
          />
          {/* <div>Date</div>
          <PrimaryInput
            placeholder="Enter score rate"
            type="date"
            value={
              newTransactionDetail?.Date
                ? format(new Date(newTransactionDetail?.Date), "yyyy-MM-dd")
                : ""
            }
            onChange={(e) => {
              const selectedDate = e.target.value;
              const currentDate = new Date().toISOString().slice(0, 10);
              if (selectedDate > currentDate) {
                setNewTransactionDetail({
                  ...newTransactionDetail,
                  Date: currentDate,
                });
              } else {
                setNewTransactionDetail({
                  ...newTransactionDetail,
                  Date: selectedDate,
                });
              }
            }}
          /> */}
          <div>Comment</div>
          <PrimaryTextArea
            rows={5}
            placeholder="Enter comment"
            onChange={(e) => {
              setNewTransactionDetail({
                ...newTransactionDetail,
                Comment: e.target.value,
              });
            }}
            value={newTransactionDetail?.Comment || ""}
          />
        </div>
        <div className="max-w-[1000px] flex justify-center items-center mt-10">
          <PrimaryBtn
            disabled={
              !classRoomSelected ||
              !studentSelected ||
              !newTransactionDetail?.Score
            }
            onClick={handleClickCreateAssessment}
            className="!w-[200px]"
          >
            Create
          </PrimaryBtn>
        </div>
      </div>
    </Layout>
  );
}

export default AddAssessment;
