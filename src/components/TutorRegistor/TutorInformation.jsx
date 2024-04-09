import React, { useState } from "react";
import Title from "../common/Title";
import PrimaryBtn from "../common/PrimaryBtn";
import PrimaryInput from "../common/PrimaryInput";
import SecondaryBtn from "../common/SecondaryBtn";
import UploadImage from "../common/UploadImage";
import useUploadImage from "src/hooks/useUploadImage";
import FilterDropDown from "../common/FilterDropDown";
import { format } from "date-fns";

function TutorInformation({ setActiveTab }) {
  const { imageUrlResponse, handleUploadImage } = useUploadImage();
  const [studentDetail, setStudentDetail] = useState(undefined);
  const [gender, setGender] = useState();
  return (
    <div>
      <Title>Your Information</Title>
      <div className="max-w-[1200px] grid md:grid-cols-37 grid-cols-1 gap-6 mt-8">
        <div className="flex flex-col items-center justify-center gap-5">
          <UploadImage
            onChange={(e) => handleUploadImage(e)}
            imageUrlResponse={imageUrlResponse}
          />
        </div>
        <div className="flex flex-col gap-3">
          <PrimaryInput
            title={"Full Name"}
            required
            placeholder="Enter full name"
          />
          <div className="grid grid-cols-2 gap-3">
            <FilterDropDown
              title="Gender"
              listDropdown={[
                { id: 1, value: "Male", name: "Male" },
                { id: 2, value: "Female", name: "Female" },
              ]}
              showing={gender || { id: 1, value: "Male", name: "Male" }}
              setShowing={setGender}
              disabled
            />
            <div>
              <div className="mb-2 text-sm font-bold text-gray">
                Date of birth
              </div>
              <input
                max={new Date().toISOString().slice(0, 10)}
                value={
                  studentDetail?.birthDate
                    ? format(new Date(studentDetail?.birthDate), "yyyy-MM-dd")
                    : ""
                }
                onChange={(e) => {
                  const selectedDate = e.target.value;
                  const currentDate = new Date().toISOString().slice(0, 10);
                  if (selectedDate > currentDate) {
                    setStudentDetail({
                      ...studentDetail,
                      birthDate: currentDate,
                    });
                  } else {
                    setStudentDetail({
                      ...studentDetail,
                      birthDate: selectedDate,
                    });
                  }
                }}
                type="date"
                className="w-full h-[46px] px-4 py-3 border rounded-md outline-none border-gray focus:border-primary hover:border-primary smooth-transform"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <PrimaryInput title="Phone" />
            <PrimaryInput title="Address" />
          </div>
          <PrimaryInput title="ID Number" />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="mb-2 text-sm font-bold text-gray">
                Image Front ID Number
              </div>
              <input type="file" />
            </div>
            <div>
              <div className="mb-2 text-sm font-bold text-gray">
                Image Back ID Number
              </div>
              <input type="file" />
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[1200px] flex gap-5 justify-center items-center mt-10">
        <SecondaryBtn
          onClick={() => {
            setActiveTab("setup");
          }}
          className="!w-[160px]"
        >
          Back
        </SecondaryBtn>
        <PrimaryBtn
          onClick={() => {
            setActiveTab("cv");
          }}
          className="!w-[160px]"
        >
          Continue
        </PrimaryBtn>
      </div>
    </div>
  );
}

export default TutorInformation;
