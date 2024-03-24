import React, { useState } from "react";
import PrimaryBtn from "src/components/common/PrimaryBtn";
import PrimaryInputCheckbox from "src/components/common/PrimaryInputCheckbox";
import PrimaryTextArea from "src/components/common/PrimaryTextArea";
import SecondaryBtn from "src/components/common/SecondaryBtn";
import SmallTitle from "src/components/common/SmallTitle";

function OrderRequestDescription({ setActiveTab }) {
  const [isConfirmRequest, setIsConfirmRequest] = useState(false);
  return (
    <div>
      <SmallTitle>Submit description to send your order request</SmallTitle>
      <div className="flex flex-col gap-3 mt-5 md:max-w-[1000px]">
        <div>
          You need to provide the information to start working on your order:
        </div>
        <div>
          1.Writing your teaching description here. Do you have anything in mind
          ?
        </div>
        <PrimaryTextArea />
        <div>2.Confirm</div>
        <div className="flex items-center gap-2">
          <PrimaryInputCheckbox
            checked={isConfirmRequest}
            onChange={() => {
              setIsConfirmRequest(!isConfirmRequest);
            }}
          />
          <p className="whitespace-nowrap">
            The information I provided is accurate and complete.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-3 mt-10">
        <SecondaryBtn
          onClick={() => {
            setActiveTab("summary");
          }}
          className="max-w-[200px]"
        >
          Back
        </SecondaryBtn>
        <PrimaryBtn
          onClick={() => {
            console.log("Do send");
          }}
          className="max-w-[200px]"
        >
          Send
        </PrimaryBtn>
      </div>
    </div>
  );
}

export default OrderRequestDescription;
