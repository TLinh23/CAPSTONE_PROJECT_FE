import React, { useState } from "react";
import Table from "../common/Table";
import { useMutation, useQueries, useQueryClient } from "react-query";
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
import { STUDENT_STATUS } from "src/constants/constants";
import RenderStatus from "../common/RenderStatus";
import { combineStrings } from "src/libs";

function ListStudentInClassroom() {
  const [classRoomDetail, setClassRoomDetail] = useState(undefined);
  const { id } = useParams();
  useQueries([
    {
      queryKey: ["getListStudents"],
      queryFn: async () => {
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

      <div className="mt-5 bg-white table-style block-border">
        <Table
          pageSizePagination={100}
          columns={columns}
          data={classRoomDetail?.studentInformationDto || []}
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
        Header: "Status",
        accessor: (data) => (
          <RenderStatus status={data?.statusClassMember}>
            {data?.statusClassMember === "CREATED" ? "Created" : "Suspended"}
          </RenderStatus>
        ),
      },
      {
        Header: "Action",
        accessor: (data) => <RenderAction data={data} />,
      },
    ],
  },
];

const RenderAction = ({ data }) => {
  const queryClient = useQueryClient();
  const [showDialog, setShowDialog] = useState(false);
  const [showDeleDialog, setShowDeleDialog] = useState(false);
  const { id } = useParams();

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
          queryClient.invalidateQueries("getListStudents");
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
    // @ts-ignore
    deleteStudentMutation.mutate({
      classId: Number(id),
      studentId: data?.studentId,
    });
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
        <div className="flex items-center justify-end gap-5 mt-10">
          <DeniedBtn onClick={handleDeleteStudent} className="max-w-[160px]">
            Delete
          </DeniedBtn>
          <SecondaryBtn
            onClick={() => {
              setShowDeleDialog(false);
            }}
            className="max-w-[160px]"
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
