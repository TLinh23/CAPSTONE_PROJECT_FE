import React from "react";
import Title from "../common/Title";
import PrimaryInput from "../common/PrimaryInput";
import PrimaryBtn from "../common/PrimaryBtn";

function AccountSetup({ setActiveTab }) {
  return (
    <div>
      <Title>Account Setup</Title>
      <div className="max-w-[1200px] grid grid-cols-37 gap-6 mt-8">
        <div>Email</div>
        <PrimaryInput />
        <div>Password</div>
        <PrimaryInput />
        <div>Password Confirm</div>
        <PrimaryInput />
      </div>
      <div className="max-w-[1200px] flex flex-col justify-center items-center mt-10">
        <PrimaryBtn
          onClick={() => {
            setActiveTab("information");
          }}
          className="!w-[160px]"
        >
          Continue
        </PrimaryBtn>
      </div>
    </div>
  );
}

export default AccountSetup;
