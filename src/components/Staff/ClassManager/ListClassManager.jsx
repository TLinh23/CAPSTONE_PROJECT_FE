import React, { useState } from "react";
import Layout from "../../layout/Layout"; 
import FilterDropDown from "../../common/FilterDropDown";
import Pagination from "../../common/Pagination";
import SearchInput from "../../common/SearchInput";
import Table from "../../common/Table";
import Title from "../../common/Title";
import useDebounce from "src/hooks/useDebounce";
import PrimaryBtn from "../../common/PrimaryBtn";
import DeniedBtn from "../../common/DeniedBtn";
import ShowDetail from "src/components/common/ShowDetail";
import RenderStatus from "src/components/common/RenderStatus";
// Dữ liệu giả định
const mockData = [
  { id: 1, name: "Math 101", tutor: "Khang Nguyen", subject: "Math", startDate: "10-01-2024", status: "Active" },
    { id: 2, name: "Literature level 2", tutor: "Trang Pham", subject: "Literature", startDate: "22-11-2023", status: "Suspended" },
];

function ListClassManager() {
  const [isFilterSelected, setIsFilterSelected] = useState();
  const [searchParam, setSearchParam] = useState("");
  const debouncedSearchValue = useDebounce(searchParam, 500);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // Tính toán dữ liệu hiển thị dựa trên searchParam, page và limit
  const filteredData = mockData.filter(account =>
    account.name.toLowerCase().includes(debouncedSearchValue.toLowerCase())
  );
  const paginatedData = filteredData.slice((page - 1) * limit, page * limit);

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <Title>Class Management</Title>
        <div className="flex flex-col gap-4 py-5 md:items-center md:flex-row md:justify-end">
          <SearchInput
            placeholder="Search by name or id"
            onChange={(e) => setSearchParam(e.target.value)}
            value={searchParam || ""}
          />
          <FilterDropDown
            listDropdown={[
              { id: 1, value: "Active", name: "Active" },
              { id: 2, value: "Suspend", name: "Suspend" },
              // Thêm các bộ lọc khác nếu cần
            ]}
            showing={isFilterSelected}
            setShowing={setIsFilterSelected}
            className="md:max-w-[220px]"
          />
        </div>

        <div className="bg-white table-style block-border">
          <Table
            pageSizePagination={limit}
            columns={accountColumns}
            data={paginatedData}
          />
        </div>

        <Pagination
          pageSize={limit}
          setPageSize={setLimit}
          currentPage={page}
          setCurrentPage={setPage}
          totalItems={filteredData.length}
        />
      </div>
    </Layout>
  );
}

export default ListClassManager;

const accountColumns = [
  {
    Header: " ",
    columns: [
      {
        Header: "No",
        accessor: "id",
      },
      {
        Header: "Classroom name",
        accessor: "name", 
      },
      {
        Header: "Tutor",
        accessor: "tutor", 
      },
      {
        Header: "Subject",
        accessor: "subject", 
      },
      {
        Header: "Start Date",
        accessor: "startDate", 
      },
      {
        Header: "Status",
        accessor: (data) => (
          <RenderStatus status={data.status}>{data.status}</RenderStatus>
        ), // Sử dụng thuộc tính status từ data
      },
      {
        Header: "Action",
        accessor: (data) => {
          return (
            <div className="flex items-center gap-4">
              <PrimaryBtn>Active</PrimaryBtn>
              <DeniedBtn>Suspend</DeniedBtn>
            </div>
          );
        },
      },
      {
        Header: " ",
        accessor: (data) => {
          return (
            <div className="flex items-center gap-4">
              <a href={`/classDetailManager/${data.id}`}>
                <ShowDetail />
              </a>
            </div>
          );
        },
      },
    ],
  },
];
