import React, { useState } from "react";
import PrimaryBtn from "../common/PrimaryBtn";
import SecondaryBtn from "../common/SecondaryBtn";
import PrimaryInput from "../common/PrimaryInput";
import FilterDropDown from "../common/FilterDropDown";
import { LIST_GENDER_VALUE, LIST_STATUS_FILTER } from "src/constants/constants";
import UploadImage from "../common/UploadImage";
import PrimarySmallTitle from "../common/PrimarySmallTitle";
import { format } from "date-fns";
import useUploadImage from "src/hooks/useUploadImage";
import * as Yup from "yup";
import {
  emailValidation,
  passwordValidation,
  phoneValidation,
  requileValidation,
} from "src/constants/validations";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "react-query";
import { registerNewStaff } from "src/apis/staff-module";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
  Email: emailValidation,
  Password: passwordValidation,
  FullName: requileValidation,
  Phone: phoneValidation,
});

const EXCLUDED_KEY = ["RePassword"];

function CreateNewStaff(props) {
  const { setShowDialogCreate } = props;
  const [otherInformation, setOtherInformation] = useState(undefined);
  const [gender, setGender] = useState(undefined);
  const { imageUpload, handleUploadImage } = useUploadImage();
  const queryClient = useQueryClient();

  const registerNewStaffMutation = useMutation(
    async (newData) => {
      console.log("newData: ", newData);
      return await registerNewStaff(newData);
    },
    {
      onSuccess: (data) => {
        console.log("Data: ", data);
        if (data?.status >= 200 && data?.status < 300) {
          toast.success("Create successfully");
          setShowDialogCreate(false);
          queryClient.invalidateQueries("getListStaffs");
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

  const formilk = useFormik({
    initialValues: {
      Email: "",
      Password: "",
      RePassword: "",
      FullName: "",
      Phone: "",
      Address: "",
      RoleId: 2,
      StaffType: "STAFF",
      Gender: "MALE",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        const submitObject = {
          ...values,
          ...otherInformation,
        };
        if (imageUpload) {
          submitObject["Avatar"] = imageUpload;
        }
        if (gender) {
          submitObject["Gender"] = gender?.value;
        }
        console.log("Go create parent", submitObject);
        for (const key in submitObject) {
          const value = submitObject[key];
          const isExcludedKey = EXCLUDED_KEY.includes(key);

          if (isExcludedKey || !value) {
            continue;
          }

          formData.append(key, value);
        }
        // @ts-ignore
        registerNewStaffMutation.mutate(formData);
      } catch (error) {
        console.error("Call api failed:", error.response.data);
      }
    },
  });

  return (
    <form onSubmit={formilk.handleSubmit}>
      <div className="grid gap-5 grid-cols-73">
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

          <div className="grid grid-cols-2 gap-5">
            <PrimaryInput
              title={
                <div>
                  Email <span className="text-dangerous">*</span>
                </div>
              }
              id="Email"
              classNameInput={`${
                formilk.touched.Email && formilk.errors.Email
                  ? "border border-red-500"
                  : ""
              }`}
              placeholder="name@company.com"
              onChange={formilk.handleChange}
              onBlur={formilk.handleBlur}
              value={formilk.values.Email}
              isError={formilk.touched.Email && formilk.errors.Email}
              messageError={formilk.errors.Email}
            />
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
              type="password"
              title={
                <div>
                  Password <span className="text-dangerous">*</span>
                </div>
              }
              id="Password"
              classNameInput={`${
                formilk.touched.Password && formilk.errors.Password
                  ? "border border-red-500"
                  : ""
              }`}
              placeholder="Enter password"
              onChange={formilk.handleChange}
              onBlur={formilk.handleBlur}
              value={formilk.values.Password}
              isError={formilk.touched.Password && formilk.errors.Password}
              messageError={formilk.errors.Password}
            />
            <PrimaryInput
              title={
                <div>
                  Confirm Password <span className="text-dangerous">*</span>
                </div>
              }
              id="RePassword"
              type="password"
              classNameInput={`${
                formilk.values.Password !== formilk.values.RePassword
                  ? "border border-red-500"
                  : ""
              }`}
              placeholder="••••••••"
              onChange={formilk.handleChange}
              onBlur={formilk.handleBlur}
              value={formilk.values.RePassword}
              isError={
                formilk.values.Password !== formilk.values.RePassword &&
                formilk.values.RePassword
              }
              messageError={"Password not match"}
            />
          </div>
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
      <div className="flex items-center justify-end gap-5 mt-5">
        <PrimaryBtn
          type="submit"
          disabled={formilk.values.Password !== formilk.values.RePassword}
          className="w-[120px]"
        >
          Create
        </PrimaryBtn>
        <SecondaryBtn
          onClick={() => {
            setShowDialogCreate(false);
          }}
          className="w-[120px]"
        >
          Cancel
        </SecondaryBtn>
      </div>
    </form>
  );
}

export default CreateNewStaff;
