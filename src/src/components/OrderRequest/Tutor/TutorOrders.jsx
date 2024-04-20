import React, { useState } from "react";
import { useMutation, useQueries, useQueryClient } from "react-query";
import FilterDropDown from "src/components/common/FilterDropDown";
import Pagination from "src/components/common/Pagination";
import Table from "src/components/common/Table";
import Title from "src/components/common/Title";
import PrimaryBtn from "src/components/common/PrimaryBtn";
import DeniedBtn from "src/components/common/DeniedBtn";
import RenderStatus from "src/components/common/RenderStatus";
import ShowDetail from "src/components/common/ShowDetail";
import { getListRequestForTutor } from "src/apis/class-module";
import { useAuthContext } from "src/context/AuthContext";
import { Link } from "react-router-dom";
import {
  LIST_REQUEST_STATUS_FILTER,
  LIST_REQUEST_TYPE_FILTER,
} from "src/constants/constants";
import { getListSubjects } from "src/apis/subject-module";
import PopupTemplate from "src/components/common/PopupTemplate";
import SecondaryBtn from "src/components/common/SecondaryBtn";
import { toast } from "react-toastify";
import {
  acceptRequestForTutor,
  declineRequestForTutor,
} from "src/apis/order-module";

function TutorOrders() {
  const [listOrderRequest, setListOrderRequest] = useState(undefined);
  const [subjectSelected, setSubjectSelected] = useState(undefined);
  const [statusSelected, setStatusSelected] = useState(undefined);
  const [typeSelected, setTypeSelected] = useState(undefined);
  const [listAllSubjects, setListAllSubjects] = useState(undefined);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { userId } = useAuthContext();

  useQueries([
    {
      queryKey: [
        "getListRequestForTutor",
        page,
        limit,
        userId,
        subjectSelected,
        statusSelected,
        typeSelected,
      ],
      queryFn: async () => {
        const queryObj = {
          PersonId: Number(userId),
        };
        queryObj["PagingRequest.CurrentPage"] = page;
        queryObj["PagingRequest.PageSize"] = limit;

        if (subjectSelected) {
          queryObj["SubjectId"] = subjectSelected?.subjectId;
        }
        if (statusSelected) {
          queryObj["Status"] = statusSelected?.key;
        }
        if (typeSelected) {
          queryObj["RequestType"] = typeSelected?.key;
        }

        const response = await getListRequestForTutor(queryObj);
        setListOrderRequest(response?.data?.data);
        return response?.data;
      },
      enabled: !!userId,
    },
    {
      queryKey: ["getListSubjects"],
      queryFn: async () => {
        const queryObj = {};
        queryObj["PagingRequest.CurrentPage"] = 1;
        queryObj["PagingRequest.PageSize"] = 20;
        queryObj["Status"] = "CREATED";

        const response = await getListSubjects(queryObj);
        setListAllSubjects(response?.data?.data);
        return response?.data;
      },
    },
  ]);

  return (
    <div>
      <Title>Manage Classroom Request</Title>
      <div className="flex items-center gap-4 py-5">
        <FilterDropDown
          listDropdown={listAllSubjects?.items || []}
          showing={subjectSelected}
          setShowing={setSubjectSelected}
          textDefault="Select subject"
        />
        <FilterDropDown
          listDropdown={LIST_REQUEST_TYPE_FILTER}
          showing={typeSelected}
          setShowing={setTypeSelected}
          textDefault="Select type"
        />
        <FilterDropDown
          listDropdown={LIST_REQUEST_STATUS_FILTER}
          showing={statusSelected}
          setShowing={setStatusSelected}
          textDefault="Select status"
        />
        <DeniedBtn
          onClick={() => {
            setPage(1);
            setLimit(10);
            setStatusSelected(undefined);
            setTypeSelected(undefined);
            setSubjectSelected(undefined);
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
          data={listOrderRequest?.items}
        />
      </div>

      <Pagination
        pageSize={limit}
        setPageSize={setLimit}
        currentPage={page}
        setCurrentPage={setPage}
        totalItems={listOrderRequest?.pagination?.totalItem}
      />
    </div>
  );
}

export default TutorOrders;

const columns = [
  {
    Header: " ",
    columns: [
      {
        Header: "No",
        accessor: (data) => <p>{data?.requestId}</p>,
      },
      {
        Header: "Class Name",
        accessor: (data) => <p>{data?.className}</p>,
      },
      {
        Header: "Subject",
        accessor: (data) => <p>{data?.subjectName}</p>,
      },
      {
        Header: "Parent Name",
        accessor: (data) => <p>{data?.parentName}</p>,
      },
      {
        Header: "Student Name",
        accessor: (data) => <p>{data?.studentName}</p>,
      },
      {
        Header: "Request",
        accessor: (data) => <p>{data?.requestType}</p>,
      },
      {
        Header: "Status",
        accessor: (data) => (
          <RenderStatus status={data?.status}>{data?.status}</RenderStatus>
        ),
      },
      {
        Header: "Action",
        accessor: (data) => <RenderRequestAction data={data} />,
      },
      {
        Header: " ",
        accessor: (data) => {
          return (
            <div className="flex items-center gap-4">
              <Link to={`/classroom-requests/${data?.requestId}`}>
                <ShowDetail />
              </Link>
            </div>
          );
        },
      },
    ],
  },
];

const RenderRequestAction = ({ data }) => {
  const queryClient = useQueryClient();
  const [showDeleDialog, setShowDeleDialog] = useState(false);
  const [showAcceptDialog, setShowAcceptDialog] = useState(false);

  const deleteRequestMutation = useMutation(
    async (newData) => {
      console.log("newData: ", newData);
      return await declineRequestForTutor(newData);
    },
    {
      onSuccess: (data) => {
        console.log("Data: ", data);
        if (data?.status >= 200 && data?.status < 300) {
          toast.success("Decline request successfully");
          setShowDeleDialog(false);
          queryClient.invalidateQueries("getListRequestForTutor");
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
          err?.response?.data?.message || err?.message || "Decline error"
        );
      },
    }
  );

  const handleDeleteRequest = () => {
    // @ts-ignore
    deleteRequestMutation.mutate(data?.requestId);
  };

  const acceptRequestMutation = useMutation(
    async (newData) => {
      console.log("newData: ", newData);
      return await acceptRequestForTutor(newData);
    },
    {
      onSuccess: (data) => {
        console.log("Data: ", data);
        if (data?.status >= 200 && data?.status < 300) {
          toast.success("Accept request successfully");
          setShowAcceptDialog(false);
          queryClient.invalidateQueries("getListRequestForTutor");
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
          err?.response?.data?.message || err?.message || "Accept error"
        );
      },
    }
  );

  const handleAcceptRequest = () => {
    // @ts-ignore
    acceptRequestMutation.mutate(data?.requestId);
  };

  return data?.status !== "PENDING" ? (
    <div>---</div>
  ) : (
    <div className="flex items-center gap-4">
      <PopupTemplate
        title="Accept request"
        setShowDialog={setShowAcceptDialog}
        showDialog={showAcceptDialog}
        classNameWrapper="md:!w-[286px]"
      >
        <div>
          Do you want to accept the request of
          <span className="font-bold">
            {" "}
            parent {data?.parentName}
          </span> with{" "}
          <span className="font-bold">student {data?.studentName}</span> in to
          class
        </div>
        <div className="flex items-center justify-end gap-5 mt-10">
          <PrimaryBtn onClick={handleAcceptRequest} className="max-w-[160px]">
            Accept
          </PrimaryBtn>
          <SecondaryBtn
            onClick={() => {
              setShowAcceptDialog(false);
            }}
            className="max-w-[160px]"
          >
            Close
          </SecondaryBtn>
        </div>
      </PopupTemplate>
      <PrimaryBtn
        onClick={() => {
          setShowAcceptDialog(true);
        }}
      >
        Accept
      </PrimaryBtn>

      <PopupTemplate
        title="Decline request"
        setShowDialog={setShowDeleDialog}
        showDialog={showDeleDialog}
        classNameWrapper="md:!w-[286px]"
      >
        <div>
          Do you want to decline the request of
          <span className="font-bold">
            {" "}
            parent {data?.parentName}
          </span> with{" "}
          <span className="font-bold">student {data?.studentName}</span> out of
          class
        </div>
        <div className="flex items-center justify-end gap-5 mt-10">
          <DeniedBtn onClick={handleDeleteRequest} className="max-w-[160px]">
            Decline
          </DeniedBtn>
          <SecondaryBtn
            onClick={() => {
              setShowDeleDialog(false);
            }}
            className="max-w-[160px]"
          >
            Close
          </SecondaryBtn>
        </div>
      </PopupTemplate>
      <DeniedBtn
        onClick={() => {
          setShowDeleDialog(true);
        }}
      >
        Decline
      </DeniedBtn>
    </div>
  );
};
