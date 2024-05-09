import React, { useState } from "react";
import Title from "../common/Title";
import PrimaryInput from "../common/PrimaryInput";
import SecondaryBtn from "../common/SecondaryBtn";
import PrimaryBtn from "../common/PrimaryBtn";
import PrimaryInputCheckbox from "../common/PrimaryInputCheckbox";

function CVTutor({
  setActiveTab,
  formilk,
  otherInformation,
  setOtherInformation,
}) {
  const [isConfirmCreate, setIsConfirmCreate] = useState(false);
  return (
    <div className="bg-white block-border">
      <Title>Your CV</Title>
      <div className="max-w-[1200px] grid grid-cols-37 gap-6 mt-8">
        <div>Education level</div>
        <PrimaryInput
          placeholder="Enter educational level"
          id="EducationLevel"
          classNameInput={`${
            formilk.touched.EducationLevel && formilk.errors.EducationLevel
              ? "border border-red-500"
              : ""
          }`}
          onChange={formilk.handleChange}
          onBlur={formilk.handleBlur}
          value={formilk.values.EducationLevel || ""}
          isError={
            formilk.touched.EducationLevel && formilk.errors.EducationLevel
          }
          messageError={formilk.errors.EducationLevel}
        />
        <div>School</div>
        <PrimaryInput
          placeholder="Enter school"
          id="School"
          classNameInput={`${
            formilk.touched.School && formilk.errors.School
              ? "border border-red-500"
              : ""
          }`}
          onChange={formilk.handleChange}
          onBlur={formilk.handleBlur}
          value={formilk.values.School || ""}
          isError={formilk.touched.School && formilk.errors.School}
          messageError={formilk.errors.School}
        />
        <div>Graduation Year</div>
        <PrimaryInput
          placeholder="Enter graduation year"
          id="GraduationYear"
          classNameInput={`${
            formilk.touched.GraduationYear && formilk.errors.GraduationYear
              ? "border border-red-500"
              : ""
          }`}
          onChange={formilk.handleChange}
          onBlur={formilk.handleBlur}
          value={formilk.values.GraduationYear || ""}
          isError={
            formilk.touched.GraduationYear && formilk.errors.GraduationYear
          }
          messageError={formilk.errors.GraduationYear}
        />
        <div>
          Upload CV <span className="text-red-500">*</span>
        </div>
        <input
          type="file"
          onChange={(e) => {
            const selectedFile = e.target.files[0];
            if (selectedFile && selectedFile?.type === "application/pdf") {
              setOtherInformation({
                ...otherInformation,
                Cv: selectedFile,
              });
            } else {
              alert("Please select a PDF file.");
            }
          }}
          accept=".pdf"
        />
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
        <PrimaryBtn
          type="submit"
          className="!w-[160px]"
          disabled={
            !isConfirmCreate ||
            !otherInformation?.BackCmnd ||
            !otherInformation?.FrontCmnd ||
            !otherInformation?.Cv
          }
        >
          Create
        </PrimaryBtn>
      </div>
    </div>
  );
}

export default CVTutor;
