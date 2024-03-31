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
import RenderStatus from "src/components/common/RenderStatus";
import SecondaryBtn from "../common/SecondaryBtn";
import { format } from "date-fns";

function ListOpenedClassRoom() {
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
          queryObj["search"] = debouncedSearchValue;
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
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <Title>Manage Classroom List</Title>
        <PrimaryBtn className="md:!w-fit">Create Classroom</PrimaryBtn>
      </div>
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

export default ListOpenedClassRoom;

const columns = [
  {
    Header: " ",
    columns: [
      {
        Header: "No",
        accessor: (data) => <p>{data?.id}</p>,
      },
      {
        Header: "Title",
        accessor: (data) => <p>Title</p>,
      },
      {
        Header: "Description",
        accessor: (data) => <p>{data?.todo}</p>,
      },
      {
        Header: "Subject",
        accessor: (data) => <p>Math</p>,
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
        Header: "Created date",
        accessor: (data) => (
          <div>
            {data?.createdAt
              ? format(new Date(data?.createdAt), "HH:mm dd-MM-yyyy")
              : format(new Date(new Date()), "HH:mm dd-MM-yyyy")}
          </div>
        ),
      },
      {
        Header: "Action",
        accessor: (data) => {
          return (
            <div className="flex items-center gap-4">
              <SecondaryBtn>Edit</SecondaryBtn>
            </div>
          );
        },
      },
    ],
  },
];
