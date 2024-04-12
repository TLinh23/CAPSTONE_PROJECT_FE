import React, { useState } from "react";
import useDebounce from "src/hooks/useDebounce";
import Table from "../common/Table";
import { useMutation, useQueries } from "react-query";
import DeniedBtn from "../common/DeniedBtn";
import ProfileHeader from "../Profile/ProfileHeader";
import PrimaryBtn from "../common/PrimaryBtn";
import { Link, useParams } from "react-router-dom";
import {
  deleteStudentOutOfClass,
  getClassDetailData,
} from "src/apis/class-module";
import ShowPasswordIcon from "../icons/ShowPasswordIcon";
import PopupTemplate from "../common/PopupTemplate";
import PrimaryInput from "../common/PrimaryInput";
import SecondaryBtn from "../common/SecondaryBtn";
import { toast } from "react-toastify";

function ListStudentInClassroom() {
  const [classRoomDetail, setClassRoomDetail] = useState(undefined);
  const [searchParam, setSearchParam] = useState("");
  const debouncedSearchValue = useDebounce(searchParam, 500);
  const { id } = useParams();
  useQueries([
    {
      queryKey: ["getListStudents", debouncedSearchValue],
      queryFn: async () => {
        const queryObj = {};
        if (debouncedSearchValue) {
          queryObj["search"] = debouncedSearchValue;
        }

        // change your api request
        const response = await getClassDetailData(id);
        setClassRoomDetail(response?.data?.data);
        return response?.data;
      },
    },
  ]);

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <ProfileHeader title="List Student" />
        <Link to={`/tutor-classrooms/${id}/students/create`}>
          <PrimaryBtn>Add new Student</PrimaryBtn>
        </Link>
      </div>
      {/* <div className="flex flex-col gap-4 py-5 md:items-center md:flex-row md:justify-end">
        <SearchInput
          placeholder="Search by name"
          onChange={(e) => setSearchParam(e.target.value)}
          value={searchParam || ""}
        />
      </div> */}

      <div className="mt-5 bg-white table-style block-border">
        <Table
          pageSizePagination={20}
          columns={columns}
          data={classRoomDetail?.studentInformationDto}
        />
      </div>
    </div>
  );
}

export default ListStudentInClassroom;

const columns = [
  {
    Header: " ",
    columns: [
      {
        Header: "No",
        accessor: (data, index) => <p>{index + 1}</p>,
      },
      {
        Header: "Full Name",
        accessor: (data) => <p>{data?.fullName}</p>,
      },
      {
        Header: "Gender",
        accessor: (data) => <p>{data?.gender}</p>,
      },
      {
        Header: "Phone",
        accessor: (data) => <p>{data?.phone}</p>,
      },
      {
        Header: "Address",
        accessor: (data) => <p>{data?.address}</p>,
      },
      {
        Header: "Action",
        accessor: (data) => <RenderAction data={data} />,
      },
    ],
  },
];

const RenderAction = ({ data }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [showDeleDialog, setShowDeleDialog] = useState(false);

  const deleteStudentMutation = useMutation(
    async (newData) => {
      console.log("newData: ", newData);
      return await deleteStudentOutOfClass(newData);
    },
    {
      onSuccess: (data) => {
        console.log("Data: ", data);
        if (data?.status >= 200 && data?.status < 300) {
          toast.success("Delete student successfully");
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

  const handleDeleteStudent = () => {
    console.log("Handle delete");
  };

  return (
    <div className="flex items-center gap-4">
      <PopupTemplate
        title="Student Detail"
        setShowDialog={setShowDialog}
        showDialog={showDialog}
        classNameWrapper="md:min-w-[486px]"
      >
        <div className="grid items-start gap-3 grid-cols-37">
          <img
            src={data?.userAvatar || "/images/logo-default.png"}
            className="object-cover w-full rounded aspect-square"
          />
          <div className="flex flex-col gap-3">
            <PrimaryInput
              title="Full Name"
              className="w-full"
              readOnly
              value={data?.fullName || ""}
            />
            <PrimaryInput
              title="Gender"
              className="w-full"
              readOnly
              value={data?.gender || ""}
            />
            <PrimaryInput
              title="Phone"
              className="w-full"
              readOnly
              value={data?.phone || ""}
            />
            <PrimaryInput
              title="Address"
              className="w-full"
              readOnly
              value={data?.address || ""}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <PrimaryBtn
            onClick={() => {
              setShowDialog(false);
            }}
            className="max-w-[160px] mt-5"
          >
            Close
          </PrimaryBtn>
        </div>
      </PopupTemplate>

      <ShowPasswordIcon
        onClick={() => {
          setShowDialog(true);
        }}
        className="cursor-pointer"
      />

      <PopupTemplate
        title="Delete Student"
        setShowDialog={setShowDeleDialog}
        showDialog={showDeleDialog}
        classNameWrapper="md:min-w-[486px]"
      >
        <div>
          Do you want to delete this student {data?.fullName} out of class
        </div>
        <div className="flex items-center justify-end">
          <SecondaryBtn
            onClick={handleDeleteStudent}
            className="max-w-[160px] mt-5"
          >
            Save
          </SecondaryBtn>
          <SecondaryBtn
            onClick={() => {
              setShowDeleDialog(false);
            }}
            className="max-w-[160px] mt-5"
          >
            Close
          </SecondaryBtn>
        </div>
      </PopupTemplate>

      <DeniedBtn
        className="!w-fit !py-1"
        onClick={() => {
          setShowDeleDialog(true);
        }}
      >
        Delete
      </DeniedBtn>
    </div>
  );
};
