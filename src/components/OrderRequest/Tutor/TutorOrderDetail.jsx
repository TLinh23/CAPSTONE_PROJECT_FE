import React from "react";
import HeaderDetail from "src/components/common/HeaderDetail";

function TutorOrderDetail() {
  return (
    <HeaderDetail>
      <div className="bg-white block-border">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <RequestTitle>
              Tutor: <RequestDescription>Nguyen Thi Thom</RequestDescription>
            </RequestTitle>
            <RequestTitle>
              Subject: <RequestDescription>Math</RequestDescription>
            </RequestTitle>
          </div>
          <div>
            <RequestTitle>
              Total Price: <RequestDescription>12.2$</RequestDescription>
            </RequestTitle>
            <RequestTitle>
              Status: <RequestDescription>Pending</RequestDescription>
            </RequestTitle>
          </div>
          <div>
            <RequestTitle>
              Parent: <RequestDescription>Nguyen Van Nam</RequestDescription>
            </RequestTitle>
            <RequestTitle>
              Grade: <RequestDescription>12</RequestDescription>
            </RequestTitle>
          </div>
        </div>
        <RequestTitle className="mt-3">Request Type:</RequestTitle>
        <RequestDescription>Bla blal bobobo</RequestDescription>
      </div>
    </HeaderDetail>
  );
}

export default TutorOrderDetail;

function RequestTitle({ children, className = "" }) {
  return <div className={`text-lg font-semibold ${className}`}>{children}</div>;
}

function RequestDescription({ children }) {
  return <span className="text-sm font-normal">{children}</span>;
}
