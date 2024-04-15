import React, { useEffect, useState } from "react";
import { useQueries } from "react-query";
import { getListSubjects } from "src/apis/subject-module";
import FilterDropDown from "src/components/common/FilterDropDown";
import PrimaryBtn from "src/components/common/PrimaryBtn";
import PrimaryInput from "src/components/common/PrimaryInput";
import SmallTitle from "src/components/common/SmallTitle";
import { STUDENT_LEVEL } from "src/constants/enumConstant";

function TutorCreateClassroomInfor(props) {
  const { setActiveTab, classRoomDetail, setClassRoomDetail } = props;
  const [studentLevelSelected, setStudentLevelSelected] = useState(undefined);
  const [listAllSubject, setListAllSubject] = useState(undefined);
  const [subjectSelected, setSubjectSelected] = useState(undefined);

  useQueries([
    {
      queryKey: ["getListSubjects"],
      queryFn: async () => {
        const queryObj = {};
        queryObj["PagingRequest.CurrentPage"] = 1;
        queryObj["PagingRequest.PageSize"] = 20;
        queryObj["Status"] = "CREATED";

        const response = await getListSubjects(queryObj);
        setListAllSubject(response?.data?.data);
        return response?.data;
      },
    },
  ]);

  useEffect(() => {
    if (studentLevelSelected) {
      setClassRoomDetail({
        ...classRoomDetail,
        classLevel: studentLevelSelected?.value,
      });
    }
  }, [studentLevelSelected]);

  useEffect(() => {
    if (subjectSelected) {
      setClassRoomDetail({
        ...classRoomDetail,
        subjectId: subjectSelected?.subjectId,
        subjectName: subjectSelected?.subjectName,
      });
    }
  }, [subjectSelected]);

  return (
    <div className="bg-white block-border">
      <SmallTitle className="!font-bold">Classroom Info</SmallTitle>
      <div className="max-w-[1200px] grid grid-cols-37 gap-6 mt-8">
        <div>
          Classroom name <span className="text-dangerous">*</span>
        </div>
        <PrimaryInput
          placeholder="Enter classroom name"
          onChange={(e) => {
            setClassRoomDetail({
              ...classRoomDetail,
              className: e.target.value,
            });
          }}
          value={classRoomDetail?.className || ""}
        />
        <div>
          Subject <span className="text-dangerous">*</span>
        </div>
        <FilterDropDown
          textDefault={classRoomDetail?.subjectName || "Select subject"}
          listDropdown={listAllSubject?.items}
          showing={subjectSelected}
          setShowing={setSubjectSelected}
        />
        <div>
          Level <span className="text-dangerous">*</span>
        </div>
        <FilterDropDown
          textDefault={classRoomDetail?.classLevel || "Select class level"}
          listDropdown={STUDENT_LEVEL}
          showing={studentLevelSelected}
          setShowing={setStudentLevelSelected}
        />
        <div>Price</div>
        <PrimaryInput
          type="number"
          placeholder="Enter classroom price"
          onChange={(e) => {
            setClassRoomDetail({
              ...classRoomDetail,
              price: e.target.value,
            });
          }}
          value={classRoomDetail?.price || ""}
        />
        <div>Max capacity</div>
        <PrimaryInput
          type="number"
          placeholder="Enter max capacity"
          onChange={(e) => {
            setClassRoomDetail({
              ...classRoomDetail,
              maxCapacity: Number(e.target.value),
            });
          }}
          value={classRoomDetail?.maxCapacity || ""}
        />
      </div>
      <div className="max-w-[1200px] flex gap-5 justify-center items-center mt-10">
        <PrimaryBtn
          onClick={() => {
            setActiveTab("time");
          }}
          className="!w-[160px]"
        >
          Continue
        </PrimaryBtn>
      </div>
    </div>
  );
}

export default TutorCreateClassroomInfor;
