import React, { useState } from "react";
import Title from "../common/Title";
import SearchInput from "../common/SearchInput";
import useDebounce from "src/hooks/useDebounce";
import Table from "../common/Table";
import Pagination from "../common/Pagination";
import { useMutation, useQueries, useQueryClient } from "react-query";
import RenderStatus from "../common/RenderStatus";
import DeniedBtn from "../common/DeniedBtn";
import {
  createNewSubject,
  deleteSubjectDetail,
  getListSubjects,
  updateSubjectDetail,
} from "src/apis/subject-module";
import FilterDropDown from "../common/FilterDropDown";
import { LIST_STATUS_FILTER } from "src/constants/constants";
import ShowPasswordIcon from "../icons/ShowPasswordIcon";
import PopupTemplate from "../common/PopupTemplate";
import GarbageIcon from "../icons/GarbageIcon";
import PrimaryInput from "../common/PrimaryInput";
import PrimaryBtn from "../common/PrimaryBtn";
import EditIcon from "../icons/EditIcon";
import SecondaryBtn from "../common/SecondaryBtn";
import { toast } from "react-toastify";

function AllSubjects() {
  const queryClient = useQueryClient();
  const [listAllSubjects, setListAllSubjects] = useState(undefined);
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

        const response = await getListSubjects(queryObj);
        setListAllSubjects(response?.data?.data);
        return response?.data;
      },
      enabled: !!page && !!limit,
    },
  ]);

  const cerateMutation = useMutation(
    async (newData) => {
      console.log("newData: ", newData);
      return await createNewSubject(newData);
    },
    {
      onSuccess: (data) => {
        console.log("Data: ", data);
        if (data?.status >= 200 && data?.status < 300) {
          toast.success("Create successfully");
          setShowDialogCreate(false);
          queryClient.invalidateQueries("getListSubjects");
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

  const handleCreateSubject = async () => {
    const submitObject = {
      ...subjectDetail,
      SubjectId: 1,
    };
    if (subjectStatus) {
      submitObject["Status"] = subjectStatus?.key;
    }
    console.log("submitObject: ", submitObject);
    const formData = new FormData();
    for (const key in submitObject) {
      const value = submitObject[key];

      formData.append(key, value);
    }
    // @ts-ignore
    cerateMutation.mutate(formData);
  };

  return (
    <div>
      <Title>Manage List Subject</Title>
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
      <div className="flex items-center justify-between gap-5 mb-5">
        <PrimaryBtn
          className="w-[120px]"
          onClick={() => {
            setShowDialogCreate(true);
          }}
        >
          Add Subject
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
          data={listAllSubjects?.items}
        />
      </div>

      <Pagination
        pageSize={limit}
        setPageSize={setLimit}
        currentPage={page}
        setCurrentPage={setPage}
        totalItems={listAllSubjects?.pagination?.totalItem}
      />
      <PopupTemplate
        title="Add Subject"
        setShowDialog={setShowDialogCreate}
        showDialog={showDialogCreate}
        classNameWrapper="md:min-w-[486px]"
      >
        <div className="flex flex-col items-center gap-4">
          <PrimaryInput
            onChange={(e) => {
              setSubjectDetail({
                ...subjectDetail,
                SubjectName: e.target.value,
              });
            }}
            className="w-full"
            value={subjectDetail?.SubjectName || ""}
          />
          <FilterDropDown
            listDropdown={LIST_STATUS_FILTER}
            showing={subjectStatus}
            setShowing={setSubjectStatus}
            textDefault={"Choose status"}
          />
        </div>
        <div className="flex items-center justify-end gap-5 mt-5">
          <PrimaryBtn onClick={handleCreateSubject} className="w-[120px]">
            Create
          </PrimaryBtn>
          <SecondaryBtn
            onClick={() => {
              setShowDialogCreate(false);
            }}
            className="w-[120px]"
          >
            Cancel
          </SecondaryBtn>
        </div>
      </PopupTemplate>
    </div>
  );
}

export default AllSubjects;

const columns = [
  {
    Header: " ",
    columns: [
      {
        Header: "No",
        accessor: (data) => <p>{data?.subjectId}</p>,
      },
      {
        Header: "Name",
        accessor: (data) => <p>{data?.subjectName}</p>,
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
  const [showDialogDelete, setShowDialogDelete] = useState(false);
  const [subjectDetail, setSubjectDetail] = useState(undefined);
  const [subjectStatus, setSubjectStatus] = useState(undefined);

  const editSubjectMutation = useMutation(
    async (newData) => {
      console.log("newData: ", newData);
      return await updateSubjectDetail(newData);
    },
    {
      onSuccess: (data) => {
        console.log("Data: ", data);
        if (data?.status >= 200 && data?.status < 300) {
          toast.success("Update successfully");
          setShowDialogEdit(false);
          queryClient.invalidateQueries("getListSubjects");
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

  const handleEditSubject = async () => {
    const submitObject = {
      ...subjectDetail,
      SubjectId: data?.subjectId,
    };
    if (subjectStatus) {
      submitObject["Status"] = subjectStatus?.key;
    }
    console.log("submitObject: ", submitObject);
    const formData = new FormData();
    for (const key in submitObject) {
      const value = submitObject[key];

      formData.append(key, value);
    }
    // @ts-ignore
    editSubjectMutation.mutate(formData);
  };

  const deleteSubjectMutation = useMutation(
    async (id) => {
      return await deleteSubjectDetail(id);
    },
    {
      onSuccess: (data) => {
        console.log("Data: ", data);
        if (data?.status >= 200 && data?.status < 300) {
          toast.success("Update successfully");
          setShowDialogEdit(false);
          queryClient.invalidateQueries("getListSubjects");
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
          err?.response?.data?.message || err?.message || "Delete error"
        );
      },
    }
  );

  const handleClickDeleteSubject = async () => {
    // @ts-ignore
    deleteSubjectMutation.mutate(data?.subjectId);
  };

  return (
    <div className="flex items-center gap-4">
      <PopupTemplate
        title="Subject Detail"
        setShowDialog={setShowDialog}
        showDialog={showDialog}
        classNameWrapper="md:min-w-[486px]"
      >
        <div className="flex items-center gap-4">
          <PrimaryInput
            className="w-full"
            readOnly
            value={data?.subjectName || ""}
          />
          <RenderStatus status={data?.status}>{data?.status}</RenderStatus>
        </div>
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
        title="Edit Subject"
        setShowDialog={setShowDialogEdit}
        showDialog={showDialogEdit}
        classNameWrapper="md:min-w-[486px]"
      >
        <div className="flex flex-col items-center gap-4">
          <PrimaryInput
            onChange={(e) => {
              setSubjectDetail({
                ...subjectDetail,
                SubjectName: e.target.value,
              });
            }}
            className="w-full"
            value={subjectDetail?.SubjectName || data?.subjectName || ""}
          />
          <FilterDropDown
            listDropdown={LIST_STATUS_FILTER}
            showing={subjectStatus}
            setShowing={setSubjectStatus}
            textDefault={data?.status}
          />
        </div>
        <div className="flex items-center justify-end gap-5 mt-5">
          <PrimaryBtn onClick={handleEditSubject} className="w-[120px]">
            Save
          </PrimaryBtn>
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
      <EditIcon
        onClick={() => {
          setShowDialogEdit(true);
        }}
        className="cursor-pointer"
      />

      <PopupTemplate
        title="Delete Subject"
        setShowDialog={setShowDialogDelete}
        showDialog={showDialogDelete}
        classNameWrapper="md:min-w-[486px]"
      >
        <div className="flex items-center gap-4">
          Are you sure to delete this subject {data?.subjectName}
        </div>
        <div className="flex items-center justify-end gap-5 mt-5">
          <PrimaryBtn onClick={handleClickDeleteSubject} className="w-[120px]">
            Save
          </PrimaryBtn>
          <SecondaryBtn
            onClick={() => {
              setShowDialogDelete(false);
            }}
            className="w-[120px]"
          >
            Cancel
          </SecondaryBtn>
        </div>
      </PopupTemplate>

      <GarbageIcon
        className="cursor-pointer"
        onClick={() => {
          setShowDialogDelete(true);
        }}
      >
        Delete
      </GarbageIcon>
    </div>
  );
};
