import React from "react";
import "./ForgotPassword.css";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import SecondaryBtn from "src/components/common/SecondaryBtn";
import PrimaryBtn from "src/components/common/PrimaryBtn";
import PrimaryInput from "src/components/common/PrimaryInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { emailValidation } from "src/constants/validations";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { resetPassUrl } from "src/constants/APIConfig";

const validationSchema = Yup.object({
  email: emailValidation,
});

export default function ForgotPassword() {
  const navigate = useNavigate();

  const resetPasswordMutation = useMutation(
    (resetPass) => {
      return axios.put(resetPassUrl, resetPass);
    },
    {
      onSuccess: (data) => {
        console.log("DATA: ", data);
        toast.success(
          "Reset password successful. Please check the email and try again!"
        );

        setTimeout(() => {
          navigate("/");
        }, 300);
      },
      onError: (err) => {
        console.log("Login failed", err);
        toast.error("Wrong account, try again!");
      },
    }
  );

  const formilk = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        // @ts-ignore
        resetPasswordMutation.mutate({
          email: values?.email,
        });
      } catch (error) {
        toast.error("Reset password failed, please try again");
        console.error("Call api failed:", error.response.data);
      }
    },
  });

  return (
    <div>
      <div className="px-5 py-6 bg-white border-b border-gray-200">
        <NavLink className="py-6" to="/">
          <img
            src="https://amentotech.com/htmls/tuturn/images/logo.png"
            alt="logo"
            className="h-[30px] object-cover"
          />
        </NavLink>
      </div>
      <div className="flex items-center justify-center height-screen-login">
        <div className="max-w-[900px]">
          <div className="forgotpassword-container">
            <div className="logo-forgotpassword">
              <img
                className="logo-img-forgotpassword"
                alt="Logo"
                src="/images/logo-forgot.png"
              />
            </div>
            <hr className="hr" />
            <div className="content-forgotpassword">
              <h1 className="title-forgotpassword">Forgot Password</h1>
              <form onSubmit={formilk.handleSubmit}>
                <PrimaryInput
                  id="email"
                  title="Email"
                  classNameInput={`${
                    formilk.touched.email && formilk.errors.email
                      ? "border border-red-500"
                      : ""
                  }`}
                  placeholder="name@company.com"
                  onChange={formilk.handleChange}
                  onBlur={formilk.handleBlur}
                  value={formilk.values.email}
                  isError={formilk.touched.email && formilk.errors.email}
                  messageError={formilk.errors.email}
                />
                <div className="flex items-center gap-3 mt-10">
                  <SecondaryBtn
                    onClick={() => {
                      navigate(-1);
                    }}
                  >
                    Back
                  </SecondaryBtn>
                  <PrimaryBtn
                    type="submit"
                    disabled={JSON.stringify(formilk.errors) !== "{}"}
                  >
                    Reset Password
                  </PrimaryBtn>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
