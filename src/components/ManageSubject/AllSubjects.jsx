import React, { useState } from "react";
import Title from "../common/Title";
import SearchInput from "../common/SearchInput";
import useDebounce from "src/hooks/useDebounce";
import Table from "../common/Table";
import Pagination from "../common/Pagination";
import { getListTodoWithObj } from "src/apis/tutor-module";
import { useQueries } from "react-query";
import RenderStatus from "../common/RenderStatus";
import DeniedBtn from "../common/DeniedBtn";

function AllSubjects() {
  const [listAllSubjects, setListAllSubjects] = useState(undefined);
  const [searchParam, setSearchParam] = useState("");
  const debouncedSearchValue = useDebounce(searchParam, 500);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useQueries([
    {
      queryKey: ["getListOrderRequest", page, limit, debouncedSearchValue],
      queryFn: async () => {
        const queryObj = {
          skip: (page - 1) * limit,
          limit: limit,
        };
        if (debouncedSearchValue) {
          queryObj["search"] = debouncedSearchValue;
        }

        // change your api request
        const response = await getListTodoWithObj(queryObj);
        setListAllSubjects(response?.data);
        return response?.data;
      },
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
      </div>

      <div className="bg-white table-style block-border">
        <Table
          pageSizePagination={limit}
          columns={columns}
          data={listAllSubjects?.todos}
        />
      </div>

      <Pagination
        pageSize={limit}
        setPageSize={setLimit}
        currentPage={page}
        setCurrentPage={setPage}
        totalItems={listAllSubjects?.total}
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
        accessor: (data) => <p>{data?.id}</p>,
      },
      {
        Header: "Name",
        accessor: (data) => <p>Name</p>,
      },
      {
        Header: "Status",
        accessor: (data) => (
          <RenderStatus status="approved">Approved</RenderStatus>
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
