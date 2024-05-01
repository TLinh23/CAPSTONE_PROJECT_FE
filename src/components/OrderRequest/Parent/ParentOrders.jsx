import React, { useState } from "react";
import { useMutation, useQueries, useQueryClient } from "react-query";
import FilterDropDown from "src/components/common/FilterDropDown";
import Pagination from "src/components/common/Pagination";
import Table from "src/components/common/Table";
import Title from "src/components/common/Title";
import DeniedBtn from "src/components/common/DeniedBtn";
import RenderStatus from "src/components/common/RenderStatus";
import ShowDetail from "src/components/common/ShowDetail";
import { Link } from "react-router-dom";
import {
  LIST_REQUEST_STATUS_FILTER,
  LIST_REQUEST_TYPE_FILTER,
} from "src/constants/constants";
import { getListRequestForParent } from "src/apis/class-module";
import { useAuthContext } from "src/context/AuthContext";
import { toast } from "react-toastify";
import { cancelRequestForParent } from "src/apis/order-module";
import PopupTemplate from "src/components/common/PopupTemplate";
import SecondaryBtn from "src/components/common/SecondaryBtn";

function ParentOrders() {
  const [listOrderRequest, setListOrderRequest] = useState(undefined);
  const [statusSelected, setStatusSelected] = useState(undefined);
  const [typeSelected, setTypeSelected] = useState(undefined);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { userId } = useAuthContext();

  useQueries([
    {
      queryKey: [
        "getListRequestForParent",
        page,
        limit,
        userId,
        statusSelected,
        typeSelected,
      ],
      queryFn: async () => {
        const queryObj = {
          PersonId: Number(userId),
        };
        queryObj["PagingRequest.CurrentPage"] = page;
        queryObj["PagingRequest.PageSize"] = limit;

        if (statusSelected) {
          queryObj["Status"] = statusSelected?.key;
        }
        if (typeSelected) {
          queryObj["RequestType"] = typeSelected?.key;
        }

        const response = await getListRequestForParent(queryObj);
        setListOrderRequest(response?.data?.data);
        return response?.data;
      },
      enabled: !!userId,
    },
  ]);

  return (
    <div>
      <Title>Manage Classroom Request</Title>
      <div className="flex items-center gap-4 py-5">
        <div className="flex items-center w-full gap-4">
          <FilterDropDown
            listDropdown={LIST_REQUEST_TYPE_FILTER}
            showing={typeSelected}
            setShowing={setTypeSelected}
            textDefault="Select type"
            className="max-w-[300px]"
          />
          <FilterDropDown
            listDropdown={LIST_REQUEST_STATUS_FILTER}
            showing={statusSelected}
            setShowing={setStatusSelected}
            textDefault="Select status"
            className="max-w-[300px]"
          />
        </div>
        <DeniedBtn
          onClick={() => {
            setPage(1);
            setLimit(10);
            setStatusSelected(undefined);
            setTypeSelected(undefined);
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

export default ParentOrders;

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
        Header: "Tutor Name",
        accessor: (data) => <p>{data?.tutorName}</p>,
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
        Header: "Parent Phone",
        accessor: (data) => <p>{data?.phone || "---"}</p>,
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
  const [setshowCancelDialog, setSetshowCancelDialog] = useState(false);

  const cancelRequestMutation = useMutation(
    async (newData) => {
      console.log("newData: ", newData);
      return await cancelRequestForParent(newData);
    },
    {
      onSuccess: (data) => {
        console.log("Data: ", data);
        if (data?.status >= 200 && data?.status < 300) {
          toast.success("Cancel request successfully");
          setSetshowCancelDialog(false);
          queryClient.invalidateQueries("getListRequestForParent");
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

  const handleCancelRequest = () => {
    // @ts-ignore
    cancelRequestMutation.mutate(data?.requestId);
  };

  return data?.status !== "PENDING" ? (
    <div>---</div>
  ) : (
    <div>
      <PopupTemplate
        title="Cancel request"
        setShowDialog={setSetshowCancelDialog}
        showDialog={setshowCancelDialog}
        classNameWrapper="md:!w-[286px]"
      >
        <div>
          Do you want to cancel the request to learn in
          <span className="font-bold"> class {data?.className}</span> with{" "}
          <span className="font-bold">tutor {data?.tutorName}</span>.
        </div>
        <div className="flex items-center justify-end gap-5 mt-10">
          <DeniedBtn onClick={handleCancelRequest} className="max-w-[160px]">
            Cancel
          </DeniedBtn>
          <SecondaryBtn
            onClick={() => {
              setSetshowCancelDialog(false);
            }}
            className="max-w-[160px]"
          >
            Close
          </SecondaryBtn>
        </div>
      </PopupTemplate>

      <DeniedBtn
        onClick={() => {
          setSetshowCancelDialog(true);
        }}
      >
        Cancel
      </DeniedBtn>
    </div>
  );
};
