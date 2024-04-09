import React, { useState } from "react";
import "./ForgotPassword.css";
import { Navigate, Link, useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import SecondaryBtn from "src/components/common/SecondaryBtn";
import PrimaryBtn from "src/components/common/PrimaryBtn";

const initFormValue = {
  email: "",
};

const isEmptyValue = (value) => {
  return !value || value.trim().length < 1;
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState(initFormValue);
  const [formError, setFormError] = useState({});
  const [sucess, setSucess] = useState(false);

  const validateForm = () => {
    const error = {};

    if (isEmptyValue(formValue.email)) {
      error["email"] = "Emai is requied";
    } else if (validateEmail(formValue.email)) {
      error["email"] = "Email is requied";
    }

    setFormError(error);
    return Object.keys(error).length === 0;
  };
  const handleChange = () => {};
  const handlerSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        //api:
        axios({
          method: "post",
          url: "",
          data: {
            Email: formValue.email,
          },
        })
          .then((res) => {
            // setMyData(res.data)
            console.log("data: ", res.data);
            // localStorage.setItem("Token", res.data);
            // localStorage.setItem("lastName", res.data.lastName);
            // localStorage.setItem("email", res.data.email);

            // localStorage.setItem
          })
          .catch(function (error) {
            console.log(error);
          });
        // console.log("check point login: ", myData);
        // alert("Do you want login");
      } catch (error) {
        console.log("register error", error);
      }
    }
  };
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
      <div className="forgotpassword-page">
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
            <form onSubmit={handlerSubmit}>
              <div className="mb-2-forgotpassword">
                <label htmlFor="email" className="form-label">
                  Enter your mail that have registered
                </label>
                <input
                  id="email-forgot"
                  className="form-control-forgot"
                  type="text"
                  name="email"
                  placeholder="Enter your mail"
                  value={formValue.email}
                  onChange={handleChange}
                />
                {/* {formError.email && (
                    <div className="error">{formError.email}</div>
                  )} */}
              </div>
            </form>
            <div className="flex items-center gap-3">
              <SecondaryBtn
                onClick={() => {
                  navigate(-1);
                }}
              >
                Back
              </SecondaryBtn>
              <PrimaryBtn>Reset Password</PrimaryBtn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
