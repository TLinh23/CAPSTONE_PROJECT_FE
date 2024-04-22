import { format } from "date-fns";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import {
  changePasswordAccount,
  editProfileDetail,
} from "src/apis/tutor-module";
import FilterDropDown from "src/components/common/FilterDropDown";
import PrimaryBtn from "src/components/common/PrimaryBtn";
import PrimaryInput from "src/components/common/PrimaryInput";
import PrimarySmallTitle from "src/components/common/PrimarySmallTitle";
import Title from "src/components/common/Title";
import UploadImage from "src/components/common/UploadImage";
import { LIST_GENDER_VALUE } from "src/constants/constants";
import {
  passwordValidation,
  requileValidation,
} from "src/constants/validations";
import { useAuthContext } from "src/context/AuthContext";
import useUploadImage from "src/hooks/useUploadImage";
import * as Yup from "yup";
import ProfileHeader from "../ProfileHeader";

function AdminEditProfile(props) {
  const { profileData } = props;
  const [staffAccountObject, setStaffAccountObject] = useState(profileData);
  const { handleUploadImage, imageUpload } = useUploadImage();
  const [gender, setGender] = useState(undefined);
  const queryClient = useQueryClient();
  const { checkUserId } = useAuthContext();

  useEffect(() => {
    if (profileData) {
      setStaffAccountObject(profileData);
      localStorage.setItem("fullName", profileData?.fullName);
      localStorage.setItem("userAvatar", profileData?.userAvatar);
      checkUserId();
    }
  }, [profileData]);

  const editAdminDetailMutation = useMutation(
    async (newData) => {
      console.log("newData: ", newData);
      return await editProfileDetail(newData);
    },
    {
      onSuccess: (data) => {
        console.log("Data: ", data);
        if (data?.status >= 200 && data?.status < 300) {
          toast.success("Edit profile successfully");
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
          err?.response?.data?.message || err?.message || "Update error"
        );
      },
    }
  );

  const handleClickEditProfile = () => {
    const queryObj = {
      FullName: staffAccountObject?.fullName,
      Phone: staffAccountObject?.phone,
      Gender: staffAccountObject?.gender,
      Address: staffAccountObject?.address,
      Dob: staffAccountObject?.dob,
    };
    queryObj["Tutor.Cmnd"] = "";
    queryObj["Tutor.FrontCmnd"] = "";
    queryObj["Tutor.BackCmnd"] = "";
    queryObj["Tutor.Cv"] = "";
    queryObj["Tutor.EducationLevel"] = "";
    queryObj["Tutor.School"] = "";
    queryObj["Tutor.GraduationYear"] = "";
    queryObj["Tutor.About"] = "";
    queryObj["Staff.StaffType"] = "";
    if (imageUpload) {
      queryObj["Avatar"] = imageUpload;
    }
    if (gender) {
      queryObj["Gender"] = gender?.value;
    }
    console.log("Send Obj: ", queryObj);
    const formData = new FormData();
    for (const key in queryObj) {
      const value = queryObj[key];

      formData.append(key, value);
    }
    // @ts-ignore
    editAdminDetailMutation.mutate(formData);
  };

  return (
    <div>
      <div className="bg-[#ffffff] block-border">
        <ProfileHeader title="Update personal information" />
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
                      imageUpload ? imageUpload : staffAccountObject?.userAvatar
                    }
                    onChange={(e) => handleUploadImage(e)}
                  />
                </div>
              </div>
            </div>
            <div className="mt-5">Role: System Admin</div>
            <div className="mt-3">
              Email: {staffAccountObject?.account?.email}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <PrimaryInput
              title={
                <p>
                  Full name <span className="text-red-500">*</span>
                </p>
              }
              placeholder="Enter full name"
              value={staffAccountObject?.fullName || ""}
              onChange={(e) => {
                setStaffAccountObject({
                  ...staffAccountObject,
                  fullName: e.target.value,
                });
              }}
            />
            <FilterDropDown
              title="Gender"
              listDropdown={LIST_GENDER_VALUE}
              showing={gender}
              setShowing={setGender}
              textDefault={staffAccountObject?.gender}
            />
            <PrimaryInput
              title="Phone number"
              placeholder="Enter phone number"
              type="number"
              value={staffAccountObject?.phone || ""}
              onChange={(e) => {
                setStaffAccountObject({
                  ...staffAccountObject,
                  phone: e.target.value,
                });
              }}
            />
            <div>
              <PrimarySmallTitle className="mb-2">
                Date of birth
              </PrimarySmallTitle>
              <input
                max={new Date().toISOString().slice(0, 10)}
                value={
                  staffAccountObject?.dob
                    ? format(new Date(staffAccountObject?.dob), "yyyy-MM-dd")
                    : ""
                }
                onChange={(e) => {
                  const selectedDate = e.target.value;
                  const currentDate = new Date().toISOString().slice(0, 10);
                  if (selectedDate > currentDate) {
                    setStaffAccountObject({
                      ...staffAccountObject,
                      dob: currentDate,
                    });
                  } else {
                    setStaffAccountObject({
                      ...staffAccountObject,
                      dob: selectedDate,
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
        <div className="flex items-center justify-end gap-4 mt-6">
          <PrimaryBtn
            onClick={handleClickEditProfile}
            className="md:max-w-[222px]"
          >
            Save
          </PrimaryBtn>
        </div>
      </div>
      <ChangePasswordSection staffAccountObject={staffAccountObject} />
    </div>
  );
}

const passwordValidationSchema = Yup.object({
  NewPassword: passwordValidation,
  RePassword: requileValidation,
  OldPassword: requileValidation,
});

function ChangePasswordSection({ staffAccountObject }) {
  const changePasswordMutation = useMutation(
    async (newData) => {
      console.log("newData: ", newData);
      return await changePasswordAccount(newData);
    },
    {
      onSuccess: (data) => {
        console.log("Data: ", data);
        if (data?.status >= 200 && data?.status < 300) {
          toast.success("Change password successfully");
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
          err?.response?.data?.message || err?.message || "Update error"
        );
      },
    }
  );

  const formPassword = useFormik({
    initialValues: {
      Email: staffAccountObject?.account?.email,
      OldPassword: "",
      NewPassword: "",
      RePassword: "",
    },
    validationSchema: passwordValidationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        const submitObject = {
          ...values,
          Email: staffAccountObject?.account?.email,
        };
        console.log("Go change password", submitObject);
        for (const key in submitObject) {
          const value = submitObject[key];
          formData.append(key, value);
        }
        // @ts-ignore
        changePasswordMutation.mutate(formData);
      } catch (error) {
        console.error("Call api failed:", error.response.data);
      }
    },
  });

  return (
    <form
      onSubmit={formPassword.handleSubmit}
      className="mt-5 bg-white block-border"
    >
      <Title>Change Password</Title>
      <div className="flex flex-col gap-3 mt-5">
        <PrimaryInput
          id="OldPassword"
          type="password"
          title={
            <div>
              Old Password <span className="text-dangerous">*</span>
            </div>
          }
          classNameInput={`${
            formPassword.touched.OldPassword && formPassword.errors.OldPassword
              ? "border border-red-500"
              : ""
          }`}
          onChange={formPassword.handleChange}
          onBlur={formPassword.handleBlur}
          value={formPassword.values.OldPassword || ""}
          isError={
            formPassword.touched.OldPassword && formPassword.errors.OldPassword
          }
          messageError={formPassword.errors.OldPassword}
          placeholder="Enter old password"
        />
        <PrimaryInput
          id="NewPassword"
          type="password"
          title={
            <div>
              New Password <span className="text-dangerous">*</span>
            </div>
          }
          classNameInput={`${
            formPassword.touched.NewPassword && formPassword.errors.NewPassword
              ? "border border-red-500"
              : ""
          }`}
          onChange={formPassword.handleChange}
          onBlur={formPassword.handleBlur}
          value={formPassword.values.NewPassword || ""}
          isError={
            formPassword.touched.NewPassword && formPassword.errors.NewPassword
          }
          messageError={formPassword.errors.NewPassword}
          placeholder="Enter new password"
        />
        <PrimaryInput
          title={
            <div>
              Confirm New Password <span className="text-dangerous">*</span>
            </div>
          }
          id="RePassword"
          type="password"
          classNameInput={`${
            formPassword.values.NewPassword !== formPassword.values.RePassword
              ? "border border-red-500"
              : ""
          }`}
          placeholder="Confirm your new password"
          onChange={formPassword.handleChange}
          onBlur={formPassword.handleBlur}
          value={formPassword.values.RePassword}
          isError={
            formPassword.values.NewPassword !==
              formPassword.values.RePassword && formPassword.values.RePassword
          }
          messageError={"Password not match"}
        />
      </div>
      <div className="flex items-center justify-end gap-4 mt-6">
        <PrimaryBtn className="md:max-w-[222px]" type="submit">
          Save
        </PrimaryBtn>
      </div>
    </form>
  );
}

export default AdminEditProfile;
