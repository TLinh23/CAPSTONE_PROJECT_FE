import React, { useState } from "react";
import ParentProfileDetail from "./Parent/ParentProfileDetail";
import { useParams } from "react-router-dom";
import { useQueries } from "react-query";
import { getListTodoWithObj } from "src/apis/tutor-module";
import TutorProfileDetail from "./Tutor/TutorProfileDetail";
import StaffProfileDetail from "./Staff/StaffProfileDetail";

const parentTest = {
  id: 4,
  roleKey: "parent",
  phone: "0916324234",
  address: "nghia dia",
};
const tutorTest = {
  id: 3,
  roleKey: "tutor",
  phone: "0916324234",
  address: "nghia dia",
};
const staffTest = {
  id: 2,
  roleKey: "staff",
  phone: "0916324234",
  address: "nghia dia",
};
function ViewProfileDetail() {
  const { id } = useParams();
  const [dataProfileDetail, setDataProfileDetail] = useState(undefined);

  // Call API here, check role of user after call api and after that render component
  useQueries([
    {
      queryKey: ["getProfile", id],
      queryFn: async () => {
        if (id) {
          const response = await getListTodoWithObj(id);
          setDataProfileDetail(staffTest);
          return response?.data;
        }
      },
      enabled: !!id,
    },
  ]);

  return (
    <div>
      {dataProfileDetail?.roleKey === "parent" && (
        <ParentProfileDetail dataProfileDetail={dataProfileDetail} />
      )}
      {dataProfileDetail?.roleKey === "tutor" && (
        <TutorProfileDetail dataProfileDetail={dataProfileDetail} />
      )}
      {dataProfileDetail?.roleKey === "staff" && (
        <StaffProfileDetail dataProfileDetail={dataProfileDetail} />
      )}
    </div>
  );
}

export default ViewProfileDetail;
