import React from "react";
import PrimaryBtn from "src/components/common/PrimaryBtn";
import PrimaryInput from "src/components/common/PrimaryInput";
import SmallTitle from "src/components/common/SmallTitle";

function OrderRequestInfo({
  setActiveTab,
  newOrderRequest,
  setNewOrderRequest,
}) {
  return (
    <div>
      <SmallTitle>Request Info</SmallTitle>
      <div className="flex flex-col gap-3 mt-5">
        <div className="grid grid-cols-2080">
          <div>Subject</div>
          <PrimaryInput
            className="max-w-[700px]"
            onChange={(e) => {
              setNewOrderRequest({
                ...newOrderRequest,
                subjectName: e.target.value,
              });
            }}
            value={newOrderRequest?.subjectName || ""}
          />
        </div>
        <div className="grid grid-cols-2080">
          <div>Location</div>
          <PrimaryInput
            className="max-w-[700px]"
            onChange={(e) => {
              setNewOrderRequest({
                ...newOrderRequest,
                location: e.target.value,
              });
            }}
            value={newOrderRequest?.location || ""}
          />
        </div>
        <div className="grid grid-cols-2080">
          <div>Phone</div>
          <PrimaryInput
            className="max-w-[700px]"
            onChange={(e) => {
              setNewOrderRequest({
                ...newOrderRequest,
                phone: e.target.value,
              });
            }}
            value={newOrderRequest?.phone || ""}
          />
        </div>
      </div>
      <div className="flex items-center justify-center gap-3 mt-10">
        <PrimaryBtn
          onClick={() => {
            setActiveTab("summary");
          }}
          className="max-w-[200px]"
        >
          Continue
        </PrimaryBtn>
      </div>
    </div>
  );
}

export default OrderRequestInfo;
