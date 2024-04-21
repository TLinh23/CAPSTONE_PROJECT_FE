import React, { useState } from "react";
import { useMutation, useQueries, useQueryClient } from "react-query";
import { getListTodoWithObj } from "src/apis/tutor-module";
import FilterDropDown from "src/components/common/FilterDropDown";
import Pagination from "src/components/common/Pagination";
import SearchInput from "src/components/common/SearchInput";
import Table from "src/components/common/Table";
import Title from "src/components/common/Title";
import useDebounce from "src/hooks/useDebounce";
import PrimaryBtn from "src/components/common/PrimaryBtn";
import RenderStatus from "src/components/common/RenderStatus";
import SecondaryBtn from "../common/SecondaryBtn";
import { format } from "date-fns";
import { useAuthContext } from "src/context/AuthContext";
import { LIST_CLASS_FILTER, ROLE_NAME } from "src/constants/constants";
import {
  deleteClassroomByTutor,
  getClassByTutor,
  getListClass,
} from "src/apis/class-module";
import { Link } from "react-router-dom";
import DeniedBtn from "../common/DeniedBtn";
import { toast } from "react-toastify";
import EditIcon from "../icons/EditIcon";
import ShowDetail from "../common/ShowDetail";
import GarbageIcon from "../icons/GarbageIcon";
import PopupTemplate from "../common/PopupTemplate";

function ListOpenedClassRoom() {
  const { roleKey, userId } = useAuthContext();
  const [listClassroom, setListClassroom] = useState(undefined);
  const [searchParam, setSearchParam] = useState("");
  const debouncedSearchValue = useDebounce(searchParam, 500);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [statusSelected, setStatusSelected] = useState(undefined);

  useQueries([
    {
      queryKey: [
        "getListClass",
        page,
        limit,
        debouncedSearchValue,
        statusSelected,
      ],
      queryFn: async () => {
        const queryObj = {};
        queryObj["PagingRequest.CurrentPage"] = page;
        queryObj["PagingRequest.PageSize"] = limit;
        if (debouncedSearchValue) {
          queryObj["SearchWord"] = debouncedSearchValue;
        }
        if (statusSelected) {
          queryObj["Status"] = statusSelected?.key;
        }
        const response = await getListClass(queryObj);
        setListClassroom(response?.data?.data);
        return response?.data;
      },
      enabled: !!userId,
    },
  ]);

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <Title>My Classroom List</Title>
      </div>
      <div className="flex flex-col gap-4 py-5 md:items-center md:flex-row md:justify-end">
        <SearchInput
          placeholder="Search by name"
          onChange={(e) => setSearchParam(e.target.value)}
          value={searchParam || ""}
        />
        <FilterDropDown
          listDropdown={LIST_CLASS_FILTER}
          showing={statusSelected}
          setShowing={setStatusSelected}
          className="md:max-w-[220px]"
          textDefault="Select status"
        />
      </div>
      <div className="flex items-center justify-end pb-5">
        <DeniedBtn
          onClick={() => {
            setPage(1);
            setLimit(10);
            setSearchParam("");
            setStatusSelected(undefined);
          }}
          className="max-w-[150px]"
        >
          Remove Filter
        </DeniedBtn>
      </div>

      <div className="bg-white table-style block-border">
        <Table
          pageSizePagination={limit}
          columns={columns}
          data={listClassroom?.items}
        />
      </div>

      <Pagination
        pageSize={limit}
        setPageSize={setLimit}
        currentPage={page}
        setCurrentPage={setPage}
        totalItems={listClassroom?.pagination?.totalItem}
      />
    </div>
  );
}

export default ListOpenedClassRoom;

const columns = [
  {
    Header: " ",
    columns: [
      {
        Header: "No",
        accessor: (data) => <p>{data?.classId}</p>,
      },
      {
        Header: "Classroom name",
        accessor: (data) => <p>{data?.className}</p>,
      },
      {
        Header: "Tutor",
        accessor: (data) => <p>{data?.tutorName}</p>,
      },
      {
        Header: "Price",
        accessor: (data) => <p>{data?.price}</p>,
      },
      {
        Header: "Subject",
        accessor: (data) => <p>{data?.subjectName}</p>,
      },
      {
        Header: "Start date",
        accessor: (data) => (
          <p>
            {data?.startDate
              ? format(new Date(data?.startDate), "dd-MM-yyyy")
              : "---"}
          </p>
        ),
      },
      {
        Header: "Status",
        accessor: (data) => (
          <RenderStatus status={data?.status}>{data?.status}</RenderStatus>
        ),
      },
      {
        Header: " ",
        accessor: (data) => <RenderActionClassroom data={data} />,
      },
    ],
  },
];

const RenderActionClassroom = ({ data }) => {
  const [isShowPopupDeleteClassroom, setIsShowPopupDeleteClassroom] =
    useState(false);
  const queryClient = useQueryClient();
  const suspendClassroomMutation = useMutation(
    async (newData) => {
      console.log("newData: ", newData);
      return await deleteClassroomByTutor(newData);
    },
    {
      onSuccess: (data) => {
        console.log("Data: ", data);
        if (data?.status >= 200 && data?.status < 300) {
          toast.success("Delete classroom successfully");
          queryClient.invalidateQueries("getListClass");
          setIsShowPopupDeleteClassroom(false);
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
          err?.response?.data?.message || err?.message || "Delete error"
        );
      },
    }
  );

  const handleDeleteClassroom = () => {
    // @ts-ignore
    suspendClassroomMutation.mutate(data?.classId);
  };

  return (
    <div className="flex items-center gap-4">
      <Link to={`/tutor-classrooms/${data?.classId}`}>
        <ShowDetail />
      </Link>
      <DeniedBtn
        className="cursor-pointer"
        onClick={() => {
          setIsShowPopupDeleteClassroom(true);
        }}
      >
        Suspend
      </DeniedBtn>

      <PopupTemplate
        setShowDialog={setIsShowPopupDeleteClassroom}
        showDialog={isShowPopupDeleteClassroom}
        title="Suspend classroom"
        classNameWrapper="md:!min-w-[486px]"
      >
        <div>
          Do you want to suspend this classroom {data?.className} -{" "}
          {data?.tutorName}
        </div>
        <div className="flex items-center gap-5 mt-5">
          <SecondaryBtn
            onClick={() => {
              setIsShowPopupDeleteClassroom(false);
            }}
          >
            Cancel
          </SecondaryBtn>
          <DeniedBtn onClick={handleDeleteClassroom}>Suspend</DeniedBtn>
        </div>
      </PopupTemplate>
    </div>
  );
};
