import React, { useState } from "react";
import Layout from "../../layout/Layout"; 
import FilterDropDown from "../../common/FilterDropDown";
import Pagination from "../../common/Pagination";
import SearchInput from "../../common/SearchInput";
import Table from "../../common/Table";
import Title from "../../common/Title";
import useDebounce from "src/hooks/useDebounce";
import PrimaryBtn from "../../common/PrimaryBtn";
import RenderStatus from "../../Admin/RenderStatus"; 
import DeniedBtn from "../../common/DeniedBtn";
import ShowDetail from "../../Admin/ShowDetail";
// Dữ liệu giả định
const mockData = [
  { id: 1, name: "John Doe", role: "Admin", phone: "123-456-7890", status: "Active" },
  { id: 2, name: "Jane Smith", role: "User", phone: "098-765-4321", status: "Inactive" },
  // Thêm các bản ghi giả định khác
];

function AccountManager() {
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
        <Title>Account Management</Title>
        <div className="flex flex-col gap-4 py-5 md:items-center md:flex-row md:justify-end">
          <SearchInput
            placeholder="Search by name or id"
            onChange={(e) => setSearchParam(e.target.value)}
            value={searchParam || ""}
          />
          <FilterDropDown
            listDropdown={[
              { id: 1, value: "Active", name: "Active" },
              { id: 2, value: "Inactive", name: "Inactive" },
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

export default AccountManager;

const accountColumns = [
  {
    Header: " ",
    columns: [
      {
        Header: "No",
        accessor: "id",
      },
      {
        Header: "Name",
        accessor: "name", 
      },
      {
        Header: "Role",
        accessor: "role", 
      },
      {
        Header: "Phone",
        accessor: "phone", 
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
              <DeniedBtn>Inactive</DeniedBtn>
            </div>
          );
        },
      },
      {
        Header: " ",
        accessor: (data) => {
          return (
            <div className="flex items-center gap-4">
              <a href={`/accountdetail/${data.id}`}>
                <ShowDetail />
              </a>
            </div>
          );
        },
      },
    ],
  },
];
