import { format } from "date-fns";
import React, { useState } from "react";
import FilterDropDown from "src/components/common/FilterDropDown";
import PrimaryBtn from "src/components/common/PrimaryBtn";
import PrimaryInput from "src/components/common/PrimaryInput";
import PrimarySmallTitle from "src/components/common/PrimarySmallTitle";
import UploadImage from "src/components/common/UploadImage";
import {
  LIST_CLASS_LEVEL_DEFAULT,
  LIST_GENDER_VALUE,
} from "src/constants/constants";
import useUploadImage from "src/hooks/useUploadImage";

function EditStudentPopup(props) {
  const { parentId, item, studentDetail, setStudentDetail } = props;
  const [classLevelSelected, setClassLevelSelected] = useState(undefined);
  const { handleUploadImage, imageUpload } = useUploadImage();
  const [gender, setGender] = useState(undefined);

  console.log("studentDetail: ", studentDetail);

  return (
    <div>
      <div className="grid gap-5 grid-cols-73">
        <div className="flex flex-col gap-3">
          <PrimaryInput
            title="Student Name: "
            onChange={(e) => {
              setStudentDetail({
                ...studentDetail,
                fullName: e.target.value,
              });
            }}
            value={studentDetail?.fullName || ""}
            placeholder="Enter full name"
          />
          <div className="grid grid-cols-2 gap-5">
            <FilterDropDown
              title="Gender"
              listDropdown={LIST_GENDER_VALUE}
              showing={gender}
              setShowing={setGender}
              textDefault={studentDetail?.gender || "Select gender"}
            />
            <div>
              <PrimarySmallTitle className="mb-2">
                Date of birth
              </PrimarySmallTitle>
              <input
                max={new Date().toISOString().slice(0, 10)}
                value={
                  studentDetail?.dob
                    ? format(new Date(studentDetail?.dob), "yyyy-MM-dd")
                    : ""
                }
                onChange={(e) => {
                  const selectedDate = e.target.value;
                  const currentDate = new Date().toISOString().slice(0, 10);
                  if (selectedDate > currentDate) {
                    setStudentDetail({
                      ...studentDetail,
                      dob: currentDate,
                    });
                  } else {
                    setStudentDetail({
                      ...studentDetail,
                      dob: selectedDate,
                    });
                  }
                }}
                type="date"
                className="w-full h-[46px] px-4 py-3 border rounded-md outline-none border-gray focus:border-primary hover:border-primary smooth-transform"
              />
            </div>
          </div>
          <FilterDropDown
            title="Student Level"
            listDropdown={LIST_CLASS_LEVEL_DEFAULT}
            showing={classLevelSelected}
            setShowing={setClassLevelSelected}
            textDefault={studentDetail?.studentLevel || "Select student level"}
          />
          <PrimaryInput
            title="Student Phone: "
            onChange={(e) => {
              setStudentDetail({
                ...studentDetail,
                phone: e.target.value,
              });
            }}
            value={studentDetail?.phone || ""}
            placeholder="Enter phone number"
          />
        </div>
        <div className="w-full h-auto">
          <div className="flex flex-col items-center justify-between h-full">
            <div>
              <div className="mb-5 text-xl font-semibold text-center">
                Avatar
              </div>
              <div className="flex items-center justify-center border rounded border-primary w-[200px] h-[200px]">
                <UploadImage
                  imageUrlResponse={imageUpload}
                  onChange={(e) => handleUploadImage(e)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <PrimaryBtn className="mt-5 max-w-[160px]">Add</PrimaryBtn>
      </div>
    </div>
  );
}

export default EditStudentPopup;
