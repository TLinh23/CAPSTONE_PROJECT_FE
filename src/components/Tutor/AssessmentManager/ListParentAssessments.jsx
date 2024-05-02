import React, { useEffect, useState } from "react";
import Title from "../../common/Title";
import { useLocation } from "react-router-dom";
import { useQueries } from "react-query";
import { getParentEvaluation } from "src/apis/evaluation-module";
import { useAuthContext } from "src/context/AuthContext";
import DateRangePickerModal from "src/components/common/DateRangePickerModal";
import FilterDropDown from "src/components/common/FilterDropDown";
import DeniedBtn from "src/components/common/DeniedBtn";
import { getProfileByIdDetail } from "src/apis/tutor-module";
import { format } from "date-fns";
import PopupTemplate from "src/components/common/PopupTemplate";
import PrimaryInput from "src/components/common/PrimaryInput";
import PrimaryTextArea from "src/components/common/PrimaryTextArea";
import { getClassByParent } from "src/apis/class-module";
import ClassNameFilterDropdown from "src/components/common/ClassNameFilterDropdown";

function ListParentAssessments() {
  const [listAssessment, setListAssessment] = useState(undefined);
  const { userId } = useAuthContext();
  const [studentSelected, setStudentSelected] = useState(undefined);
  const [listClassroom, setListClassroom] = useState(undefined);
  const [classSelected, setClassSelected] = useState(undefined);
  const initialDateRange = {
    key: "selection",
  };
  const [dateRange, setDateRange] = useState([initialDateRange]);
  const [dataProfileDetail, setDataProfileDetail] = useState(undefined);
  const [listHeader, setListHeader] = useState(undefined);
  const [listFormattedData, setListFormattedData] = useState(undefined);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const classId = params.get("id");

  useQueries([
    {
      queryKey: [
        "getAssessmentClass",
        classId,
        studentSelected,
        dateRange,
        classSelected,
      ],
      queryFn: async () => {
        const queryObj = {};
        queryObj["ClassId"] = classId;
        queryObj["ParentId"] = userId;
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
        if (classSelected) {
          queryObj["ClassId"] = classSelected?.classId;
        }
        const response = await getParentEvaluation(queryObj);
        setListHeader(undefined);
        setListFormattedData(undefined);
        setListAssessment(response?.data?.data);
        return response?.data;
      },
      enabled: !!classId && !!userId,
    },
    {
      queryKey: ["getProfile", userId],
      queryFn: async () => {
        if (userId) {
          const response = await getProfileByIdDetail(userId);
          setDataProfileDetail(response?.data?.data);
          return response?.data;
        }
      },
      enabled: !!userId,
    },
    {
      queryKey: ["getListParentClassAssest"],
      queryFn: async () => {
        const queryObj = {};
        queryObj["PagingRequest.CurrentPage"] = 1;
        queryObj["PagingRequest.PageSize"] = 99;
        queryObj["ParentId"] = userId;
        queryObj["Status"] = "ACTIVE";
        const response = await getClassByParent(queryObj);
        setListClassroom(response?.data?.data);
        return response?.data;
      },
      enabled: !!userId,
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

  const [defaultClassObject, setDefaultClassObject] = useState(undefined);
  useEffect(() => {
    if (listClassroom?.items?.length > 0) {
      const default1 = listClassroom?.items?.find(
        (item) => item?.classId?.toString() === classId.toString()
      );
      setDefaultClassObject(default1);
    }
  }, [listClassroom, classId]);

  return (
    <div className="p-4 mx-auto">
      <div className="flex items-center justify-between gap-3">
        <Title>Class Assessment</Title>
      </div>
      <div className="flex items-center justify-between gap-5 mt-5">
        <div className="flex items-center gap-5">
          <DateRangePickerModal
            dateRange={dateRange}
            setDateRange={setDateRange}
          />
          <FilterDropDown
            textDefault={
              dataProfileDetail?.students?.length !== 0
                ? "Select student"
                : "No student available"
            }
            listDropdown={dataProfileDetail?.students || []}
            showing={studentSelected}
            setShowing={setStudentSelected}
            className="!w-[240px]"
          />
          <ClassNameFilterDropdown
            textDefault={defaultClassObject?.className || "Select class"}
            listDropdown={listClassroom?.items || []}
            showing={classSelected}
            setShowing={setClassSelected}
            className="!w-[240px]"
          />
        </div>
        <DeniedBtn
          onClick={() => {
            setStudentSelected(undefined);
            setClassSelected(undefined);
            setDateRange([initialDateRange]);
          }}
          className="max-w-[150px]"
        >
          Remove Filter
        </DeniedBtn>
      </div>

      <div className="flex items-center justify-center mt-5 bg-white block-border">
        {listHeader && listFormattedData ? (
          <div className="table-referral-style max-w-[968px] xl:max-w-[1060px] 2xl:max-w-[1280px] overflow-auto">
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

export default ListParentAssessments;

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
        <div className="grid grid-cols-37 max-w-[768px] xl:max-w-[968px] 2xl:max-w-[1280px] mt-5 gap-x-5 gap-y-3 items-center">
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
