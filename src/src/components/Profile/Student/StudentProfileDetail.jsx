import React, { useState } from "react";
import ProfileHeader from "../ProfileHeader";
import PrimaryInput from "src/components/common/PrimaryInput";
import PrimarySmallTitle from "src/components/common/PrimarySmallTitle";
import { format } from "date-fns";

function StudentProfileDetail(props) {
  const { dataProfileDetail } = props;
  const [staffAccountObject, setStaffAccountObject] = useState(undefined);
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
              <div className="flex items-center justify-center border rounded border-primary w-[200px] h-[200px]">
                <img
                  className="object-cover w-full h-full rounded"
                  src="https://vcdn-thethao.vnecdn.net/2023/09/03/ronaldo-850-jpeg-1693687478-1789-1693688039.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="mt-5">Role: Student</div>
          <div className="mt-3">Email: ducucucucu@gmail.com</div>
        </div>
        <div className="flex flex-col gap-4">
          <PrimaryInput
            title={
              <p>
                Student name <span className="text-red-500">*</span>
              </p>
            }
            placeholder="Enter first name"
            value={
              staffAccountObject?.userName ? staffAccountObject?.userName : ""
            }
            readOnly
          />
          <PrimaryInput
            title="Student phone number"
            placeholder="Enter phone number"
            type="number"
            value={staffAccountObject?.phone ? staffAccountObject?.phone : ""}
            readOnly
          />
          <PrimaryInput
            title="Parent name"
            placeholder="Enter phone number"
            type="number"
            value={staffAccountObject?.phone ? staffAccountObject?.phone : ""}
            readOnly
          />
          <PrimaryInput
            title="Parent phone number"
            placeholder="Enter phone number"
            type="number"
            value={staffAccountObject?.phone ? staffAccountObject?.phone : ""}
            readOnly
          />
          <PrimaryInput
            title="Grade"
            type="number"
            value={staffAccountObject?.phone ? staffAccountObject?.phone : ""}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}

export default StudentProfileDetail;
