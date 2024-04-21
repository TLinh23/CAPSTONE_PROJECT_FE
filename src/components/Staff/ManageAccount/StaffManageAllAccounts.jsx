import { format } from "date-fns";
import React, { useState } from "react";
import { useMutation, useQueries, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getAllAccountsForStaff,
  staffChangeAccountStatus,
} from "src/apis/staff-module";
import DeniedBtn from "src/components/common/DeniedBtn";
import FilterDropDown from "src/components/common/FilterDropDown";
import Pagination from "src/components/common/Pagination";
import PopupTemplate from "src/components/common/PopupTemplate";
import PrimaryBtn from "src/components/common/PrimaryBtn";
import RenderStatus from "src/components/common/RenderStatus";
import SearchInput from "src/components/common/SearchInput";
import SecondaryBtn from "src/components/common/SecondaryBtn";
import ShowDetail from "src/components/common/ShowDetail";
import Table from "src/components/common/Table";
import Title from "src/components/common/Title";
import { LIST_CLASS_FILTER } from "src/constants/constants";
import useDebounce from "src/hooks/useDebounce";

function StaffManageAllAccounts() {
  const [listAllStaffs, setListAllStaffs] = useState(undefined);
  const [searchParam, setSearchParam] = useState("");
  const debouncedSearchValue = useDebounce(searchParam, 500);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [filterSelected, setFilterSelected] = useState(undefined);

  useQueries([
    {
      queryKey: [
        "getListAccounts",
        page,
        limit,
        debouncedSearchValue,
        filterSelected,
      ],
      queryFn: async () => {
        const queryObj = {};
        queryObj["PagingRequest.CurrentPage"] = page;
        queryObj["PagingRequest.PageSize"] = limit;
        if (debouncedSearchValue) {
          queryObj["SearchWord"] = debouncedSearchValue;
        }
        if (filterSelected) {
          queryObj["Status"] = filterSelected?.key;
        }

        const response = await getAllAccountsForStaff(queryObj);
        setListAllStaffs(response?.data?.data);
        return response?.data;
      },
      enabled: !!page && !!limit,
    },
  ]);

  return (
    <div>
      <Title>Manage List Accounts</Title>
      <div className="flex flex-col gap-4 py-5 md:items-center md:flex-row md:justify-end">
        <SearchInput
          placeholder="Search by name"
          onChange={(e) => setSearchParam(e.target.value)}
          value={searchParam || ""}
        />
        <FilterDropDown
          listDropdown={LIST_CLASS_FILTER}
          showing={filterSelected}
          setShowing={setFilterSelected}
          className="md:max-w-[220px]"
          textDefault="Select Status"
        />
      </div>
      <div className="flex items-center justify-end gap-5 mb-5">
        <DeniedBtn
          onClick={() => {
            setPage(1);
            setLimit(10);
            setSearchParam("");
            setFilterSelected(undefined);
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
          data={listAllStaffs?.items}
        />
      </div>

      <Pagination
        pageSize={limit}
        setPageSize={setLimit}
        currentPage={page}
        setCurrentPage={setPage}
        totalItems={listAllStaffs?.pagination?.totalItem}
      />
    </div>
  );
}

export default StaffManageAllAccounts;

const columns = [
  {
    Header: " ",
    columns: [
      {
        Header: "No",
        accessor: (data) => <p>{data?.personId}</p>,
      },
      {
        Header: "Full Name",
        accessor: (data) => <p>{data?.fullName}</p>,
      },
      {
        Header: "Role",
        accessor: (data) => <p>{data?.roleName}</p>,
      },
      {
        Header: "Email",
        accessor: (data) => <p>{data?.email}</p>,
      },
      {
        Header: "Birth Date",
        accessor: (data) => (
          <p>{data?.dob ? format(data?.dob, "dd-MM-yyyy") : "---"}</p>
        ),
      },
      {
        Header: "Status",
        accessor: (data) => (
          <RenderStatus status={data?.status}>{data?.status}</RenderStatus>
        ),
      },
      {
        Header: "Action",
        accessor: (data) => <RenderAction data={data} />,
      },
    ],
  },
];

const RenderAction = ({ data }) => {
  const queryClient = useQueryClient();
  const [isShowPopupSuspendAccount, setIsShowPopupSuspendAccount] =
    useState(false);
  const suspendAccountMutation = useMutation(
    async (newData) => {
      console.log("newData: ", newData);
      return await staffChangeAccountStatus(newData);
    },
    {
      onSuccess: (data) => {
        console.log("Data: ", data);
        if (data?.status >= 200 && data?.status < 300) {
          toast.success("Update successfully");
          queryClient.invalidateQueries("getListAccounts");
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

  const handleSuspendAccount = () => {
    suspendAccountMutation.mutate(data?.personId);
  };
  return (
    <div className="flex items-center gap-4">
      <Link to={`/accounts/${data?.personId}`}>
        <ShowDetail />
      </Link>
      <DeniedBtn
        className="cursor-pointer"
        onClick={() => {
          setIsShowPopupSuspendAccount(true);
        }}
      >
        Suspend
      </DeniedBtn>

      <PopupTemplate
        setShowDialog={setIsShowPopupSuspendAccount}
        showDialog={isShowPopupSuspendAccount}
        title="Suspend classroom"
        classNameWrapper="md:!min-w-[486px]"
      >
        <div>Do you want to suspend this account {data?.fullName}</div>
        <div className="flex items-center gap-5 mt-5">
          <SecondaryBtn
            onClick={() => {
              setIsShowPopupSuspendAccount(false);
            }}
          >
            Cancel
          </SecondaryBtn>
          <DeniedBtn onClick={handleSuspendAccount}>Suspend</DeniedBtn>
        </div>
      </PopupTemplate>
    </div>
  );
};
