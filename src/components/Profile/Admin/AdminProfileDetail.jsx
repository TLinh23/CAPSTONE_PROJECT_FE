import React, { useState } from "react";
import ProfileHeader from "../ProfileHeader";
import PrimaryInput from "src/components/common/PrimaryInput";
import { format } from "date-fns";

function AdminProfileDetail(props) {
  const { dataProfileDetail } = props;
  return (
    <div className="bg-[#ffffff] block-border">
      <ProfileHeader title="Personal information" />
      <div className="grid grid-cols-1 gap-4 mt-5 md:grid-cols-37">
        <div className="w-full h-auto">
          <div className="flex flex-col items-center justify-between">
            <div>
              <div className="mb-5 text-xl font-semibold text-center">
                Avatar
              </div>
              <div className="flex items-center justify-center w-[200px] h-[200px]">
                <img
                  className="object-cover w-full h-full rounded"
                  src={
                    dataProfileDetail?.userAvater || "/images/logo-default.png"
                  }
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="mt-5">Role: Admin</div>
          <div className="mt-3">Email: vuvanduc@gmail.com</div>
        </div>
        <div className="flex flex-col gap-4">
          <PrimaryInput
            title={
              <p>
                Full name <span className="text-red-500">*</span>
              </p>
            }
            placeholder="Enter first name"
            value={
              dataProfileDetail?.fullName ? dataProfileDetail?.fullName : ""
            }
            readOnly
          />
          <PrimaryInput
            title="Phone number"
            placeholder="Enter phone number"
            value={dataProfileDetail?.phone ? dataProfileDetail?.phone : ""}
            readOnly
          />

          <PrimaryInput
            title="Gender"
            value={dataProfileDetail?.gender ? dataProfileDetail?.gender : ""}
            readOnly
          />

          <PrimaryInput
            title="Address"
            value={dataProfileDetail?.address ? dataProfileDetail?.address : ""}
            readOnly
          />

          <PrimaryInput
            title="Birth date"
            value={
              dataProfileDetail?.dob
                ? format(new Date(dataProfileDetail?.dob), "dd-MM-yyyy")
                : ""
            }
            readOnly
          />
        </div>
      </div>
    </div>
  );
}

export default AdminProfileDetail;
