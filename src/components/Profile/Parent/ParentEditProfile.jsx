import { format } from "date-fns";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FilterDropDown from "src/components/common/FilterDropDown";
import PrimaryBtn from "src/components/common/PrimaryBtn";
import PrimaryInput from "src/components/common/PrimaryInput";
import PrimarySmallTitle from "src/components/common/PrimarySmallTitle";
import Title from "src/components/common/Title";
import UploadImage from "src/components/common/UploadImage";
import useUploadImage from "src/hooks/useUploadImage";

function ParentEditProfile(props) {
  const { profileData } = props;
  const [staffAccountObject, setStaffAccountObject] = useState(profileData);
  const { imageUrlResponse, handleUploadImage, imageUpload } = useUploadImage();
  const [gender, setGender] = useState();
  const navigate = useNavigate();

  return (
    <div>
      <div className="bg-[#ffffff] block-border">
        <Title>Update personal information</Title>
        <div className="grid grid-cols-1 gap-4 mt-5 md:grid-cols-37">
          <div className="w-full h-auto">
            <div className="flex flex-col items-center justify-between">
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
            <div className="mt-5">Role: Parent</div>
            <div className="mt-3">Email: namnguyen@gmail.com</div>
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
                staffAccountObject?.userName
                  ? staffAccountObject?.userName
                  : "Nguyen Hai Nam"
              }
            />
            <FilterDropDown
              title="Gender"
              listDropdown={[
                { id: 1, value: "Male", name: "Male" },
                { id: 2, value: "Female", name: "Female" },
              ]}
              showing={gender || { id: 1, value: "Male", name: "Male" }}
              setShowing={setGender}
            />
            <PrimaryInput
              title="Phone number"
              placeholder="Enter phone number"
              type="number"
              value={
                staffAccountObject?.phone
                  ? staffAccountObject?.phone
                  : "0912333547"
              }
            />
            <div>
              <PrimarySmallTitle className="mb-2">
                Date of birth
              </PrimarySmallTitle>
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
            <PrimaryInput
              title="Address detail"
              rows={4}
              placeholder="Enter address detail"
              value={
                staffAccountObject?.address
                  ? staffAccountObject?.address
                  : "Nha rieng"
              }
            />
          </div>
        </div>
        <div className="flex items-center justify-end gap-4 mt-6">
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
      <div className="mt-5 bg-white block-border">
        <Title>Change Password</Title>
        <div className="flex flex-col gap-3 mt-5">
          <PrimaryInput
            type="password"
            title={
              <div>
                Old Password <span className="text-dangerous">*</span>
              </div>
            }
            value={"2137213123123"}
          />
          <PrimaryInput
            type="password"
            title={
              <div>
                New Password <span className="text-dangerous">*</span>
              </div>
            }
            value={"2137213123123"}
          />
          <PrimaryInput
            title={
              <div>
                Confirm New Password <span className="text-dangerous">*</span>
              </div>
            }
            id="RePassword"
            type="password"
            value={"2137213123123"}
          />
        </div>
        <div className="flex items-center justify-end gap-4 mt-6">
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
