import React, { useState } from "react";
import Layout from "../../layout/Layout";
import FilterDropDown from "../../common/FilterDropDown";
import Pagination from "../../common/Pagination";
import SearchInput from "../../common/SearchInput";
import Table from "../../common/Table";
import Title from "../../common/Title";
import useDebounce from "src/hooks/useDebounce";
import ShowDetail from "src/components/common/ShowDetail";
import { Link } from "react-router-dom";
import {
  getListTransactions,
  updatePaymentDescription,
} from "src/apis/transaction-module";
import { useMutation, useQueries, useQueryClient } from "react-query";
import { format } from "date-fns";
import { LIST_TRACSACTION_STATUS } from "src/constants/enumConstant";
import { useAuthContext } from "src/context/AuthContext";
import DeniedBtn from "src/components/common/DeniedBtn";
import PrimaryBtn from "src/components/common/PrimaryBtn";
import PopupTemplate from "src/components/common/PopupTemplate";
import PrimaryTextArea from "src/components/common/PrimaryTextArea";
import SmallTitle from "src/components/common/SmallTitle";
import { toast } from "react-toastify";

function ListTutorTransaction() {
  const [listAllTransactions, setListAllTransactions] = useState(undefined);
  const [isFilterSelected, setIsFilterSelected] = useState(undefined);
  const [searchParam, setSearchParam] = useState("");
  const debouncedSearchValue = useDebounce(searchParam, 500);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { userId } = useAuthContext();

  useQueries([
    {
      queryKey: [
        "getListTransactions",
        page,
        limit,
        debouncedSearchValue,
        userId,
        isFilterSelected,
      ],
      queryFn: async () => {
        if (userId) {
          const queryObj = {};
          queryObj["PagingRequest.CurrentPage"] = page;
          queryObj["PagingRequest.PageSize"] = limit;
          queryObj["PayerId"] = userId;
          if (debouncedSearchValue) {
            queryObj["SearchWord"] = debouncedSearchValue;
          }
          if (isFilterSelected) {
            queryObj["Status"] = isFilterSelected?.key;
          }
          const response = await getListTransactions(queryObj);
          setListAllTransactions(response?.data?.data);
          return response?.data;
        }
      },
      enabled: !!userId,
    },
  ]);

  return (
    <Layout>
      <div className="container p-4 mx-auto">
        <div className="flex items-center justify-between gap-5">
          <Title>My Transactions</Title>
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

export default ListTutorTransaction;

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
                : data?.status === "UNPAID" || data?.status === "SENT"
                ? "border-pending text-pending"
                : "border-denied text-denied"
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
  const [isOpenQrCode, setIsOpenQrCode] = useState(false);
  const [descriptionTransaction, setDescriptionTransaction] = useState("");

  const updateTransactionMutation = useMutation(
    async (newData) => {
      console.log("newData: ", newData);
      return await updatePaymentDescription(data?.paymentId, newData);
    },
    {
      onSuccess: (data) => {
        console.log("Data: ", data);
        if (data?.status >= 200 && data?.status < 300) {
          toast.success("Send transaction successfully");
          setIsOpenQrCode(false);
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
    updateTransactionMutation.mutate(descriptionTransaction);
  };

  return (
    <div className="flex items-center justify-end gap-4">
      {data?.status === "UNPAID" && (
        <PrimaryBtn
          onClick={() => {
            setIsOpenQrCode(true);
          }}
          className="italic bg-gradient-to-r from-cyan-400 to-blue-700 !w-fit"
        >
          Pay now
        </PrimaryBtn>
      )}
      <Link to={`/transactions/${data.paymentId}`}>
        <ShowDetail />
      </Link>
      <PopupTemplate
        title="Please pay the current fee"
        setShowDialog={setIsOpenQrCode}
        showDialog={isOpenQrCode}
      >
        <div className="flex gap-3">
          <div className="flex flex-col items-center justify-center w-full gap-3">
            <img src="/images/fake-qr.png" alt="qr-pay" className="h-[200px]" />
            <div>Amount: {data?.paymentAmount}</div>
            <div>Bank: Vietinbank</div>
            <div>Name: ClassNTutor</div>
          </div>
          <div className="w-full">
            <SmallTitle>Receipt</SmallTitle>
            <PrimaryTextArea
              title={
                <div>
                  Description <span className="text-dangerous">*</span>
                </div>
              }
              placeholder="Write your banking account and number receipt"
              rows={2}
              className="mt-3"
              onChange={(e) => {
                setDescriptionTransaction(e.target.value);
              }}
              value={descriptionTransaction || ""}
            />
            <PrimaryBtn
              disabled={!descriptionTransaction}
              onClick={handleUpdateTransaction}
              className="mt-8"
            >
              Send
            </PrimaryBtn>
          </div>
        </div>
      </PopupTemplate>
    </div>
  );
};
