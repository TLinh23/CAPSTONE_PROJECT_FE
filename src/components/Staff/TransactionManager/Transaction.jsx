import React, { useState } from "react";
import Layout from "../../layout/Layout";
import FilterDropDown from "../../common/FilterDropDown";
import Pagination from "../../common/Pagination";
import SearchInput from "../../common/SearchInput";
import Table from "../../common/Table";
import Title from "../../common/Title";
import useDebounce from "src/hooks/useDebounce";
import RenderStatus from "src/components/common/RenderStatus";
import ShowDetail from "src/components/common/ShowDetail";
import PrimaryBtn from "../../common/PrimaryBtn";
import { Link } from "react-router-dom";
import EditIcon from "src/components/icons/EditIcon";
import PopupTemplate from "src/components/common/PopupTemplate";
import { LIST_CLASS_LEVEL_DEFAULT } from "src/constants/constants";

// Dữ liệu giả định
const mockData = [
  {
    id: 1,
    payer: "Trang Pham",
    requestBy: "Huyen Tran",
    amount: "200",
    reqDate: "11-02-2024",
    payDate: "13-02-2024",
    status: "PAID",
  },
  {
    id: 2,
    payer: "Khang Nguyen",
    requestBy: "Long Nguyen",
    amount: "250",
    reqDate: "13-02-2024",
    status: "UNPAID",
  },
  {
    id: 3,
    payer: "Huyen Tran",
    requestBy: "Khang Nguyen",
    amount: "150",
    reqDate: "09-01-2024",
    status: "UNPAID",
  },
  // Thêm các bản ghi giả định khác nếu cần
];

function ListTransactionManager() {
  const [isFilterSelected, setIsFilterSelected] = useState(false);
  const [searchParam, setSearchParam] = useState("");
  const debouncedSearchValue = useDebounce(searchParam, 500);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // Tính toán dữ liệu hiển thị dựa trên searchParam, page và limit
  const filteredData = mockData.filter((transaction) =>
    transaction.payer.toLowerCase().includes(debouncedSearchValue.toLowerCase())
  );
  const paginatedData = filteredData.slice((page - 1) * limit, page * limit);

  // Hàm để xử lý khi nút "Add New Transaction" được nhấn
  const handleAddNewTransaction = () => {
    // Logic để thêm giao dịch mới
    console.log("Add New Transaction button clicked");
  };

  return (
    <Layout>
      <div className="container p-4 mx-auto">
        <div className="flex items-center justify-between gap-5">
          <Title>Transaction Management</Title>
          <Link className="!w-[260px]" to={"/transactions/create"}>
            <PrimaryBtn className="!w-[260px]">Add New Transaction</PrimaryBtn>
          </Link>
        </div>
        <div className="flex flex-col gap-4 py-5 md:items-center md:flex-row md:justify-end">
          <SearchInput
            placeholder="Search by payer name or id"
            onChange={(e) => setSearchParam(e.target.value)}
            value={searchParam}
          />
          <FilterDropDown
            listDropdown={[
              { id: 1, value: "PAID", name: "PAID" },
              { id: 2, value: "UNPAID", name: "UNPAID" },
              // Thêm các bộ lọc khác nếu cần
            ]}
            showing={isFilterSelected}
            setShowing={setIsFilterSelected}
            className="md:max-w-[220px]"
            textDefault="Select Status"
          />
        </div>

        <div className="bg-white table-style block-border">
          <Table
            pageSizePagination={limit}
            columns={transactionColumns}
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

export default ListTransactionManager;

const transactionColumns = [
  {
    Header: " ",
    columns: [
      {
        Header: "No",
        accessor: "id",
      },
      {
        Header: "Payer",
        accessor: "payer",
      },
      {
        Header: "Request by",
        accessor: "requestBy",
      },
      {
        Header: "Amount",
        accessor: "amount",
      },
      {
        Header: "Request Date",
        accessor: "reqDate",
      },
      {
        Header: "Pay Date",
        accessor: "payDate",
      },
      {
        Header: "Status",
        accessor: (data) => (
          <RenderStatus status={data.status}>{data.status}</RenderStatus>
        ),
      },
      {
        Header: " ",
        accessor: (data) => <RenderAction data={data} />,
      },
    ],
  },
];

const RenderAction = ({ data }) => {
  const [showDialog, setShowDialog] = useState(false);
  return (
    <div className="flex items-center gap-4">
      <Link to={`/transactions/${data.id}`}>
        <ShowDetail />
      </Link>
      <EditIcon
        onClick={() => {
          setShowDialog(true);
        }}
      />
      <PopupTemplate
        title="Edit transaction status"
        setShowDialog={setShowDialog}
        showDialog={showDialog}
      >
        <div>
          <FilterDropDown
            className="mt-4"
            title="Status"
            listDropdown={LIST_CLASS_LEVEL_DEFAULT}
            showing={undefined}
            setShowing={undefined}
            classNameDropdown="!max-h-[140px]"
            textDefault="UNPAID"
            required="*"
          />
          <div className="flex justify-center mt-5">
            <PrimaryBtn className="max-w-[160px]">Update</PrimaryBtn>
          </div>
        </div>
      </PopupTemplate>
    </div>
  );
};
