import React, { useState } from "react";
import Layout from "../../layout/Layout";
import FilterDropDown from "../../common/FilterDropDown";
import Pagination from "../../common/Pagination";
import SearchInput from "../../common/SearchInput";
import Table from "../../common/Table";
import Title from "../../common/Title";
import useDebounce from "src/hooks/useDebounce";
import getAllEvaluation from "src/constants/getAllEvaluation";
import RenderStatus from "src/components/common/RenderStatus";
import ShowDetail from "src/components/common/ShowDetail";
import PrimaryBtn from "../../common/PrimaryBtn";
import axios from 'axios'; 
import { useSearchParam } from 'react-router-dom';

// Dữ liệu giả định
// const mockData = [
//   { id: 1, name: "Phạm Văn A", class: "Class 1", subject: "Math", cmt: "Good" },
//   { id: 1, name: "Phạm Văn A", class: "Class 1", subject: "Math", cmt: "Good" },
//   // Thêm các bản ghi giả định khác nếu cần
// ];

function ListAssessmentManager() {
  const [isFilterSelected, setIsFilterSelected] = useState(false);
  const [searchParam, setSearchParam] = useState("");
  const debouncedSearchValue = useDebounce(searchParam, 500);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [data, setData] = useState([])
  const { param : id } = useSearchParam();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${getAllEvaluation}/${id}`);
        setData(res.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  // Tính toán dữ liệu hiển thị dựa trên searchParam, page và limit
  const filteredData = data.filter(transaction =>
    transaction.name.toLowerCase().includes(debouncedSearchValue.toLowerCase())
  );
  const paginatedData = filteredData.slice((page - 1) * limit, page * limit);

  // Hàm để xử lý khi nút "Add New Transaction" được nhấn
  const handleAddNewTransaction = () => {
    // Logic để thêm giao dịch mới
    console.log("Add New Transaction button clicked");
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <Title>Class Assessment</Title>
        <div className="flex flex-col gap-4 py-5 md:items-center md:flex-row md:justify-end">
          <SearchInput
            placeholder="Search by name name or id"
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

        <div className="fixed bottom-0 right-0 text-xs p-2 z-10">
          <PrimaryBtn onClick={handleAddNewTransaction} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Access
          </PrimaryBtn>
        </div>
      </div>
    </Layout>
  );
}

export default ListAssessmentManager;

const transactionColumns = [
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
        Header: "Class",
        accessor: "class",
      },
      {
        Header: "Subject",
        accessor: "subject",
      },
      {
        Header: "Comment",
        accessor: "cmt",
      },
      {
        Header: " ",
        accessor: (data) => (
          <div className="flex items-center gap-4">
            <a href={`/assessDetail/${data.id}`}>
              <ShowDetail />
            </a>
          </div>
        ),
      },
    ],
  },
];
