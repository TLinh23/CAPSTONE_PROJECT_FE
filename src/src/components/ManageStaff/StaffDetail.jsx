import React from "react";
import PrimaryInput from "../common/PrimaryInput";
import FilterDropDown from "../common/FilterDropDown";
import { LIST_GENDER_VALUE } from "src/constants/constants";
import { format } from "date-fns";

function StaffDetail(props) {
  const { staffDetail } = props;
  return (
    <div className="grid gap-5 grid-cols-37">
      <div className="w-full h-auto">
        <div className="flex flex-col items-center justify-between h-full">
          <div>
            <div className="mb-5 text-xl font-semibold text-center">Avatar</div>
            <div className="flex items-center justify-center rounded w-[200px] h-[200px]">
              <img
                src={staffDetail?.userAvatar || "/images/logo-default.png"}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <PrimaryInput
          title={
            <div>
              Full Name <span className="text-red-500">*</span>
            </div>
          }
          required
          placeholder="Enter full name"
          value={staffDetail?.fullName || ""}
          readOnly
        />

        <div className="grid grid-cols-2 gap-5">
          <PrimaryInput
            title={
              <div>
                Email <span className="text-dangerous">*</span>
              </div>
            }
            id="Email"
            placeholder="name@company.com"
            value={staffDetail?.email}
            readOnly
          />
          <PrimaryInput
            title={
              <div>
                Phone <span className="text-red-500">*</span>
              </div>
            }
            required
            placeholder="Enter phone number"
            id="Phone"
            value={staffDetail?.phone || ""}
            readOnly
          />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <FilterDropDown
            title="Gender"
            listDropdown={LIST_GENDER_VALUE}
            showing={undefined}
            setShowing={undefined}
            textDefault={staffDetail?.gender}
            disabled
          />
          <PrimaryInput
            title="Birth date"
            value={
              staffDetail?.dob
                ? format(new Date(staffDetail?.dob), "dd-MM-yyyy")
                : ""
            }
            readOnly
          />
        </div>
        <PrimaryInput
          title={<div>Address</div>}
          placeholder="Enter address"
          id="Address"
          value={staffDetail.address || ""}
          readOnly
        />
      </div>
    </div>
  );
}

export default StaffDetail;
