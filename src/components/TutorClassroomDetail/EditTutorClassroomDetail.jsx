import React, { useEffect, useState } from "react";
import ProfileHeader from "../Profile/ProfileHeader";
import PrimaryInput from "../common/PrimaryInput";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueries } from "react-query";
import {
  createClassDetail,
  editClassDetail,
  getClassDetailData,
} from "src/apis/class-module";
import FilterDropDown from "../common/FilterDropDown";
import { DAYS_OF_WEEK, STUDENT_LEVEL } from "src/constants/enumConstant";
import { getListSubjects } from "src/apis/subject-module";
import PrimaryTextArea from "../common/PrimaryTextArea";
import Line from "../common/Line";
import SecondaryBtn from "../common/SecondaryBtn";
import AddPlusIcon from "../icons/AddPlusIcon";
import GarbageIcon from "../icons/GarbageIcon";
import { toast } from "react-toastify";
import { getValueFromKey } from "src/libs";
import PrimaryBtn from "../common/PrimaryBtn";
import { useAuthContext } from "src/context/AuthContext";
import { format } from "date-fns";

const TOAST_EDIT_CLASSROOM = "toast-edit-classroom-id";

const EXCLUDED_KEY = [
  "schedules",
  "studentInformationDto",
  "subjectName",
  "tutorName",
];

