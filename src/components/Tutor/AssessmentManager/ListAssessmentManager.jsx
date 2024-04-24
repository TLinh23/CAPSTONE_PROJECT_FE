import React, { useState } from "react";
import Pagination from "../../common/Pagination";
import Table from "../../common/Table";
import Title from "../../common/Title";
import PrimaryBtn from "src/components/common/PrimaryBtn";
import RenderStatus from "src/components/common/RenderStatus";
import { Link, useLocation } from "react-router-dom";
import ShowPasswordIcon from "src/components/icons/ShowPasswordIcon";
import PopupTemplate from "src/components/common/PopupTemplate";
import PrimaryInput from "src/components/common/PrimaryInput";
import PrimaryTextArea from "src/components/common/PrimaryTextArea";
import { useQueries } from "react-query";
import { getAllEvaluation } from "src/apis/evaluation-module";
import { format } from "date-fns";
import FilterDropDown from "src/components/common/FilterDropDown";
import DeniedBtn from "src/components/common/DeniedBtn";
import { getClassDetailData } from "src/apis/class-module";
import DateRangePickerModal from "src/components/common/DateRangePickerModal";

function ListAssessmentManager() {
  const [listAssessment, setListAssessment] = useState(undefined);
  const [classDetail, setClassDetail] = useState(undefined);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const classId = params.get("id");
  const [studentSelected, setStudentSelected] = useState(undefined);
  const initialDateRange = {
    key: "selection",
  };
  const [dateRange, setDateRange] = useState([initialDateRange]);

  useQueries([
    {
      queryKey: [
        "getAssessmentClass",
        page,
        limit,
        classId,
        studentSelected,
        dateRange,
      ],
      queryFn: async () => {
        const queryObj = {};
        queryObj["PagingRequest.CurrentPage"] = page;
        queryObj["PagingRequest.PageSize"] = limit;
        queryObj["ClassId"] = classId;
        if (studentSelected) {
          queryObj["StudentId"] = studentSelected?.studentId;
        }
        if (dateRange && dateRange[0]?.startDate) {
          queryObj["StartDate"] = format(
            new Date(dateRange[0]?.startDate),
            "MM-dd-yyyy"
          );
          queryObj["EndDate"] = format(
            new Date(dateRange[0]?.endDate),
            "MM-dd-yyyy"
          );
        }
        const response = await getAllEvaluation(queryObj);
        setListAssessment(response?.data?.data);
        return response?.data;
      },
      enabled: !!classId,
    },
    {
      queryKey: ["getClassDetail", classId],
      queryFn: async () => {
        const response = await getClassDetailData(classId);
        setClassDetail(response?.data?.data);
        return response?.data;
      },
      enabled: !!classId,
    },
  ]);

  return (
    <div className="p-4 mx-auto">
      <div className="flex items-center justify-between gap-3">
        <Title>Class Assessment</Title>
        <Link to={`/assessesments/create`}>
          <PrimaryBtn className="!w-[220px]">Create Assessment</PrimaryBtn>
        </Link>
      </div>
      <div className="flex items-center justify-between gap-5 mt-5">
        <div className="flex items-center gap-5">
          <DateRangePickerModal
            dateRange={dateRange}
            setDateRange={setDateRange}
          />
          <FilterDropDown
            textDefault="Select student"
            listDropdown={classDetail?.studentInformationDto || []}
            showing={studentSelected}
            setShowing={setStudentSelected}
            className="!w-[240px]"
          />
        </div>
        <DeniedBtn
          onClick={() => {
            setPage(1);
            setLimit(10);
            setStudentSelected(undefined);
            setDateRange([initialDateRange]);
          }}
          className="max-w-[150px]"
        >
          Remove Filter
        </DeniedBtn>
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

export default ListAssessmentManager;

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
        accessor: (data) => (
          <div className="truncate-2-line">{data?.comment}</div>
        ),
      },
      {
        Header: "Date",
        accessor: (data) => (
          <div>
            {data?.date ? format(new Date(data?.date), "dd-MM-yyyy") : "---"}
          </div>
        ),
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
          <div>Date</div>
          <PrimaryInput
            placeholder="Enter score rate"
            value={
              data?.date ? format(new Date(data?.date), "dd-MM-yyyy") : "---"
            }
            readOnly
          />
          <div>Comment</div>
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
