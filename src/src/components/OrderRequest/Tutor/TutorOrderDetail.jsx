import React, { useState } from "react";
import { useQueries } from "react-query";
import { useParams } from "react-router-dom";
import { getRequestDetailForTutor } from "src/apis/class-module";
import HeaderDetail from "src/components/common/HeaderDetail";
import RenderStatus from "src/components/common/RenderStatus";

function TutorOrderDetail() {
  const { id } = useParams();
  const [orderRequestDetail, setOrderRequestDetail] = useState(undefined);
  useQueries([
    {
      queryKey: ["getRequestDetailForTutor", id],
      queryFn: async () => {
        const response = await getRequestDetailForTutor(id);
        setOrderRequestDetail(response?.data?.data);
        return response?.data;
      },
      enabled: !!id,
    },
  ]);

  return (
    <HeaderDetail>
      <div className="bg-white block-border">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <RequestTitle>
              Tutor:{" "}
              <RequestDescription>
                {orderRequestDetail?.tutorName}
              </RequestDescription>
            </RequestTitle>
            <RequestTitle>
              Subject:{" "}
              <RequestDescription>
                {orderRequestDetail?.subjectName}
              </RequestDescription>
            </RequestTitle>
          </div>
          <div>
            <RequestTitle>
              Total Price:{" "}
              <RequestDescription>
                {orderRequestDetail?.price || "---"}
              </RequestDescription>
            </RequestTitle>
            <RequestTitle>
              Status:{" "}
              <RenderStatus
                className="text-sm"
                status={orderRequestDetail?.status}
              >
                {orderRequestDetail?.status}
              </RenderStatus>
            </RequestTitle>
          </div>
          <div>
            <RequestTitle>
              Parent:{" "}
              <RequestDescription>
                {orderRequestDetail?.parentName}
              </RequestDescription>
            </RequestTitle>
            <RequestTitle>
              Grade:{" "}
              <RequestDescription>
                {orderRequestDetail?.level}
              </RequestDescription>
            </RequestTitle>
          </div>
        </div>
        <RequestTitle className="mt-3">Request Type:</RequestTitle>
        <RequestDescription>
          {orderRequestDetail?.requestType}
        </RequestDescription>
      </div>
    </HeaderDetail>
  );
}

export default TutorOrderDetail;

function RequestTitle({ children, className = "" }) {
  return (
    <div
      className={`text-lg font-semibold flex items-center gap-3 ${className}`}
    >
      {children}
    </div>
  );
}

function RequestDescription({ children }) {
  return <span className="text-sm font-normal">{children}</span>;
}
