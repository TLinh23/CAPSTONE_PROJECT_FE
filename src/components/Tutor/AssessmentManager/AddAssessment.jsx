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
import { toast } from "react-toastify";
import { format } from "date-fns";
import ProfileHeader from "src/components/Profile/ProfileHeader";
import { useLocation, useNavigate } from "react-router-dom";
import { slideFromEnd } from "src/libs";

function AddAssessment() {
  const [newTransactionDetail, setNewTransactionDetail] = useState(undefined);
  const [listStudent, setListStudent] = useState(undefined);
  const [studentSelected, setStudentSelected] = useState(undefined);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const classId = params.get("id");
  const [classDetail, setClassDetail] = useState(undefined);
  const [listScheduleDate, setListScheduleDate] = useState(undefined);
  const [scheduleSelected, setScheduleSelected] = useState(undefined);

  useQueries([
    {
      queryKey: ["getClassDetail", classId],
      queryFn: async () => {
        const response = await getClassDetailData(classId);
        setClassDetail(response?.data?.data);
        if (response?.data?.data?.schedules?.length > 0) {
          const formattedSchedules = response?.data?.data?.schedules?.map(
            (schedule) => {
              return {
                date: schedule.date,
                value: `${schedule.dayOfWeek} ${format(
                  new Date(schedule?.date),
                  "dd/MM/yyyy"
                )} - ${slideFromEnd(
                  schedule.sessionStart,
                  -3
                )} to ${slideFromEnd(schedule.sessionEnd, -3)}`,
              };
            }
          );
          setListScheduleDate(formattedSchedules);
        }
        return response?.data;
      },
      enabled: !!classId,
    },
    {
      queryKey: ["getListStudents", classId],
      queryFn: async () => {
        if (classId) {
          const response = await getClassDetailData(classId);
          setListStudent(response?.data?.data?.studentInformationDto);
          return response?.data;
        }
      },
      enabled: !!classId,
    },
  ]);

  const navigate = useNavigate();
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
          navigate(-1);
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
      ClassId: Number(classId),
      StudentId: studentSelected?.studentId,
      Date: new Date(scheduleSelected?.date).toDateString(),
      ...newTransactionDetail,
    };
    console.log("queryObj: ", queryObj);
    const formData = new FormData();
    for (const key in queryObj) {
      const value = queryObj[key];
      formData.append(key, value);
    }
    // @ts-ignore
    addEvaluationMutation.mutate(formData);
  };

  return (
    <Layout>
      <div className="bg-white block-border">
        <ProfileHeader title="Add New Assessment" />
        <div className="grid grid-cols-37 max-w-[1000px] mt-5 gap-x-5 gap-y-3 items-center">
          <div>
            Class <span className="text-red-500">*</span>
          </div>
          <PrimaryInput readOnly value={classDetail?.className || ""} />
          <div>
            Student <span className="text-red-500">*</span>
          </div>
          <FilterDropDown
            listDropdown={listStudent}
            showing={studentSelected}
            setShowing={setStudentSelected}
            textDefault={"Select Student"}
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
          <div>Date</div>
          <FilterDropDown
            listDropdown={listScheduleDate || []}
            showing={scheduleSelected}
            setShowing={setScheduleSelected}
            textDefault={"Select date"}
          />
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
              !studentSelected ||
              !newTransactionDetail?.Score ||
              !scheduleSelected
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
