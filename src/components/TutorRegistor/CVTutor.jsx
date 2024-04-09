import React, { useState } from "react";
import Title from "../common/Title";
import PrimaryInput from "../common/PrimaryInput";
import SecondaryBtn from "../common/SecondaryBtn";
import PrimaryBtn from "../common/PrimaryBtn";
import PrimaryInputCheckbox from "../common/PrimaryInputCheckbox";

function CVTutor({ setActiveTab }) {
  const [isConfirmCreate, setIsConfirmCreate] = useState(false);
  return (
    <div>
      <Title>Your CV</Title>
      <div className="max-w-[1200px] grid grid-cols-37 gap-6 mt-8">
        <div>Education level</div>
        <PrimaryInput />
        <div>School</div>
        <PrimaryInput />
        <div>Graduation Year</div>
        <PrimaryInput />
        <div>Upload CV</div>
        <input type="file" />
      </div>
      <div className="flex items-center gap-5 mt-5">
        <PrimaryInputCheckbox
          accessoriesRight={
            <p>
              I guarantee that my information is true and share it with the
              website
            </p>
          }
          checked={isConfirmCreate}
          onChange={() => {
            setIsConfirmCreate(!isConfirmCreate);
          }}
        />
      </div>
      <div className="max-w-[1200px] flex gap-5 justify-center items-center mt-10">
        <SecondaryBtn
          onClick={() => {
            setActiveTab("information");
          }}
          className="!w-[160px]"
        >
          Back
        </SecondaryBtn>
        <PrimaryBtn onClick={() => {}} className="!w-[160px]">
          Create
        </PrimaryBtn>
      </div>
    </div>
  );
}

export default CVTutor;
