import React, { useState } from "react";
import FilterDropDown from "../../common/FilterDropDown";
import Pagination from "../../common/Pagination";
import SearchInput from "../../common/SearchInput";
import Table from "../../common/Table";
import Title from "../../common/Title";
import useDebounce from "src/hooks/useDebounce";
import ShowDetail from "src/components/common/ShowDetail";
import PrimaryBtn from "src/components/common/PrimaryBtn";

function ListAssessmentManager() {
  const [listAssessment, setListAssessment] = useState(undefined);
  const [isFilterSelected, setIsFilterSelected] = useState(false);
  const [searchParam, setSearchParam] = useState("");
  const debouncedSearchValue = useDebounce(searchParam, 500);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [data, setData] = useState([]);

  return (
    <div className="p-4 mx-auto">
      <div className="flex items-center justify-between gap-3">
        <Title>Class Assessment</Title>
        <PrimaryBtn className="!w-[220px]">Create Assessment</PrimaryBtn>
      </div>
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
          data={listAssessment?.items || []}
        />
      </div>

      <Pagination
        pageSize={limit}
        setPageSize={setLimit}
        currentPage={page}
        setCurrentPage={setPage}
        totalItems={listAssessment?.length}
      />
    </div>
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