function EditTutorClassroomDetail() {
  const [classRoomDetail, setClassRoomDetail] = useState(undefined);
  const { id } = useParams();
  const [studentLevelSelected, setStudentLevelSelected] = useState(undefined);
  const [listAllSubject, setListAllSubject] = useState(undefined);
  const [subjectSelected, setSubjectSelected] = useState(undefined);
  const [listLevels, setListLevels] = useState([]);
  const { userId } = useAuthContext();
  const navigate = useNavigate();
  useQueries([
    {
      queryKey: ["getClassDetail", id],
      queryFn: async () => {
        const response = await getClassDetailData(id);
        setClassRoomDetail(response?.data?.data);
        setListLevels(response?.data?.data?.schedules);
        return response?.data;
      },
      enabled: !!id,
    },
    {
      queryKey: ["getListSubjects"],
      queryFn: async () => {
        const queryObj = {};
        queryObj["PagingRequest.CurrentPage"] = 1;
        queryObj["PagingRequest.PageSize"] = 20;
        queryObj["Status"] = "CREATED";

        const response = await getListSubjects(queryObj);
        setListAllSubject(response?.data?.data);
        return response?.data;
      },
    },
  ]);

  useEffect(() => {
    if (studentLevelSelected) {
      setClassRoomDetail({
        ...classRoomDetail,
        classLevel: studentLevelSelected?.value,
      });
    }
  }, [studentLevelSelected]);

  useEffect(() => {
    if (subjectSelected) {
      setClassRoomDetail({
        ...classRoomDetail,
        subjectId: subjectSelected?.subjectId,
        subjectName: subjectSelected?.subjectName,
      });
    }
  }, [subjectSelected]);

  const editClassroomMutation = useMutation(
    async (newData) => {
      return await editClassDetail(newData);
    },
    {
      onSuccess: (data) => {
        console.log("Data: ", data);
        if (data?.status >= 200 && data?.status < 300) {
          toast.success("Edit classroom successfully");
          navigate("/tutor-classrooms");
          toast.dismiss(TOAST_EDIT_CLASSROOM);
        } else {
          toast.error(
            data?.message ||
              data?.response?.data?.message ||
              data?.response?.data ||
              "Oops! Something went wrong..."
          );
          toast.dismiss(TOAST_EDIT_CLASSROOM);
        }
      },
      onError: (err) => {
        toast.error(
          // @ts-ignore
          err?.response?.data?.message || err?.message || "Create error"
        );
        toast.dismiss(TOAST_EDIT_CLASSROOM);
      },
    }
  );

  const handleEditClassroom = () => {
    const queryObj = {
      ...classRoomDetail,
      tutorId: Number(userId),
      classId: Number(id),
      status: "ACTIVE",
      updateScheduleDto: listLevels,
    };
    EXCLUDED_KEY.forEach((key) => delete queryObj[key]);
    console.log("Here is data send to BE", queryObj);
    toast.loading("Sending request...", {
      toastId: TOAST_EDIT_CLASSROOM,
    });
    editClassroomMutation.mutate(queryObj);
  };

  return (
    <div className="bg-[#ffffff] block-border">
      <div className="flex items-center justify-between gap-4 mb-5">
        <ProfileHeader title="Edit Classroom Detail" />
        <PrimaryBtn className="!w-[120px]" onClick={handleEditClassroom}>
          Save
        </PrimaryBtn>
      </div>
      <div>
        <PrimaryInput
          title="Classroom Name"
          onChange={(e) => {
            setClassRoomDetail({
              ...classRoomDetail,
              className: e.target.value,
            });
          }}
          value={classRoomDetail?.className || ""}
        />
        <div className="grid grid-cols-2 gap-5 mt-5">
          <FilterDropDown
            title="Subject"
            textDefault={classRoomDetail?.subjectName || "Select subject"}
            listDropdown={listAllSubject?.items}
            showing={subjectSelected}
            setShowing={setSubjectSelected}
          />
          <FilterDropDown
            title="Level"
            textDefault={classRoomDetail?.classLevel || "Select class level"}
            listDropdown={STUDENT_LEVEL}
            showing={studentLevelSelected}
            setShowing={setStudentLevelSelected}
          />
        </div>
        <PrimaryTextArea
          className="mt-5"
          title="Description"
          onChange={(e) => {
            setClassRoomDetail({
              ...classRoomDetail,
              classDesc: e.target.value,
            });
          }}
          rows={3}
          value={classRoomDetail?.classDesc || ""}
        />
      </div>
      <Line className="my-5" />
      <div>
        {listLevels?.length > 0 && (
          <div className="max-h-[276px] overflow-y-auto my-2">
            {listLevels.map((i, index) => (
              <TableLevelRow
                key={`level-row-${index}`}
                data={i}
                itemIndex={index}
                listLevels={listLevels}
                setListLevels={setListLevels}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default EditTutorClassroomDetail;

function TableLevelRow({ data, listLevels, setListLevels, itemIndex }) {
  const handleDateChange = (e) => {
    const newDate = e.target.value;
    const currentDate = new Date().toISOString().split("T")[0];

    const selectedDate = new Date(newDate);
    const currentDateTime = new Date(currentDate);
    const newListLevels = [...listLevels];
    if (selectedDate < currentDateTime) {
      newListLevels[itemIndex].date = currentDate;
    } else {
      newListLevels[itemIndex].date = newDate;
    }
    setListLevels(newListLevels);
  };

  const handleStartTimeChange = (e) => {
    const newListLevels = [...listLevels];
    newListLevels[itemIndex].sessionStart = e.target.value;
    setListLevels(newListLevels);
  };

  const handleEndTimeChange = (e) => {
    const newListLevels = [...listLevels];
    newListLevels[itemIndex].sessionEnd = e.target.value;
    setListLevels(newListLevels);
  };

  return (
    <div className="grid items-end gap-3 mt-3 grid-cols-502525">
      <div className="flex items-center gap-3">
        <h1>Schedule {itemIndex + 1}:</h1>
        <input
          type="date"
          value={data?.date ? format(new Date(data?.date), "yyyy-MM-dd") : ""}
          onChange={handleDateChange}
          min={new Date().toISOString().split("T")[0]}
          disabled={new Date(data?.date).getTime() < new Date().getTime()}
        />
      </div>
      <div className="flex items-center gap-3">
        <p>Start time</p>
        <input
          type="time"
          value={data?.sessionStart || ""}
          onChange={handleStartTimeChange}
          disabled={new Date(data?.date).getTime() < new Date().getTime()}
        />
      </div>
      <div className="flex items-center gap-3">
        <p>End time</p>
        <input
          type="time"
          value={data?.sessionEnd || ""}
          onChange={handleEndTimeChange}
          disabled={new Date(data?.date).getTime() < new Date().getTime()}
        />
      </div>
    </div>
  );
}
