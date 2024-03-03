import React, { useState } from "react";
import "./ForgotPassword.css";
import { Navigate, Link } from "react-router-dom";

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
  const [formValue, setFormValue] = useState(initFormValue);
  const [formError, setFormError] = useState({});
  const [sucess, setSucess] = useState(false);

  const validateForm = () => {
    const error = {};

    if (isEmptyValue(formValue.email)) {
      error["email"] = "Emai is requied";
    } else if(validateEmail(formValue.email)) {
      error["email"] = "Email is requied"
    }
    
    setFormError(error);
    return Object.keys(error).length === 0;
  };
  const handleChange = () => {};
  const handlerSubmit = () => {};
  return (
    <>
      {sucess ? (
        <Navigate to="/" />
      ) : (
        
        <div className="forgotpassword-page">
          <div className="forgotpassword-container">
            <div className="logo-forgotpassword">
              <img className="logo-img-forgotpassword" alt="Logo" />
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
              <div className="buttons">
                <button className="backBtn" type="button">
                  <span className="btnText">
                    <Link className="back-link" to="/">
                      Back
                    </Link>
                  </span>
                </button>

                <button type="submit" className="submit-btn">
                  <span className="btnText">Reset Password</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
