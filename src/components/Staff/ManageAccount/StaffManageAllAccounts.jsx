import { format } from "date-fns";
import React, { useState } from "react";
import { useQueries, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllAccountsForStaff } from "src/apis/staff-module";
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
import { LIST_STATUS_FILTER } from "src/constants/constants";
import useDebounce from "src/hooks/useDebounce";

function StaffManageAllAccounts() {
  const queryClient = useQueryClient();
  const [listAllStaffs, setListAllStaffs] = useState(undefined);
  const [searchParam, setSearchParam] = useState("");
  const debouncedSearchValue = useDebounce(searchParam, 500);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [filterSelected, setFilterSelected] = useState(undefined);
  const [showDialogCreate, setShowDialogCreate] = useState(false);
  const [subjectDetail, setSubjectDetail] = useState(undefined);
  const [subjectStatus, setSubjectStatus] = useState(undefined);

  useQueries([
    {
      queryKey: [
        "getListSubjects",
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
          listDropdown={LIST_STATUS_FILTER}
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
  const [isShowPopupDeleteClassroom, setIsShowPopupDeleteClassroom] =
    useState(false);
  const handleDeleteClassroom = () => {};
  return (
    <div className="flex items-center gap-4">
      <Link to={`/profile/${data?.personId}`}>
        <ShowDetail />
      </Link>
      <DeniedBtn
        className="cursor-pointer"
        onClick={() => {
          setIsShowPopupDeleteClassroom(true);
        }}
      >
        Suspend
      </DeniedBtn>

      <PopupTemplate
        setShowDialog={setIsShowPopupDeleteClassroom}
        showDialog={isShowPopupDeleteClassroom}
        title="Suspend classroom"
        classNameWrapper="md:!min-w-[486px]"
      >
        <div>Do you want to suspend this classroom {data?.className}</div>
        <div className="flex items-center gap-5 mt-5">
          <SecondaryBtn
            onClick={() => {
              setIsShowPopupDeleteClassroom(false);
            }}
          >
            Cancel
          </SecondaryBtn>
          <DeniedBtn onClick={handleDeleteClassroom}>Suspend</DeniedBtn>
        </div>
      </PopupTemplate>
    </div>
  );
};
