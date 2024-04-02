import React, { useState } from "react";
import { useQueries } from "react-query";
import { getListTodoWithObj } from "src/apis/tutor-module";
import FilterDropDown from "src/components/common/FilterDropDown";
import Pagination from "src/components/common/Pagination";
import SearchInput from "src/components/common/SearchInput";
import Table from "src/components/common/Table";
import Title from "src/components/common/Title";
import useDebounce from "src/hooks/useDebounce";
import DeniedBtn from "src/components/common/DeniedBtn";
import RenderStatus from "src/components/common/RenderStatus";
import ShowDetail from "src/components/common/ShowDetail";
import { NavLink } from "react-router-dom";

function ParentOrders() {
  const [isFilterSelected, setIsFilterSelected] = useState();
  const [listOrderRequest, setListOrderRequest] = useState(undefined);
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
          queryObj["SearchWord"] = debouncedSearchValue;
        }

        // change your api request
        const response = await getListTodoWithObj(queryObj);
        setListOrderRequest(response?.data);
        return response?.data;
      },
    },
  ]);

  console.log("listOrderRequest: ", listOrderRequest);

  return (
    <div>
      <Title>Manage Classroom Request</Title>
      <div className="flex flex-col gap-4 py-5 md:items-center md:flex-row md:justify-end">
        <SearchInput
          placeholder="Search by name"
          onChange={(e) => setSearchParam(e.target.value)}
          value={searchParam || ""}
        />
        <FilterDropDown
          listDropdown={[
            { id: 1, value: "Male", name: "Male" },
            { id: 2, value: "Female", name: "Female" },
          ]}
          showing={isFilterSelected}
          setShowing={setIsFilterSelected}
          className="md:max-w-[220px]"
        />
      </div>

      <div className="bg-white table-style block-border">
        <Table
          pageSizePagination={limit}
          columns={columns}
          data={listOrderRequest?.todos}
        />
      </div>

      <Pagination
        pageSize={limit}
        setPageSize={setLimit}
        currentPage={page}
        setCurrentPage={setPage}
        totalItems={listOrderRequest?.total}
      />
    </div>
  );
}

export default ParentOrders;

const columns = [
  {
    Header: " ",
    columns: [
      {
        Header: "No",
        accessor: (data) => <p>{data?.id}</p>,
      },
      {
        Header: "Tutor",
        accessor: (data) => <p>Tutor</p>,
      },
      {
        Header: "Subject",
        accessor: (data) => <p>Subject</p>,
      },
      {
        Header: "Student Name",
        accessor: (data) => <p>{data?.todo}</p>,
      },
      {
        Header: "Price",
        accessor: (data) => <p>Price</p>,
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
              {/* <PrimaryBtn>Accept</PrimaryBtn> */}
              <DeniedBtn>Cancel</DeniedBtn>
            </div>
          );
        },
      },
      {
        Header: " ",
        accessor: (data) => {
          return (
            <div className="flex items-center gap-4">
              <NavLink to={`/classroom-requests/${data?.id}`}>
                <ShowDetail />
              </NavLink>
            </div>
          );
        },
      },
    ],
  },
];
