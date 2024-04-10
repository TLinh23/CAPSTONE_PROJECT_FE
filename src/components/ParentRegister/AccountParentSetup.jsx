import React from "react";
import Title from "../common/Title";
import PrimaryInput from "../common/PrimaryInput";
import PrimaryBtn from "../common/PrimaryBtn";

function AccountParentSetup(props) {
  const { setActiveTab, formilk } = props;

  return (
    <div className="bg-white block-border">
      <Title>Account Setup</Title>
      <div className="max-w-[1200px] grid grid-cols-37 gap-6 mt-8">
        <div>
          Email <span className="text-red-500">*</span>
        </div>
        <PrimaryInput
          id="Email"
          classNameInput={`${
            formilk.touched.Email && formilk.errors.Email
              ? "border border-red-500"
              : ""
          }`}
          placeholder="name@company.com"
          onChange={formilk.handleChange}
          onBlur={formilk.handleBlur}
          value={formilk.values.Email}
          isError={formilk.touched.Email && formilk.errors.Email}
          messageError={formilk.errors.Email}
        />
        <div>
          Password <span className="text-red-500">*</span>
        </div>
        <PrimaryInput
          id="Password"
          type="password"
          classNameInput={`${
            formilk.touched.Password && formilk.errors.Password
              ? "border border-red-500"
              : ""
          }`}
          placeholder="••••••••"
          onChange={formilk.handleChange}
          onBlur={formilk.handleBlur}
          value={formilk.values.Password}
          isError={formilk.touched.Password && formilk.errors.Password}
          messageError={formilk.errors.Password}
        />
        <div>
          Password Confirm <span className="text-red-500">*</span>
        </div>
        <PrimaryInput
          id="RePassword"
          type="password"
          classNameInput={`${
            formilk.values.Password !== formilk.values.RePassword
              ? "border border-red-500"
              : ""
          }`}
          placeholder="••••••••"
          onChange={formilk.handleChange}
          onBlur={formilk.handleBlur}
          value={formilk.values.RePassword}
          isError={
            formilk.values.Password !== formilk.values.RePassword &&
            formilk.values.RePassword
          }
          messageError={"Password not match"}
        />
      </div>
      <div className="max-w-[1200px] flex flex-col justify-center items-center mt-10">
        <PrimaryBtn
          onClick={() => {
            setActiveTab("information");
          }}
          className="!w-[160px]"
          disabled={formilk.values.Password !== formilk.values.RePassword}
        >
          Continue
        </PrimaryBtn>
      </div>
    </div>
  );
}

export default AccountParentSetup;
