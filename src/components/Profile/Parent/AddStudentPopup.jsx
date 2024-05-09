import { format } from "date-fns";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { createStudentInParentDetail } from "src/apis/student-module";
import FilterDropDown from "src/components/common/FilterDropDown";
import PrimaryBtn from "src/components/common/PrimaryBtn";
import PrimaryInput from "src/components/common/PrimaryInput";
import PrimarySmallTitle from "src/components/common/PrimarySmallTitle";
import UploadImage from "src/components/common/UploadImage";
import {
  LIST_CLASS_LEVEL_DEFAULT,
  LIST_GENDER_VALUE,
} from "src/constants/constants";
import { useAuthContext } from "src/context/AuthContext";
import useUploadImage from "src/hooks/useUploadImage";
import { combineStrings } from "src/libs";

const EXCLUDED_KEY = [];

function AddStudentPopup({ setShowPopup }) {
  const { userId } = useAuthContext();
  const [studentDetail, setStudentDetail] = useState(undefined);
  const [classLevelSelected, setClassLevelSelected] = useState(undefined);
  const { handleUploadImage, imageUpload } = useUploadImage();
  const [gender, setGender] = useState(undefined);
  const queryClient = useQueryClient();

  const createStudentMutation = useMutation(
    async (newData) => {
      return await createStudentInParentDetail(newData);
    },
    {
      onSuccess: (data) => {
        console.log("Data: ", data);
        if (data?.status >= 200 && data?.status < 300) {
          toast.success("Add student successfully");
          setShowPopup(false);
          queryClient.invalidateQueries("getProfile");
        } else {
          toast.error(
            // @ts-ignore
            combineStrings(data?.response?.data?.errors) ||
              // @ts-ignore
              combineStrings(data?.response?.data?.message) ||
              // @ts-ignore
              combineStrings(data?.message) ||
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

  const handleAddNewStudent = () => {
    const queryObj = {
      ...studentDetail,
      StudentLevel: classLevelSelected?.value,
      ParentId: Number(userId),
      Status: "CREATED",
    };
    if (gender) {
      queryObj["Gender"] = gender?.value;
    }
    if (imageUpload) {
      queryObj["Avatar"] = imageUpload;
    }
    if (!studentDetail?.FullName) {
      toast.error("Please fil Full Name");
      return;
    }
    if (!classLevelSelected) {
      toast.error("Please select class level");
      return;
    }
    if (!studentDetail?.Address) {
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
    createStudentMutation.mutate(formData);
  };

  return (
    <div>
      <div className="grid gap-5 grid-cols-73">
        <div className="flex flex-col gap-3">
          <PrimaryInput
            title={
              <div>
                Student Name <span className="text-dangerous">*</span>
              </div>
            }
            onChange={(e) => {
              setStudentDetail({
                ...studentDetail,
                FullName: e.target.value,
              });
            }}
            value={studentDetail?.FullName || ""}
            placeholder="Enter full name"
          />
          <div className="grid grid-cols-2 gap-5">
            <FilterDropDown
              title="Gender"
              listDropdown={LIST_GENDER_VALUE}
              showing={gender}
              setShowing={setGender}
              textDefault="Select gender"
            />
            <div>
              <PrimarySmallTitle className="mb-2">
                Date of birth
              </PrimarySmallTitle>
              <input
                max={new Date().toISOString().slice(0, 10)}
                value={
                  studentDetail?.Dob
                    ? format(new Date(studentDetail?.Dob), "yyyy-MM-dd")
                    : ""
                }
                onChange={(e) => {
                  const selectedDate = e.target.value;
                  const currentDate = new Date().toISOString().slice(0, 10);
                  if (selectedDate > currentDate) {
                    setStudentDetail({
                      ...studentDetail,
                      Dob: currentDate,
                    });
                  } else {
                    setStudentDetail({
                      ...studentDetail,
                      Dob: selectedDate,
                    });
                  }
                }}
                type="date"
                className="w-full h-[46px] px-4 py-3 border rounded-md outline-none border-gray focus:border-primary hover:border-primary smooth-transform"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <FilterDropDown
              title="Student Level"
              listDropdown={LIST_CLASS_LEVEL_DEFAULT}
              showing={classLevelSelected}
              setShowing={setClassLevelSelected}
              textDefault="Select student level"
              required="*"
            />
            <PrimaryInput
              title="Student Phone: "
              onChange={(e) => {
                setStudentDetail({
                  ...studentDetail,
                  Phone: e.target.value,
                });
              }}
              value={studentDetail?.Phone || ""}
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
                Address: e.target.value,
              });
            }}
            value={studentDetail?.Address || ""}
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
                  imageUrlResponse={imageUpload}
                  onChange={(e) => handleUploadImage(e)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <PrimaryBtn
          onClick={handleAddNewStudent}
          className="mt-5 max-w-[160px]"
        >
          Add
        </PrimaryBtn>
      </div>
    </div>
  );
}

export default AddStudentPopup;
