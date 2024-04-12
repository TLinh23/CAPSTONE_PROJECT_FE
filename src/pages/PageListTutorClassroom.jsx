import { format } from "date-fns";
import React, { useState } from "react";
import { useQueries } from "react-query";
import { Link } from "react-router-dom";
import { getClassByTutor } from "src/apis/class-module";
import DeniedBtn from "src/components/common/DeniedBtn";
import FilterDropDown from "src/components/common/FilterDropDown";
import Pagination from "src/components/common/Pagination";
import RenderStatus from "src/components/common/RenderStatus";
import SearchInput from "src/components/common/SearchInput";
import ShowDetail from "src/components/common/ShowDetail";
import Table from "src/components/common/Table";
import Title from "src/components/common/Title";
import Layout from "src/components/layout/Layout";
import { LIST_CLASS_FILTER, ROLE_NAME } from "src/constants/constants";
import { useAuthContext } from "src/context/AuthContext";
import useDebounce from "src/hooks/useDebounce";

function PageListTutorClassroom() {
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
        if (roleKey === ROLE_NAME.TUTOR) {
          const queryObj = {};
          queryObj["PagingRequest.CurrentPage"] = page;
          queryObj["PagingRequest.PageSize"] = limit;
          queryObj["TutorId"] = userId;
          if (debouncedSearchValue) {
            queryObj["SearchWord"] = debouncedSearchValue;
          }
          if (statusSelected) {
            queryObj["Status"] = statusSelected?.key;
          }
          const response = await getClassByTutor(queryObj);
          setListClassroom(response?.data?.data);
          return response?.data;
        }
      },
      enabled: !!userId,
    },
  ]);

  return (
    <Layout>
      <Title>My Classroom List</Title>
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
    </Layout>
  );
}

export default PageListTutorClassroom;

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
      // {
      //   Header: "Action",
      //   accessor: (data) => {
      //     return (
      //       <div className="flex items-center gap-4">
      //         <PrimaryBtn>Accept</PrimaryBtn>
      //         <DeniedBtn>Decline</DeniedBtn>
      //       </div>
      //     );
      //   },
      // },
      {
        Header: " ",
        accessor: (data) => {
          return (
            <div className="flex items-center gap-4">
              <Link to={`/tutor-classrooms/${data?.classId}`}>
                <ShowDetail />
              </Link>
            </div>
          );
        },
      },
    ],
  },
];
