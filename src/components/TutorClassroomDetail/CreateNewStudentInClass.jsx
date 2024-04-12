import React, { useState } from "react";
import ProfileHeader from "../Profile/ProfileHeader";
import PrimaryInput from "../common/PrimaryInput";
import PrimaryBtn from "../common/PrimaryBtn";
import PrimaryInputCheckbox from "../common/PrimaryInputCheckbox";
import { useMutation, useQueries } from "react-query";
import useDebounce from "src/hooks/useDebounce";
import { useNavigate, useParams } from "react-router-dom";
import {
  addStudentIntoClass,
  getListStudentInClass,
} from "src/apis/class-module";
import { toast } from "react-toastify";

function CreateNewStudentInClass() {
  const [listStudents, setListStudents] = useState(undefined);
  const [searchParam, setSearchParam] = useState("");
  const debounceSearchValue = useDebounce(searchParam, 300);
  const [listAddStudent, setListAddStudent] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  useQueries([
    {
      queryKey: ["getListStudents", debounceSearchValue],
      queryFn: async () => {
        const queryObj = {};
        queryObj["PagingRequest.CurrentPage"] = 1;
        queryObj["PagingRequest.PageSize"] = 20;
        if (debounceSearchValue) {
          queryObj["SearchWord"] = debounceSearchValue;
        }

        const response = await getListStudentInClass(queryObj);
        setListStudents(response?.data?.data);
        return response?.data;
      },
      enabled: !!debounceSearchValue,
    },
  ]);

  const createNewStudentMutation = useMutation(
    async (newData) => {
      console.log("newData: ", newData);
      return await addStudentIntoClass(newData);
    },
    {
      onSuccess: (data) => {
        console.log("Data: ", data);
        if (data?.status >= 200 && data?.status < 300) {
          toast.success("Add student successfully");
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
          err?.response?.data?.message || err?.message || "Update error"
        );
      },
    }
  );

  const handleClickAddToClass = () => {
    console.log("listAddStudent: ", listAddStudent);
    const listSubmitStudent = listAddStudent.map((student, index) => ({
      id: index,
      classId: Number(id),
      studentId: student?.studentId,
      status: student?.status,
    }));
    // @ts-ignore
    createNewStudentMutation.mutate(listSubmitStudent);
  };

  return (
    <div>
      <ProfileHeader title="Add Student to Class" />
      <div className="mt-5 bg-white block-border">
        <div className="p-3 border rounded-md border-gray grid-cols-37">
          <div className="grid gap-3 grid-cols-37">
            <div>Parent Phone:</div>
            <PrimaryInput
              value={searchParam || ""}
              onChange={(e) => {
                setSearchParam(e.target.value);
              }}
              placeholder="Enter parent phone"
            />
          </div>
        </div>
        <div className="p-3 mt-5">
          <div className="py-[14px] flex items-center gap-5 bg-[#2f8de415]">
            <p className="w-[5%] flex justify-center"></p>
            <p className="w-[7%] text-sm text-gray">No</p>
            <p className="w-[25%] text-sm text-gray">Student Name</p>
            <p className="w-[23%] text-sm text-gray">Parent Name</p>
            <p className="w-[12%] text-sm text-gray text-center">
              Student Level
            </p>
            <p className="w-[26%] text-sm text-gray">Student Phone</p>
          </div>
          {listStudents?.items?.map((item, index) => (
            <ListItem
              key={index}
              data={item}
              index={index}
              listAddStudent={listAddStudent}
              setListAddStudent={setListAddStudent}
            />
          ))}
          <div className="flex justify-center mt-5">
            <PrimaryBtn
              onClick={handleClickAddToClass}
              className="mt-3 !w-[250px]"
            >
              Add to Class
            </PrimaryBtn>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateNewStudentInClass;

function ListItem({ data, index, listAddStudent, setListAddStudent }) {
  const isChecked = listAddStudent.some(
    (item) => item?.studentId === data?.studentId
  );

  const handleClickCheckbox = () => {
    const updatedList = isChecked
      ? listAddStudent.filter((item) => item?.studentId !== data?.studentId)
      : [...listAddStudent, data];

    setListAddStudent(updatedList);
  };

  return (
    <div className="flex items-center gap-5 rounded-lg hover:bg-zinc-100 active:bg-zinc-300 py-[12px]">
      <div className="w-[5%] flex justify-center">
        <PrimaryInputCheckbox
          onChange={handleClickCheckbox}
          checked={isChecked}
        />
      </div>
      <p className="w-[7%] text-sm">{index + 1}</p>
      <p className="w-[25%] text-sm truncate-2-line">{data?.fullName}</p>
      <p className="w-[23%] text-sm truncate-2-line">{data?.parentName}</p>
      <p className="w-[12%] text-sm truncate-2-line text-center">
        {data?.studentLevel}
      </p>
      <p className="w-[26%] text-sm truncate-2-line">{data?.phone}</p>
    </div>
  );
}
