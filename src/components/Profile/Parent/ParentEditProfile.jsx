import { format } from "date-fns";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FilterDropDown from "src/components/common/FilterDropDown";
import PrimaryBtn from "src/components/common/PrimaryBtn";
import PrimaryInput from "src/components/common/PrimaryInput";
import PrimaryTextArea from "src/components/common/PrimaryTextArea";
import SecondaryBtn from "src/components/common/SecondaryBtn";
import Title from "src/components/common/Title";
import UploadImage from "src/components/common/UploadImage";
import useUploadImage from "src/hooks/useUploadImage";

function ParentEditProfile() {
  const [staffAccountObject, setStaffAccountObject] = useState(null);
  const { imageUrlResponse, handleUploadImage, imageUpload } = useUploadImage();
  const [gender, setGender] = useState();
  const navigate = useNavigate();
  console.log("imageUpload: ", imageUpload);

  return (
    <div>
      <div className="bg-[#ffffff] block-border">
        <Title>Update personal information</Title>
        <div className="grid grid-cols-1 gap-4 mt-5 md:grid-cols-37">
          <div className="w-full h-auto">
            <div className="flex flex-col items-center justify-between h-full">
              <div>
                <div className="mb-5 text-xl font-semibold text-center">
                  Avatar
                </div>
                <div className="flex items-center justify-center border rounded border-primary w-[200px] h-[200px]">
                  <UploadImage
                    imageUrlResponse={
                      imageUrlResponse
                        ? imageUrlResponse
                        : staffAccountObject?.image
                    }
                    onChange={(e) => handleUploadImage(e)}
                  />
                </div>
              </div>
            </div>
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
                staffAccountObject?.userName ? staffAccountObject?.userName : ""
              }
              readOnly
            />
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
                  staffAccountObject?.birthDate
                    ? format(
                        new Date(staffAccountObject?.birthDate),
                        "yyyy-MM-dd"
                      )
                    : ""
                }
                onChange={(e) => {
                  const selectedDate = e.target.value;
                  const currentDate = new Date().toISOString().slice(0, 10);
                  if (selectedDate > currentDate) {
                    setStaffAccountObject({
                      ...staffAccountObject,
                      birthDate: currentDate,
                    });
                  } else {
                    setStaffAccountObject({
                      ...staffAccountObject,
                      birthDate: selectedDate,
                    });
                  }
                }}
                type="date"
                disabled
                className="w-full h-[46px] px-4 py-3 border rounded-md outline-none border-gray focus:border-primary hover:border-primary smooth-transform"
              />
            </div>
            <PrimaryInput
              title="Address detail"
              rows={4}
              placeholder="Enter address detail"
              value={
                staffAccountObject?.address ? staffAccountObject?.address : ""
              }
              readOnly
            />
            <PrimaryInput
              title="Phone number"
              placeholder="Enter phone number"
              type="number"
              value={staffAccountObject?.phone ? staffAccountObject?.phone : ""}
              readOnly
            />
          </div>
        </div>
        <div className="flex items-center justify-end gap-4 mt-6">
          <SecondaryBtn
            onClick={() => {
              navigate("/parent/profile");
            }}
            className="md:max-w-[222px]"
          >
            Cancel
          </SecondaryBtn>
          <PrimaryBtn
            className="md:max-w-[222px]"
            // onClick={() => handleChangeProfile()}
            // disabled={
            //   (staffAccountObject?.phone &&
            //     !!!isValidPhoneNumber(staffAccountObject?.phone)) ||
            //   staffAccountObject?.userName?.length > 100 ||
            //   staffAccountObject?.identity?.length > 12 ||
            //   staffAccountObject?.address?.length > 250 ||
            //   !!!staffAccountObject?.userName ||
            //   !isValidFullName(staffAccountObject?.userName)
            // }
          >
            Save
          </PrimaryBtn>
        </div>
      </div>
    </div>
  );
}

export default ParentEditProfile;
