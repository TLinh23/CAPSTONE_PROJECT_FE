import React, { useEffect, useState } from "react";
import Title from "../../common/Title";
import PrimaryBtn from "src/components/common/PrimaryBtn";
import { Link, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const classId = params.get("id");
  const [studentSelected, setStudentSelected] = useState(undefined);
  const initialDateRange = {
    key: "selection",
  };
  const [dateRange, setDateRange] = useState([initialDateRange]);
  const [listHeader, setListHeader] = useState(undefined);
  const [listFormattedData, setListFormattedData] = useState(undefined);

  useQueries([
    {
      queryKey: ["getAssessmentClass", classId, studentSelected, dateRange],
      queryFn: async () => {
        const queryObj = {};
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
        setListHeader(undefined);
        setListFormattedData(undefined);
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

  useEffect(() => {
    if (listAssessment?.length > 0) {
      // @ts-ignore
      const uniqueDates = [...new Set(listAssessment.map((item) => item.date))];
      setListHeader(uniqueDates);
      const formattedData = {};
      listAssessment.forEach((item) => {
        if (!formattedData[item.studentId]) {
          formattedData[item.studentId] = {
            name: item.studentName,
          };
        }
        if (!formattedData[item.studentId][item.date || "-"]) {
          formattedData[item.studentId][item.date || "-"] = item;
        } else {
          const existingRecord =
            formattedData[item.studentId][item.date || "-"];
          if (item.evaluationId > existingRecord.evaluationId) {
            formattedData[item.studentId][item.date || "-"] = item;
          }
        }
      });
      setListFormattedData(formattedData);
    }
  }, [listAssessment]);

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
            setStudentSelected(undefined);
            setDateRange([initialDateRange]);
          }}
          className="max-w-[150px]"
        >
          Remove Filter
        </DeniedBtn>
      </div>

      <div className="flex items-center justify-center mt-5 bg-white block-border">
        {listHeader && listFormattedData ? (
          <div className="table-referral-style max-w-[768px] xl:max-w-[968px] 2xl:max-w-[1280px] overflow-auto">
            <table>
              <thead>
                <tr />
                <tr>
                  <td />
                  {listHeader &&
                    listHeader?.map((item, index) => (
                      <td key={index} className="text-center whitespace-nowrap">
                        {item ? format(new Date(item), "dd/MM/yyyy") : "---"}
                      </td>
                    ))}
                </tr>
              </thead>
              <tbody>
                {listFormattedData &&
                  Object.values(listFormattedData)?.map((item, index) => (
                    <TableSection
                      item={item}
                      key={index}
                      listHeader={listHeader}
                    />
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>No data</div>
        )}
      </div>
    </div>
  );
}

export default ListAssessmentManager;

const TableSection = ({ item, listHeader }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [showingData, setShowingData] = useState(undefined);
  return (
    <>
      <tr>
        <td className="whitespace-nowrap">{item?.name || "---"}</td>
        {listHeader.map((date, index) => {
          const dataForDate = item[date];
          return (
            <>
              <td key={index} className="text-center whitespace-nowrap">
                {dataForDate ? (
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      setShowDialog(!showDialog);
                      setShowingData(dataForDate);
                    }}
                  >
                    <p>{dataForDate?.score}</p>
                  </div>
                ) : (
                  "-"
                )}
              </td>
            </>
          );
        })}
      </tr>
      <PopupTemplate
        title="Assessment Detail"
        setShowDialog={setShowDialog}
        showDialog={showDialog}
      >
        <div className="grid grid-cols-37 max-w-[1000px] mt-5 gap-x-5 gap-y-3 items-center">
          <div>Student</div>
          <PrimaryInput value={showingData?.studentName || ""} readOnly />
          <div>Class</div>
          <PrimaryInput value={showingData?.className || ""} readOnly />
          <div>Score</div>
          <PrimaryInput
            placeholder="Enter score rate"
            value={showingData?.score || ""}
            readOnly
          />
          <div>Date</div>
          <PrimaryInput
            placeholder="Enter score rate"
            value={
              showingData?.date
                ? format(new Date(showingData?.date), "dd-MM-yyyy")
                : "---"
            }
            readOnly
          />
          <div>Comment</div>
          <PrimaryTextArea
            rows={5}
            placeholder="Enter comment"
            value={showingData?.comment}
            readOnly
          />
        </div>
      </PopupTemplate>
    </>
  );
};
