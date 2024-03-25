import React, { useState } from "react";
import ParentProfileDetail from "./Parent/ParentProfileDetail";
import { useParams } from "react-router-dom";
import { useQueries } from "react-query";
import { getListTodoWithObj } from "src/apis/tutor-module";

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
          setDataProfileDetail({
            id: 4,
            roleKey: "parent",
            phone: "0916324234",
            address: "nghia dia",
          });
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
      {dataProfileDetail?.roleKey === "tutor" && <div>Tutor</div>}
      {dataProfileDetail?.roleKey === "staff" && <div>Staff</div>}
    </div>
  );
}

export default ViewProfileDetail;
