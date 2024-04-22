import React, { useState } from "react";
import Pagination from "../../common/Pagination";
import Table from "../../common/Table";
import Title from "../../common/Title";
import PrimaryBtn from "src/components/common/PrimaryBtn";
import RenderStatus from "src/components/common/RenderStatus";
import { Link } from "react-router-dom";
import ShowPasswordIcon from "src/components/icons/ShowPasswordIcon";
import PopupTemplate from "src/components/common/PopupTemplate";
import PrimaryInput from "src/components/common/PrimaryInput";
import PrimaryTextArea from "src/components/common/PrimaryTextArea";
import { useQueries } from "react-query";
import { getParentEvaluation } from "src/apis/evaluation-module";
import { useAuthContext } from "src/context/AuthContext";

function ListParentAssessments() {
  const [listAssessment, setListAssessment] = useState(undefined);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { userId } = useAuthContext();

  useQueries([
    {
      queryKey: ["getClassDetail", page, limit, userId],
      queryFn: async () => {
        const queryObj = {};
        queryObj["PagingRequest.CurrentPage"] = page;
        queryObj["PagingRequest.PageSize"] = limit;
        queryObj["ParentId"] = userId;

        const response = await getParentEvaluation(queryObj);
        setListAssessment(response?.data?.data);
        return response?.data;
      },
      enabled: !!userId,
    },
  ]);

  return (
    <div className="p-4 mx-auto">
      <div className="flex items-center justify-between gap-3">
        <Title>Class Assessment</Title>
      </div>

      <div className="mt-5 bg-white table-style block-border">
        <Table
          pageSizePagination={limit}
          columns={transactionColumns}
          data={listAssessment?.items}
        />
      </div>

      <Pagination
        pageSize={limit}
        setPageSize={setLimit}
        currentPage={page}
        setCurrentPage={setPage}
        totalItems={10}
      />
    </div>
  );
}

export default ListParentAssessments;

const transactionColumns = [
  {
    Header: " ",
    columns: [
      {
        Header: "No",
        accessor: "evaluationId",
      },
      {
        Header: "Student",
        accessor: "studentName",
      },
      {
        Header: "Class",
        accessor: "className",
      },
      {
        Header: "Score",
        accessor: "score",
      },
      {
        Header: "Comment",
        accessor: "comment",
      },
      {
        Header: "Status",
        accessor: (data) => (
          <RenderStatus status={data.status}>{data.status}</RenderStatus>
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
  const [showDialog, setShowDialog] = useState(false);
  return (
    <div>
      <ShowPasswordIcon
        className="cursor-pointer"
        onClick={() => {
          setShowDialog(true);
        }}
      />
      <PopupTemplate
        title="Assessment Detail"
        setShowDialog={setShowDialog}
        showDialog={showDialog}
      >
        <div className="grid grid-cols-37 max-w-[1000px] mt-5 gap-x-5 gap-y-3 items-center">
          <div>Student</div>
          <PrimaryInput value={data?.studentName || ""} readOnly />
          <div>Class</div>
          <PrimaryInput value={data?.className || ""} readOnly />
          <div>Score</div>
          <PrimaryInput
            placeholder="Enter score rate"
            value={data?.score || ""}
            readOnly
          />
          <div>Coment</div>
          <PrimaryTextArea
            rows={5}
            placeholder="Enter comment"
            value={data?.comment}
            readOnly
          />
        </div>
      </PopupTemplate>
    </div>
  );
};
