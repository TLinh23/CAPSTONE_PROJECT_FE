import React, { useState } from "react";
import { useQueries } from "react-query";
import { getListTodoWithObj } from "src/apis/tutor-module";
import FilterDropDown from "src/components/common/FilterDropDown";
import Pagination from "src/components/common/Pagination";
import SearchInput from "src/components/common/SearchInput";
import Table from "src/components/common/Table";
import Title from "src/components/common/Title";
import useDebounce from "src/hooks/useDebounce";
import PrimaryBtn from "src/components/common/PrimaryBtn";
import DeniedBtn from "src/components/common/DeniedBtn";
import RenderStatus from "src/components/common/RenderStatus";
import ShowDetail from "src/components/common/ShowDetail";
import { getListRequestForTutor } from "src/apis/class-module";
import { useAuthContext } from "src/context/AuthContext";
import { Link } from "react-router-dom";
import {
  LIST_REQUEST_STATUS_FILTER,
  LIST_REQUEST_TYPE_FILTER,
} from "src/constants/constants";
import { getListSubjects } from "src/apis/subject-module";

function TutorOrders() {
  const [listOrderRequest, setListOrderRequest] = useState(undefined);
  const [searchParam, setSearchParam] = useState("");
  const debouncedSearchValue = useDebounce(searchParam, 500);
  const [subjectSelected, setSubjectSelected] = useState(undefined);
  const [statusSelected, setStatusSelected] = useState(undefined);
  const [typeSelected, setTypeSelected] = useState();
  const [listAllSubjects, setListAllSubjects] = useState(undefined);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { userId } = useAuthContext();

  useQueries([
    {
      queryKey: [
        "getListRequestForTutor",
        page,
        limit,
        debouncedSearchValue,
        userId,
        subjectSelected,
      ],
      queryFn: async () => {
        const queryObj = {
          PersonId: Number(userId),
        };
        queryObj["PagingRequest.CurrentPage"] = page;
        queryObj["PagingRequest.PageSize"] = limit;

        if (debouncedSearchValue) {
          queryObj["search"] = debouncedSearchValue;
        }
        if (subjectSelected) {
          queryObj["SubjectId"] = subjectSelected?.subjectId;
        }

        const response = await getListRequestForTutor(queryObj);
        setListOrderRequest(response?.data?.data);
        return response?.data;
      },
      enabled: !!userId,
    },
    {
      queryKey: ["getListSubjects"],
      queryFn: async () => {
        const queryObj = {};
        queryObj["PagingRequest.CurrentPage"] = 1;
        queryObj["PagingRequest.PageSize"] = 20;

        const response = await getListSubjects(queryObj);
        setListAllSubjects(response?.data?.data);
        return response?.data;
      },
    },
  ]);

  return (
    <div>
      <Title>Manage Classroom Request</Title>
      <div className="flex flex-col gap-4 py-5 md:items-center md:flex-row md:justify-end">
        <SearchInput
          placeholder="Search by name"
          onChange={(e) => setSearchParam(e.target.value)}
          value={searchParam || ""}
        />
      </div>
      <div className="flex items-center gap-4 pb-5">
        <FilterDropDown
          listDropdown={listAllSubjects?.items || []}
          showing={subjectSelected}
          setShowing={setSubjectSelected}
          textDefault="Select subject"
        />
        <FilterDropDown
          listDropdown={LIST_REQUEST_TYPE_FILTER}
          showing={typeSelected}
          setShowing={setTypeSelected}
          textDefault="Select type"
        />
        <FilterDropDown
          listDropdown={LIST_REQUEST_STATUS_FILTER}
          showing={statusSelected}
          setShowing={setStatusSelected}
          textDefault="Select status"
        />
        <DeniedBtn
          onClick={() => {
            setPage(1);
            setLimit(10);
            setSearchParam("");
            setStatusSelected(undefined);
            setTypeSelected(undefined);
            setSubjectSelected(undefined);
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
          data={listOrderRequest?.items}
        />
      </div>

      <Pagination
        pageSize={limit}
        setPageSize={setLimit}
        currentPage={page}
        setCurrentPage={setPage}
        totalItems={listOrderRequest?.pagination?.totalItem}
      />
    </div>
  );
}

export default TutorOrders;

const columns = [
  {
    Header: " ",
    columns: [
      {
        Header: "No",
        accessor: (data) => <p>{data?.requestId}</p>,
      },
      {
        Header: "Class Name",
        accessor: (data) => <p>{data?.className}</p>,
      },
      {
        Header: "Subject",
        accessor: (data) => <p>{data?.subjectName}</p>,
      },
      {
        Header: "Parent Name",
        accessor: (data) => <p>{data?.parentName}</p>,
      },
      {
        Header: "Student Name",
        accessor: (data) => <p>{data?.studentName}</p>,
      },
      {
        Header: "Request",
        accessor: (data) => <p>{data?.requestType}</p>,
      },
      {
        Header: "Status",
        accessor: (data) => (
          <RenderStatus status={data?.status}>{data?.status}</RenderStatus>
        ),
      },
      {
        Header: "Action",
        accessor: (data) => {
          return (
            <div className="flex items-center gap-4">
              <PrimaryBtn>Accept</PrimaryBtn>
              <DeniedBtn>Decline</DeniedBtn>
            </div>
          );
        },
      },
      {
        Header: " ",
        accessor: (data) => {
          return (
            <div className="flex items-center gap-4">
              <Link to={`/classroom-requests/${data?.requestId}`}>
                <ShowDetail />
              </Link>
            </div>
          );
        },
      },
    ],
  },
];
