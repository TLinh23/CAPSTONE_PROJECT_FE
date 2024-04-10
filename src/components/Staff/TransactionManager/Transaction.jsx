import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import FilterDropDown from "../../common/FilterDropDown";
import Pagination from "../../common/Pagination";
import SearchInput from "../../common/SearchInput";
import Table from "../../common/Table";
import Title from "../../common/Title";
import useDebounce from "src/hooks/useDebounce";
import PrimaryBtn from "../../common/PrimaryBtn";
import DeniedBtn from "../../common/DeniedBtn";
import axios from "axios";
// @ts-ignore
import { searchFilterPayments } from "src/constants/APIConfig";
import RenderStatus from "src/components/common/RenderStatus";
import ShowDetail from "src/components/common/ShowDetail";

function ListTransactionManager() {
     const [isFilterSelected, setIsFilterSelected] = useState();
     const [searchParam, setSearchParam] = useState("");
     const debouncedSearchValue = useDebounce(searchParam, 500);
     const [page, setPage] = useState(1);
     const [limit, setLimit] = useState(10);
     const [data, setData] = useState([]);
     useEffect(() => {
          const searchFilterPayment = async () => {
               try {
                    const res = await axios.get(searchFilterPayments, {
                         params: {
                              "PagingRequest.CurrentPage": page,
                              "PagingRequest.PageSize": limit,
                              "PagingRequest.PageRange": page * limit,
                              PayerId: 5,
                              RequestId: 0,
                         },
                         headers: {
                              Authorization:
                                   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJoYWluYW0zMzFAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU1RBRkYiLCJleHAiOjE3MTUzNjA0ODAsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjUwMDAvIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NTAwMC8ifQ.qdtg9j71OvL6Na7iale13YTxSzj4OInQoYrm3Uzebyo",
                         },
                    });

                    setData(res.data.data.items);
               } catch (error) {
                    console.log(error);
               }
          };
          searchFilterPayment();
     }, []);
     console.log(data);
     // Tính toán dữ liệu hiển thị dựa trên searchParam, page và limit
     const filteredData = data?.filter((account) =>
          account.payerName
               .toLowerCase()
               .includes(debouncedSearchValue.toLowerCase())
     );
     const paginatedData = filteredData.slice((page - 1) * limit, page * limit);

     return (
          <Layout>
               <div className="container p-4 mx-auto">
                    <Title>Transaction Management</Title>
                    <div className="flex flex-col gap-4 py-5 md:items-center md:flex-row md:justify-end">
                         <SearchInput
                              placeholder="Search by name or id"
                              onChange={(e) => setSearchParam(e.target.value)}
                              value={searchParam || ""}
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

export default ListTransactionManager;

const accountColumns = [
     {
          Header: " ",
          columns: [
               {
                    Header: "No",
                    accessor: "paymentId",
               },
               {
                    Header: "Payer",
                    accessor: "payerName",
               },
               {
                    Header: "Request by",
                    accessor: "paymentType",
               },
               {
                    Header: "Amount",
                    accessor: "paymentAmount",
               },
               {
                    Header: "Request Date",
                    accessor: "requestDate",
               },
               {
                    Header: "Pay Date",
                    accessor: "payDate",
               },
               {
                    Header: "Status",
                    accessor: (data) => (
                         <RenderStatus status={data.status}>
                              {data.status}
                         </RenderStatus>
                    ), // Sử dụng thuộc tính status từ data
               },
               {
                    Header: " ",
                    accessor: (data) => {
                         return (
                              <div className="flex items-center gap-4">
                                   <a
                                        href={`/classDetailManager/${data.paymentId}`}
                                   >
                                        <ShowDetail />
                                   </a>
                              </div>
                         );
                    },
               },
          ],
     },
];
