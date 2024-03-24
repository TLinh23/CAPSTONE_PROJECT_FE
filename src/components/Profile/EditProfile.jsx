import React, { useState } from "react";
import SmallTitle from "../common/SmallTitle";
import { format } from "date-fns";
import PrimaryInput from "../common/PrimaryInput";
import PrimaryTextArea from "../common/PrimaryTextArea";
import PrimaryBtn from "../common/PrimaryBtn";
import UploadImage from "../common/UploadImage";
import useUploadImage from "src/hooks/useUploadImage";
import FilterDropDown from "../common/FilterDropDown";
import SecondaryBtn from "../common/SecondaryBtn";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const [staffAccountObject, setStaffAccountObject] = useState(null);
  const { imageUrlResponse, handleUploadImage, imageUpload } = useUploadImage();
  const [gender, setGender] = useState();
  const navigate = useNavigate();
  console.log("imageUpload: ", imageUpload);

  return (
    <div>
      <div className="bg-[#ffffff] block-border">
        <SmallTitle>Personal information</SmallTitle>
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

          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              <PrimaryInput
                title={
                  <p>
                    First name <span className="text-red-500">*</span>
                  </p>
                }
                placeholder="Enter first name"
                value={
                  staffAccountObject?.userName
                    ? staffAccountObject?.userName
                    : ""
                }
                onChange={(e) => {
                  const userName = e.target.value
                    ?.trimStart()
                    .replace(/\s{2,}/g, " ");
                  setStaffAccountObject({
                    ...staffAccountObject,
                    userName: userName,
                  });
                }}
              />
              <PrimaryInput
                title={
                  <p>
                    Last name <span className="text-red-500">*</span>
                  </p>
                }
                placeholder="Enter last name"
                value={
                  staffAccountObject?.userName
                    ? staffAccountObject?.userName
                    : ""
                }
                onChange={(e) => {
                  const userName = e.target.value
                    ?.trimStart()
                    .replace(/\s{2,}/g, " ");
                  setStaffAccountObject({
                    ...staffAccountObject,
                    userName: userName,
                  });
                }}
              />
              <div>
                <PrimaryInput
                  title="ID Number"
                  placeholder="Enter Id Number"
                  type="number"
                  value={
                    staffAccountObject?.identity
                      ? staffAccountObject?.identity
                      : ""
                  }
                  onChange={(e) => {
                    setStaffAccountObject({
                      ...staffAccountObject,
                      identity: e.target.value,
                    });
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 mt-7 gap-7 md:grid-cols-2">
              <PrimaryInput
                title="UserName"
                placeholder="Enter user name"
                readOnly={true}
                value={
                  staffAccountObject?.userCode ||
                  staffAccountObject?.email ||
                  ""
                }
              />
              <div>
                <PrimaryInput
                  title="Phone number"
                  placeholder="Enter phone number"
                  type="number"
                  value={
                    staffAccountObject?.phone ? staffAccountObject?.phone : ""
                  }
                  onChange={(e) => {
                    setStaffAccountObject({
                      ...staffAccountObject,
                      phone: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 mt-7 gap-7 md:grid-cols-2">
              <FilterDropDown
                title="Gender"
                listDropdown={[
                  { id: 1, value: "Male", name: "Male" },
                  { id: 2, value: "Female", name: "Female" },
                ]}
                showing={gender}
                setShowing={setGender}
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
                  className="w-full h-[46px] px-4 py-3 border rounded-md outline-none border-gray focus:border-primary hover:border-primary smooth-transform"
                />
              </div>
            </div>
            <div>
              <PrimaryTextArea
                className="mt-7"
                title="Address detail"
                rows={4}
                placeholder="Enter address detail"
                value={
                  staffAccountObject?.address ? staffAccountObject?.address : ""
                }
                onChange={(e) => {
                  setStaffAccountObject({
                    ...staffAccountObject,
                    address: e.target.value,
                  });
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end items-center gap-4 mt-6">
          <SecondaryBtn
            onClick={() => {
              navigate("/profile");
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

export default EditProfile;
