import React, { useState } from "react";
import Title from "../common/Title";
import SearchInput from "../common/SearchInput";
import useDebounce from "src/hooks/useDebounce";
import Table from "../common/Table";
import Pagination from "../common/Pagination";
import { useMutation, useQueries, useQueryClient } from "react-query";
import RenderStatus from "../common/RenderStatus";
import DeniedBtn from "../common/DeniedBtn";
import FilterDropDown from "../common/FilterDropDown";
import { LIST_CLASS_FILTER } from "src/constants/constants";
import ShowPasswordIcon from "../icons/ShowPasswordIcon";
import PopupTemplate from "../common/PopupTemplate";
import PrimaryBtn from "../common/PrimaryBtn";
import SecondaryBtn from "../common/SecondaryBtn";
import { toast } from "react-toastify";
import { deleteStaffDetail, getAllStaffs } from "src/apis/staff-module";
import CreateNewStaff from "./CreateNewStaff";
import { format } from "date-fns";
import GarbageIcon from "../icons/GarbageIcon";
import StaffDetail from "./StaffDetail";

function AllStaffs() {
  const queryClient = useQueryClient();
  const [listAllStaffs, setListAllStaffs] = useState(undefined);
  const [searchParam, setSearchParam] = useState("");
  const debouncedSearchValue = useDebounce(searchParam, 500);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [filterSelected, setFilterSelected] = useState(undefined);
  const [showDialogCreate, setShowDialogCreate] = useState(false);

  useQueries([
    {
      queryKey: [
        "getListStaffs",
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

        const response = await getAllStaffs(queryObj);
        setListAllStaffs(response?.data?.data);
        return response?.data;
      },
      enabled: !!page && !!limit,
    },
  ]);

  return (
    <div>
      <Title>Manage List Staff</Title>
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
      <div className="flex items-center justify-between gap-5 mb-5">
        <PrimaryBtn
          className="!w-[120px]"
          onClick={() => {
            setShowDialogCreate(true);
          }}
        >
          Add Staff
        </PrimaryBtn>
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
      <PopupTemplate
        title="Add Staff"
        setShowDialog={setShowDialogCreate}
        showDialog={showDialogCreate}
        classNameWrapper="md:min-w-[486px]"
      >
        <CreateNewStaff
          setShowDialogCreate={setShowDialogCreate}
          showDialogCreate={showDialogCreate}
        />
      </PopupTemplate>
    </div>
  );
}

export default AllStaffs;

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
  const [showDialog, setShowDialog] = useState(false);
  const [showDialogEdit, setShowDialogEdit] = useState(false);

  const deleteStaffMutation = useMutation(
    async (newData) => {
      console.log("newData: ", newData);
      return await deleteStaffDetail(newData);
    },
    {
      onSuccess: (data) => {
        console.log("Data: ", data);
        if (data?.status >= 200 && data?.status < 300) {
          toast.success("Update successfully");
          setShowDialogEdit(false);
          queryClient.invalidateQueries("getListStaffs");
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

  const handleDeleteStaff = () => {
    deleteStaffMutation.mutate(data?.personId);
  };

  return (
    <div className="flex items-center gap-4">
      <PopupTemplate
        title="Staff Detail"
        setShowDialog={setShowDialog}
        showDialog={showDialog}
        classNameWrapper="md:min-w-[486px]"
      >
        <StaffDetail staffDetail={data} />
        <div className="flex justify-end">
          <PrimaryBtn
            onClick={() => {
              setShowDialog(false);
            }}
            className="w-[120px] mt-5"
          >
            Close
          </PrimaryBtn>
        </div>
      </PopupTemplate>
      <ShowPasswordIcon
        onClick={() => {
          setShowDialog(true);
        }}
        className="cursor-pointer"
      />
      <PopupTemplate
        title="Delete Staff"
        setShowDialog={setShowDialogEdit}
        showDialog={showDialogEdit}
        classNameWrapper="w-[300px]"
      >
        <div className="flex flex-col items-center gap-4">
          Do you want to delete this staff {data?.fullName} - Email:{" "}
          {data?.email}
        </div>
        <div className="flex items-center justify-end gap-5 mt-5">
          <DeniedBtn onClick={handleDeleteStaff} className="w-[120px]">
            Delete
          </DeniedBtn>
          <SecondaryBtn
            onClick={() => {
              setShowDialogEdit(false);
            }}
            className="w-[120px]"
          >
            Cancel
          </SecondaryBtn>
        </div>
      </PopupTemplate>
      <GarbageIcon
        onClick={() => {
          setShowDialogEdit(true);
        }}
        className="cursor-pointer"
      />
    </div>
  );
};
