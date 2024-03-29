import { format } from "date-fns";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FilterDropDown from "src/components/common/FilterDropDown";
import PrimaryBtn from "src/components/common/PrimaryBtn";
import PrimaryInput from "src/components/common/PrimaryInput";
import PrimarySmallTitle from "src/components/common/PrimarySmallTitle";
import SecondaryBtn from "src/components/common/SecondaryBtn";
import Title from "src/components/common/Title";
import UploadImage from "src/components/common/UploadImage";
import useUploadImage from "src/hooks/useUploadImage";

function TutorEditProfile() {
  const [dataProfileDetail, setStaffAccountObject] = useState(null);
  const { imageUrlResponse, handleUploadImage, imageUpload } = useUploadImage();
  const [gender, setGender] = useState();
  const navigate = useNavigate();

  return (
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
                      : dataProfileDetail?.image
                  }
                  onChange={(e) => handleUploadImage(e)}
                />
              </div>
            </div>
          </div>
          <div className="mt-5">Role: Staff</div>
          <div className="mt-3">Email: ducucucucu@gmail.com</div>
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
              dataProfileDetail?.userName ? dataProfileDetail?.userName : ""
            }
            readOnly
          />
          <div className="grid items-center grid-cols-2 gap-4">
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
              <PrimarySmallTitle className="mb-2">
                Date of birth
              </PrimarySmallTitle>
              <input
                max={new Date().toISOString().slice(0, 10)}
                value={
                  dataProfileDetail?.birthDate
                    ? format(
                        new Date(dataProfileDetail?.birthDate),
                        "yyyy-MM-dd"
                      )
                    : ""
                }
                type="date"
                disabled
                className="w-full h-[46px] px-4 py-3 border rounded-md outline-none border-gray focus:border-primary hover:border-primary smooth-transform"
              />
            </div>
          </div>
          <PrimaryInput
            title="Identify number"
            placeholder="Enter identify number"
            value={
              dataProfileDetail?.idNumber ? dataProfileDetail?.idNumber : ""
            }
            readOnly
          />
          <PrimaryInput
            title="Phone number"
            placeholder="Enter phone number"
            type="number"
            value={dataProfileDetail?.phone ? dataProfileDetail?.phone : ""}
            readOnly
          />
          <PrimaryInput
            title="Address"
            rows={4}
            placeholder="Enter address"
            value={dataProfileDetail?.address ? dataProfileDetail?.address : ""}
            readOnly
          />
          <div className="grid items-center grid-cols-2 gap-4">
            <PrimaryInput
              title={<p>Education level</p>}
              placeholder="Enter education level"
              value={
                dataProfileDetail?.userName ? dataProfileDetail?.userName : ""
              }
              readOnly
            />
            <PrimaryInput
              title={<p>Graduation year</p>}
              placeholder="Enter graduation year"
              value={
                dataProfileDetail?.userName ? dataProfileDetail?.userName : ""
              }
              readOnly
            />
          </div>
          <div className="grid items-center gap-x-4 gap-y-2 grid-cols-2575">
            <PrimarySmallTitle>CV</PrimarySmallTitle>
            <input type="file" />
            <PrimarySmallTitle>Identify Card Front</PrimarySmallTitle>
            <input type="file" />
            <PrimarySmallTitle>Identify Card Back</PrimarySmallTitle>
            <input type="file" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end gap-4 mt-6">
        <SecondaryBtn
          onClick={() => {
            navigate(-1);
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
  );
}

export default TutorEditProfile;
