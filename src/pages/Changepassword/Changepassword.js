import React, { useState } from "react";
import "./Changepassword.css";
import { Navigate, Link } from "react-router-dom";
import axios from "axios";

const initFormValue = {
  oldPassword: "",
  newPassword: "",
  reNPassword: "",
};

const isEmptyValue = (value) => {
  return !value || value.trim().length < 1;
};

export default function ChangePassword() {
  const [formValue, setFormValue] = useState(initFormValue);
  const [formError, setFormError] = useState({});
  const [sucess, setSucess] = useState(false);
  const [myData, setMyData] = useState();

  const validateForm = () => {
    let error = {};

    if (isEmptyValue(formValue.oldPassword)) {
      error["oldpassword"] = "Old Password is requied";
    }
    if (isEmptyValue(formValue.newPassword)) {
      error["newpassword"] = "New Password is requied";
    }
    if (isEmptyValue(formValue.reNPassword)) {
      error["repassword"] = "RePassword is requied";
    } else if(formValue.reNPassword !== formValue.newPassword) {
      error["repassword"] = "RePassword not same new password";
    }

    setFormError(error);
    return Object.keys(error).length === 0;
  };
  
  const handlerSubmit = (event) => {
    event.preventDefault();
    
    if (validateForm()) {
      try {
        //api: https://localhost:5000/api/Account/change-password
        axios({
          method: "post",
          url: "https://localhost:5000/api/Account/change-password",
          data: {
            oldPassword: formValue.oldPassword,
            newPassword: formValue.newPassword,
            reNPassword: formValue.reNPassword,
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
      if (myData) {
        setSucess(false);
      }
    } else {
      console.log("form vaild");
    }
  };
  const handleChange = () => {};

  return (
    <>
      {sucess ? (
        <Navigate to="/" />
      ) : (
        <div className="changepassword-page">
          <div className="changepassword-container">
            <div className="logo-changepassword">
              <img className="logo-img-changepassword" alt="Logo" />
            </div>
            <hr />
            <div className="content-changepassword">
              <form onSubmit={handlerSubmit}>
                <div className="mb-2-changepassword">
                  <label
                    htmlFor="old-email"
                    className="form-label-changepassword"
                  >
                    Old Password
                  </label>
                  <input
                    id="old-password"
                    className="form-control-forgot"
                    type="text"
                    name="old-email"
                    // placeholder="Enter your mail"
                    value={formValue.oldPassword}
                    onChange={handleChange}
                  />
                  {formError.oldPassword && (
                    <div className="error">{formError.oldPassword}</div>
                  )}
                </div>

                <div className="mb-2-changepassword">
                  <label
                    htmlFor="new-password"
                    className="form-label-changepassword"
                  >
                    New Password
                  </label>
                  <input
                    id="new-password"
                    className="form-control-forgot"
                    type="text"
                    name="new-password"
                    // placeholder="Enter your mail"
                    value={formValue.newPassword}
                    onChange={handleChange}
                  />
                  {formError.newPassword && (
                    <div className="error">{formError.newPassword}</div>
                  )}
                </div>

                <div className="mb-2-changepassword">
                  <label
                    htmlFor="confirm-new-password"
                    className="form-label-changepassword"
                  >
                    Re-enter New Password
                  </label>
                  <input
                    id="confirm-new-password"
                    className="form-control-forgot"
                    type="text"
                    name="confirm-new-password"
                    // placeholder="Enter your mail"
                    value={formValue.reNPassword}
                    onChange={handleChange}
                  />
                  {formError.reNPassword && (
                    <div className="error">{formError.reNPassword}</div>
                  )}
                </div>
              </form>
              <div className="buttons-changepassword ">
                <button className="submitBtn-changepassword" type="button">
                  <span className="btnText">Submit</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
