import { format } from "date-fns";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { editStudentDetailInParent } from "src/apis/student-module";
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

const EXCLUDED_KEY = [];

function EditStudentPopup(props) {
  const { parentId, studentDetail, setStudentDetail, setShowPopup } = props;
  const queryClient = useQueryClient();
  const [classLevelSelected, setClassLevelSelected] = useState(undefined);
  const { handleUploadImage, imageUpload } = useUploadImage();
  const [gender, setGender] = useState(undefined);

  const editStudentMutation = useMutation(
    async (newData) => {
      return await editStudentDetailInParent(newData);
    },
    {
      onSuccess: (data) => {
        console.log("Data: ", data);
        if (data?.status >= 200 && data?.status < 300) {
          toast.success("Edit student successfully");
          setShowPopup(false);
          queryClient.invalidateQueries("getProfile");
        } else {
          toast.error(
            data?.message ||
              data?.response?.data?.message ||
              data?.response?.data ||
              "Oops! Something went wrong..."
          );
        }
      },
      onError: (err) => {
        toast.error(
          // @ts-ignore
          err?.response?.data?.message || err?.message || "Create error"
        );
      },
    }
  );

  const handleEditStudentDetail = () => {
    const queryObj = {
      StudentId: studentDetail?.studentId,
      ParentId: studentDetail?.parentId,
      StudentLevel: studentDetail?.studentLevel,
      Status: "CREATED",
      FullName: studentDetail?.fullName,
      Phone: studentDetail?.phone,
      Gender: studentDetail?.gender,
      Dob: studentDetail?.dob,
      Address: studentDetail?.address,
    };
    if (gender) {
      queryObj["Gender"] = gender?.value;
    }
    if (imageUpload) {
      queryObj["UserAvatar"] = imageUpload;
    }
    if (classLevelSelected) {
      queryObj["StudentLevel"] = classLevelSelected?.value;
    }
    if (!studentDetail?.FullName && !studentDetail?.fullName) {
      toast.error("Please fil Full Name");
      return;
    }
    if (!classLevelSelected && !studentDetail?.studentLevel) {
      toast.error("Please select class level");
      return;
    }
    if (!studentDetail?.Address && !studentDetail?.address) {
      toast.error("Please fill address");
      return;
    }

    const formData = new FormData();
    for (const key in queryObj) {
      const value = queryObj[key];
      const isExcludedKey = EXCLUDED_KEY.includes(key);

      if (isExcludedKey || !value) {
        continue;
      }

      formData.append(key, value);
    }
    console.log("joinClassRequestObj====: ", queryObj);
    // @ts-ignore
    editStudentMutation.mutate(formData);
  };

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
            <FilterDropDown
              title="Student Level"
              listDropdown={LIST_CLASS_LEVEL_DEFAULT}
              showing={classLevelSelected}
              setShowing={setClassLevelSelected}
              textDefault={
                studentDetail?.studentLevel || "Select student level"
              }
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
          <PrimaryInput
            title={
              <div>
                Address <span className="text-dangerous">*</span>
              </div>
            }
            onChange={(e) => {
              setStudentDetail({
                ...studentDetail,
                address: e.target.value,
              });
            }}
            value={studentDetail?.address || ""}
            placeholder="Enter address detail"
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
                  imageUrlResponse={imageUpload || studentDetail?.userAvatar}
                  onChange={(e) => handleUploadImage(e)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <PrimaryBtn
          onClick={handleEditStudentDetail}
          className="mt-5 max-w-[160px]"
        >
          Save
        </PrimaryBtn>
      </div>
    </div>
  );
}

export default EditStudentPopup;
