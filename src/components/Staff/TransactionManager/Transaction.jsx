import React, { useState } from "react";
import Layout from "../../layout/Layout";
import FilterDropDown from "../../common/FilterDropDown";
import Pagination from "../../common/Pagination";
import SearchInput from "../../common/SearchInput";
import Table from "../../common/Table";
import Title from "../../common/Title";
import useDebounce from "src/hooks/useDebounce";
import ShowDetail from "src/components/common/ShowDetail";
import PrimaryBtn from "../../common/PrimaryBtn";
import { Link } from "react-router-dom";
import EditIcon from "src/components/icons/EditIcon";
import PopupTemplate from "src/components/common/PopupTemplate";
import {
  getListTransactions,
  updateTransactionDetail,
} from "src/apis/transaction-module";
import { useMutation, useQueries, useQueryClient } from "react-query";
import { format } from "date-fns";
import { LIST_TRACSACTION_STATUS } from "src/constants/enumConstant";
import { toast } from "react-toastify";
import DeniedBtn from "src/components/common/DeniedBtn";

function ListTransactionManager() {
  const [listAllTransactions, setListAllTransactions] = useState(undefined);
  const [isFilterSelected, setIsFilterSelected] = useState(undefined);
  const [searchParam, setSearchParam] = useState("");
  const debouncedSearchValue = useDebounce(searchParam, 500);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useQueries([
    {
      queryKey: [
        "getListTransactions",
        page,
        limit,
        debouncedSearchValue,
        isFilterSelected,
      ],
      queryFn: async () => {
        const queryObj = {};
        queryObj["PagingRequest.CurrentPage"] = page;
        queryObj["PagingRequest.PageSize"] = limit;
        if (debouncedSearchValue) {
          queryObj["SearchWord"] = debouncedSearchValue;
        }
        if (isFilterSelected) {
          queryObj["Status"] = isFilterSelected?.key;
        }
        const response = await getListTransactions(queryObj);
        setListAllTransactions(response?.data?.data);
        return response?.data;
      },
      enabled: !!page,
    },
  ]);

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
            listDropdown={LIST_TRACSACTION_STATUS}
            showing={isFilterSelected}
            setShowing={setIsFilterSelected}
            className="md:max-w-[220px]"
            textDefault="Select Status"
          />
        </div>
        <div className="flex justify-end pb-5">
          <DeniedBtn
            onClick={() => {
              setPage(1);
              setLimit(10);
              setSearchParam("");
              setIsFilterSelected(undefined);
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
            data={listAllTransactions?.items}
          />
        </div>

        <Pagination
          pageSize={limit}
          setPageSize={setLimit}
          currentPage={page}
          setCurrentPage={setPage}
          totalItems={listAllTransactions?.pagination?.totalItem}
        />
      </div>
    </Layout>
  );
}

export default ListTransactionManager;

const columns = [
  {
    Header: " ",
    columns: [
      {
        Header: "No",
        accessor: (data) => <p>{data?.paymentId}</p>,
      },
      {
        Header: "Payer",
        accessor: (data) => <p>{data?.payerName}</p>,
      },
      {
        Header: "Request By",
        accessor: (data) => <p>{data?.requestName}</p>,
      },
      {
        Header: "Amount",
        accessor: (data) => <p>{data?.paymentAmount}</p>,
      },
      {
        Header: "Request date",
        accessor: (data) => (
          <p>
            {data?.requestDate
              ? format(new Date(data?.requestDate), "dd-MM-yyyy")
              : "---"}
          </p>
        ),
      },
      {
        Header: "Pay date",
        accessor: (data) => (
          <p>
            {data?.payDate
              ? format(new Date(data?.payDate), "dd-MM-yyyy")
              : "---"}
          </p>
        ),
      },
      {
        Header: "Status",
        accessor: (data) => (
          <div
            className={`border w-fit px-2 py-1 rounded-md capitalize ${
              data?.status === "PAID"
                ? "border-approved text-approved"
                : "border-pending text-pending"
            }`}
          >
            {data?.status}
          </div>
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
  const queryClient = useQueryClient();
  const [showDialog, setShowDialog] = useState(false);
  const [statusTransactionSelected, setStatusTransactionSelected] =
    useState(undefined);

  const updateTransactionMutation = useMutation(
    async (newData) => {
      console.log("newData: ", newData);
      return await updateTransactionDetail(data?.paymentId, newData);
    },
    {
      onSuccess: (data) => {
        console.log("Data: ", data);
        if (data?.status >= 200 && data?.status < 300) {
          toast.success("Update transaction successfully");
          setShowDialog(false);
          queryClient.invalidateQueries("getListTransactions");
        } else {
          toast.error(
            data?.message ||
              data?.response?.data?.message ||
              data?.response?.data ||
              "Oops! Something went wrong..."
          );
        }
      },
      onError: (err) => {
        toast.error(
          // @ts-ignore
          err?.response?.data?.message || err?.message || "Update error"
        );
      },
    }
  );
  const handleUpdateTransaction = () => {
    // @ts-ignore
    updateTransactionMutation.mutate(statusTransactionSelected?.key);
  };

  return (
    <div className="flex items-center gap-4">
      <Link to={`/transactions/${data.paymentId}`}>
        <ShowDetail />
      </Link>
      <EditIcon
        className="cursor-pointer"
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
            listDropdown={LIST_TRACSACTION_STATUS}
            showing={statusTransactionSelected}
            setShowing={setStatusTransactionSelected}
            classNameDropdown="!max-h-[140px]"
            textDefault={data?.status}
            required="*"
          />
          <div className="flex justify-center mt-5">
            <PrimaryBtn
              onClick={handleUpdateTransaction}
              className="max-w-[160px]"
            >
              Update
            </PrimaryBtn>
          </div>
        </div>
      </PopupTemplate>
    </div>
  );
};
