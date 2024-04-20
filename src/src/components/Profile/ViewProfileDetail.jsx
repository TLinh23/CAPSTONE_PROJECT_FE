import React, { useState } from "react";
import ParentProfileDetail from "./Parent/ParentProfileDetail";
import { useParams } from "react-router-dom";
import { useQueries } from "react-query";
import TutorProfileDetail from "./Tutor/TutorProfileDetail";
import StaffProfileDetail from "./Staff/StaffProfileDetail";
import { ROLE_NAME } from "src/constants/constants";
import { getProfileByIdDetail } from "src/apis/tutor-module";
import AdminProfileDetail from "./Admin/AdminProfileDetail";

function ViewProfileDetail() {
  const { id } = useParams();
  const [dataProfileDetail, setDataProfileDetail] = useState(undefined);

  useQueries([
    {
      queryKey: ["getProfile", id],
      queryFn: async () => {
        if (id) {
          const response = await getProfileByIdDetail(id);
          setDataProfileDetail(response?.data?.data);
          return response?.data;
        }
      },
      enabled: !!id,
    },
  ]);

  return (
    <div>
      {dataProfileDetail?.account?.roleName === ROLE_NAME.PARENT && (
        <ParentProfileDetail dataProfileDetail={dataProfileDetail} />
      )}
      {dataProfileDetail?.account?.roleName === ROLE_NAME.TUTOR && (
        <TutorProfileDetail dataProfileDetail={dataProfileDetail} />
      )}
      {dataProfileDetail?.account?.roleName === ROLE_NAME.STAFF && (
        <StaffProfileDetail dataProfileDetail={dataProfileDetail} />
      )}
      {/* {dataProfileDetail?.roleKey === ROLE_NAME.STUDENT && (
        <StudentProfileDetail dataProfileDetail={dataProfileDetail} />
      )} */}
      {dataProfileDetail?.account?.roleName === ROLE_NAME.ADMIN && (
        <AdminProfileDetail dataProfileDetail={dataProfileDetail} />
      )}
    </div>
  );
}

export default ViewProfileDetail;
