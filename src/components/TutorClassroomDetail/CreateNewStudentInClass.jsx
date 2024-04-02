import React from "react";
import ProfileHeader from "../Profile/ProfileHeader";
import PrimaryInput from "../common/PrimaryInput";
import PrimaryBtn from "../common/PrimaryBtn";
import PrimaryInputCheckbox from "../common/PrimaryInputCheckbox";

function CreateNewStudentInClass() {
  return (
    <div>
      <ProfileHeader title="Add Student to Class" />
      <div className="mt-5 bg-white block-border">
        <div className="p-3 border rounded-md border-gray grid-cols-37">
          <div className="grid gap-3 grid-cols-37">
            <div>Parent Name:</div>
            <PrimaryInput placeholder="Enter parent name" />
            <div>Parent Phone:</div>
            <PrimaryInput placeholder="Enter parent phone" />
          </div>
          <div className="flex justify-center">
            <PrimaryBtn className="mt-3 !w-[150px]">Find</PrimaryBtn>
          </div>
        </div>
        <div className="p-3 mt-5">
          <div className="py-[14px] flex items-center gap-5 bg-[#2f8de415]">
            <p className="w-[5%] flex justify-center">
              <PrimaryInputCheckbox />
            </p>
            <p className="w-[7%] text-sm text-gray">No</p>
            <p className="w-[44%] text-sm text-gray">Student Name</p>
            <p className="w-[44%] text-sm text-gray">Student Phone</p>
          </div>
          <ListItem />
          <div className="flex justify-center">
            <PrimaryBtn className="mt-3 !w-[250px]">Add to Class</PrimaryBtn>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateNewStudentInClass;

function ListItem() {
  return (
    <div className="flex items-center gap-5 rounded-lg hover:bg-zinc-100 active:bg-zinc-300 py-[12px]">
      <div className="w-[5%] flex justify-center">
        <PrimaryInputCheckbox />
      </div>
      <p className="w-[7%] text-sm">1</p>
      <p className="w-[44%] text-sm truncate-2-line">Name</p>
      <p className="w-[44%] text-sm truncate-2-line">023633235</p>
    </div>
  );
}
