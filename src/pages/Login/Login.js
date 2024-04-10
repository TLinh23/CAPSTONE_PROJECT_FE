import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { Link, NavLink, Navigate, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import PrimaryInput from "src/components/common/PrimaryInput";
import * as Yup from "yup";
import { emailValidation, passwordValidation } from "src/constants/validations";
import PrimaryBtn from "src/components/common/PrimaryBtn";
import { toast } from "react-toastify";
import cookie from "cookie";
import { useMutation } from "react-query";
import { loginUrl } from "src/constants/APIConfig";
import { useAuthContext } from "src/context/AuthContext";
import ArrowRightIcon from "src/components/icons/ArrowRightIcon";

const validationSchema = Yup.object({
  email: emailValidation,
  password: passwordValidation,
});

export default function Login() {
  const navigate = useNavigate();
  const { checkRoleKey, checkUserId } = useAuthContext();

  const loginMutation = useMutation(
    (loginData) => {
      return axios.post(loginUrl, loginData);
    },
    {
      onSuccess: (data) => {
        window.document.cookie = cookie.serialize(
          "accessToken",
          data?.data?.data?.token,
          {
            path: "/",
          }
        );
        localStorage.setItem(
          "roleKey",
          data?.data?.data?.roleName?.toString().toLowerCase()
        );
        localStorage.setItem("userId", data?.data?.data?.userId);
        checkRoleKey();
        checkUserId();
        toast.success("Login successful!");

        setTimeout(() => {
          navigate("/");
        }, 300);
      },
      onError: (err) => {
        console.log("Login failed", err?.message);
        toast.error(
          err?.response?.data?.message ||
            err?.response?.message ||
            err?.response?.data ||
            err?.message ||
            "Login failed, try again!"
        );
      },
    }
  );

  const formilk = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        // @ts-ignore
        loginMutation.mutate({
          Email: values?.email,
          Password: values?.password,
        });
      } catch (error) {
        toast.error("Login error, please try again later");
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
      <div className="login-page">
        <div className="login-form-container">
          <div className="logo-login">
            <img
              className="logo-img-login"
              alt="Logo"
              src="/images/logo-login.png"
            />
          </div>
          <hr />
          <div className="content-login">
            <h1 className="title-login">Login</h1>
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

              <PrimaryInput
                id="password"
                type="password"
                title="Password"
                classNameInput={`${
                  formilk.touched.password && formilk.errors.password
                    ? "border border-red-500"
                    : ""
                }`}
                className="mt-5"
                placeholder="••••••••"
                onChange={formilk.handleChange}
                onBlur={formilk.handleBlur}
                value={formilk.values.password}
                isError={formilk.touched.password && formilk.errors.password}
                messageError={formilk.errors.password}
              />

              <div className="mt-3 forgot">
                <Link className="forgot-link" to="/forgotpassword">
                  Forgot Password ?
                </Link>
              </div>

              <PrimaryBtn
                className="mt-8"
                type="submit"
                disabled={JSON.stringify(formilk.errors) !== "{}"}
              >
                Login
              </PrimaryBtn>
              <div className="mt-5 register">Do not have an account?</div>
            </form>
            <div className="flex items-center gap-3 mt-3">
              <button
                onClick={() => {
                  navigate("/register-parent");
                }}
                className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#eaac13] to-[#ee4444] rounded-md"
              >
                <p className="text-base font-bold text-white">
                  Start as parent
                </p>
                <ArrowRightIcon />
              </button>
              <button
                onClick={() => {
                  navigate("/register-tutor");
                }}
                className="flex items-center gap-2 px-5 py-3 bg-transparent border border-gray-500 rounded-md"
              >
                <p className="text-base font-bold text-black">
                  Join as Instructor
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
