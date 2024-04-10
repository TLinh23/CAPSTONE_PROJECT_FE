import React, { useEffect, useState } from "react";
import PrimaryBtn from "../common/PrimaryBtn";
import SecondaryBtn from "../common/SecondaryBtn";
import Title from "../common/Title";
import UploadImage from "../common/UploadImage";
import PrimaryInput from "../common/PrimaryInput";
import FilterDropDown from "../common/FilterDropDown";
import { LIST_GENDER_VALUE } from "src/constants/constants";
import { format } from "date-fns";
import PrimaryInputCheckbox from "../common/PrimaryInputCheckbox";

function InformationParent(props) {
  const {
    setActiveTab,
    formilk,
    imageUpload,
    handleUploadImage,
    otherInformation,
    setOtherInformation,
  } = props;

  const [gender, setGender] = useState();
  const [isConfirmCreate, setIsConfirmCreate] = useState(false);

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
            setActiveTab("setup");
          }}
          className="!w-[160px]"
        >
          Back
        </SecondaryBtn>
        <PrimaryBtn
          type="submit"
          className="!w-[160px]"
          disabled={!isConfirmCreate}
        >
          Create
        </PrimaryBtn>
      </div>
    </div>
  );
}

export default InformationParent;
