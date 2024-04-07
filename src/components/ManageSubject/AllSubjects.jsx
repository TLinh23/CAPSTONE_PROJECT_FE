import React, { useState } from "react";
import Title from "../common/Title";
import SearchInput from "../common/SearchInput";
import useDebounce from "src/hooks/useDebounce";
import Table from "../common/Table";
import Pagination from "../common/Pagination";
import { useQueries } from "react-query";
import RenderStatus from "../common/RenderStatus";
import DeniedBtn from "../common/DeniedBtn";
import { getListSubjects } from "src/apis/subject-module";
import FilterDropDown from "../common/FilterDropDown";
import { LIST_STATUS_FILTER } from "src/constants/constants";

function AllSubjects() {
  const [listAllSubjects, setListAllSubjects] = useState(undefined);
  const [searchParam, setSearchParam] = useState("");
  const debouncedSearchValue = useDebounce(searchParam, 500);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [filterSelected, setFilterSelected] = useState(undefined);

  useQueries([
    {
      queryKey: [
        "getListSubjects",
        page,
        limit,
        debouncedSearchValue,
        filterSelected,
      ],
      queryFn: async () => {
        const queryObj = {};
        queryObj["PagingRequest.CurrentPage"] = page;
        queryObj["PagingRequest.PageSize"] = limit;
        if (debouncedSearchValue) {
          queryObj["SearchWord"] = debouncedSearchValue;
        }
        if (filterSelected) {
          queryObj["Status"] = filterSelected?.key;
        }

        const response = await getListSubjects(queryObj);
        setListAllSubjects(response?.data?.data);
        return response?.data;
      },
      enabled: !!page && !!limit,
    },
  ]);

  return (
    <div>
      <Title>Manage List Subject</Title>
      <div className="flex flex-col gap-4 py-5 md:items-center md:flex-row md:justify-end">
        <SearchInput
          placeholder="Search by name"
          onChange={(e) => setSearchParam(e.target.value)}
          value={searchParam || ""}
        />
        <FilterDropDown
          listDropdown={LIST_STATUS_FILTER}
          showing={filterSelected}
          setShowing={setFilterSelected}
          className="md:max-w-[220px]"
          textDefault="Select Status"
        />
      </div>
      <div className="flex justify-end mb-5">
        <DeniedBtn
          onClick={() => {
            setPage(1);
            setLimit(10);
            setSearchParam("");
            setFilterSelected(undefined);
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
          data={listAllSubjects?.items}
        />
      </div>

      <Pagination
        pageSize={limit}
        setPageSize={setLimit}
        currentPage={page}
        setCurrentPage={setPage}
        totalItems={listAllSubjects?.pagination?.totalItem}
      />
    </div>
  );
}

export default AllSubjects;

const columns = [
  {
    Header: " ",
    columns: [
      {
        Header: "No",
        accessor: (data) => <p>{data?.subjectId}</p>,
      },
      {
        Header: "Name",
        accessor: (data) => <p>{data?.subjectName}</p>,
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
              <DeniedBtn
                className="!w-fit !py-1"
                onClick={() => {
                  console.log("Click deelte");
                }}
              >
                Delete
              </DeniedBtn>
            </div>
          );
        },
      },
    ],
  },
];
