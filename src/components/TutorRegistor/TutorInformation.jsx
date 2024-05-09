import React, { useEffect, useState } from "react";
import Title from "../common/Title";
import PrimaryBtn from "../common/PrimaryBtn";
import PrimaryInput from "../common/PrimaryInput";
import SecondaryBtn from "../common/SecondaryBtn";
import UploadImage from "../common/UploadImage";
import FilterDropDown from "../common/FilterDropDown";
import { format } from "date-fns";
import { LIST_GENDER_VALUE } from "src/constants/constants";

function TutorInformation({
  setActiveTab,
  formilk,
  imageUpload,
  handleUploadImage,
  otherInformation,
  setOtherInformation,
}) {
  const [gender, setGender] = useState(undefined);

  useEffect(() => {
    if (gender) {
      setOtherInformation({
        ...otherInformation,
        Gender: gender?.value,
      });
    }
  }, [gender]);
  return (
    <div className="bg-white block-border">
      <Title>Your Information</Title>
      <div className="max-w-[1200px] grid md:grid-cols-37 grid-cols-1 gap-6 mt-8">
        <div className="flex flex-col items-center justify-center gap-5">
          <UploadImage
            onChange={(e) => handleUploadImage(e)}
            imageUrlResponse={imageUpload}
          />
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
            id="FullName"
            classNameInput={`${
              formilk.touched.FullName && formilk.errors.FullName
                ? "border border-red-500"
                : ""
            }`}
            onChange={formilk.handleChange}
            onBlur={formilk.handleBlur}
            value={formilk.values.FullName || ""}
            isError={formilk.touched.FullName && formilk.errors.FullName}
            messageError={formilk.errors.FullName}
          />
          <div className="grid grid-cols-2 gap-3">
            <FilterDropDown
              title="Gender"
              listDropdown={LIST_GENDER_VALUE}
              showing={gender}
              setShowing={setGender}
              textDefault={otherInformation?.Gender || "Select gender"}
              required={"*"}
            />
            <div>
              <div className="mb-2 text-sm font-bold text-gray">
                Date of birth
              </div>
              <input
                max={new Date().toISOString().slice(0, 10)}
                value={
                  otherInformation?.Dob
                    ? format(new Date(otherInformation?.Dob), "yyyy-MM-dd")
                    : ""
                }
                onChange={(e) => {
                  const selectedDate = e.target.value;
                  const currentDate = new Date().toISOString().slice(0, 10);
                  if (selectedDate > currentDate) {
                    setOtherInformation({
                      ...otherInformation,
                      Dob: currentDate,
                    });
                  } else {
                    setOtherInformation({
                      ...otherInformation,
                      Dob: selectedDate,
                    });
                  }
                }}
                type="date"
                className="w-full h-[46px] px-4 py-3 border rounded-md outline-none border-gray focus:border-primary hover:border-primary smooth-transform"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <PrimaryInput
              title={
                <div>
                  Phone <span className="text-red-500">*</span>
                </div>
              }
              required
              placeholder="Enter phone number"
              id="Phone"
              classNameInput={`${
                formilk.touched.Phone && formilk.errors.Phone
                  ? "border border-red-500"
                  : ""
              }`}
              onChange={formilk.handleChange}
              onBlur={formilk.handleBlur}
              value={formilk.values.Phone || ""}
              isError={formilk.touched.Phone && formilk.errors.Phone}
              messageError={formilk.errors.Phone}
            />
            <PrimaryInput
              title={<div>Address</div>}
              placeholder="Enter address"
              id="Address"
              classNameInput={`${
                formilk.touched.Address && formilk.errors.Address
                  ? "border border-red-500"
                  : ""
              }`}
              onChange={formilk.handleChange}
              onBlur={formilk.handleBlur}
              value={formilk.values.Address || ""}
              isError={formilk.touched.Address && formilk.errors.Address}
              messageError={formilk.errors.Address}
            />
          </div>
          <PrimaryInput
            title={
              <div>
                ID Number <span className="text-red-500">*</span>
              </div>
            }
            required
            placeholder="Enter ID Number"
            id="Cmnd"
            classNameInput={`${
              formilk.touched.Cmnd && formilk.errors.Cmnd
                ? "border border-red-500"
                : ""
            }`}
            onChange={formilk.handleChange}
            onBlur={formilk.handleBlur}
            value={formilk.values.Cmnd || ""}
            isError={formilk.touched.Cmnd && formilk.errors.Cmnd}
            messageError={formilk.errors.Cmnd}
          />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="mb-2 text-sm font-bold text-gray">
                Image Front ID Number <span className="text-red-500">*</span>
              </div>
              <input
                type="file"
                onChange={(e) => {
                  setOtherInformation({
                    ...otherInformation,
                    FrontCmnd: e.target.files[0],
                  });
                }}
              />
              {!otherInformation?.FrontCmnd && (
                <div className="mt-2 text-sm text-red-500">
                  Image Front ID is required
                </div>
              )}
            </div>
            <div>
              <div className="mb-2 text-sm font-bold text-gray">
                Image Back ID Number <span className="text-red-500">*</span>
              </div>
              <input
                type="file"
                onChange={(e) => {
                  setOtherInformation({
                    ...otherInformation,
                    BackCmnd: e.target.files[0],
                  });
                }}
              />
              {!otherInformation?.BackCmnd && (
                <div className="mt-2 text-sm text-red-500">
                  Image Back ID is required
                </div>
              )}
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
