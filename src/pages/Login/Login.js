import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";

const initFormValue = {
  email: "",
  password: "",
};

// const initData = {
//   firstName: "",
//   lastName: "",
//   email: "",
//   password: "",
// };
const isEmptyValue = (value) => {
  return !value || value.trim().length < 1;
};

export default function Login() {
  const [formValue, setFormValue] = useState(initFormValue);
  const [formError, setFormError] = useState({});
  const [sucess, setSucess] = useState(false);
  const [myData, setMyData] = useState();

  const handleChange = (event) => {
    const { value, name } = event.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const validateForm = () => {
    let error = {};

    if (isEmptyValue(formValue.email)) {
      error["email"] = "Emai is requied";
    }
    if (isEmptyValue(formValue.password)) {
      error["password"] = "Password is requied";
    }

    setFormError(error);
    return Object.keys(error).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      console.log("formvalue", formValue);
      try {
        axios({
          method: "post",
          url: "https://localhost:5000/api/Account/login",
          data: {
            Email: formValue.email,
            Password: formValue.password,
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
      if(myData) {
        setSucess(true)
      }
      // console.log("check point login: ", sucess);
    } else {
      console.log("form vaild");
    }
  };
  // setSucess(localStorage.getItem("check"));
  
  return (
    <>
      {sucess ? (
        <Navigate to="/" />
      ) : (
        <div className="login-page">
          <div className="login-form-container">
            <div className="logo-login">
              <img className="logo-img-login" alt="Logo" />
            </div>
            <hr />
            <div className="content-login">
              <h1 className="title-login">Login</h1>

              <form onSubmit={handleSubmit}>
                <div className="mb-2-login">
                  <label htmlFor="email" className="form-label-login">
                    Email
                  </label>
                  <input
                    id="email-login"
                    className="form-control"
                    type="text"
                    name="email"
                    value={formValue.email}
                    onChange={handleChange}
                  />
                  {formError.email && (
                    <div className="error">{formError.email}</div>
                  )}
                </div>

                <div className="mb-2-login">
                  <label htmlFor="password" className="form-label-login">
                    Password
                  </label>
                  <input
                    id="password-login"
                    className="form-control"
                    type="password"
                    name="password"
                    value={formValue.password}
                    onChange={handleChange}
                  />
                  {formError.password && (
                    <div className="error">{formError.password}</div>
                  )}
                </div>

                <div className="action-login">
                  <div className="remember-me">
                    <label htmlFor="remember-me" className="remember-me-label">
                      Remeber me
                    </label>
                    <input
                      id="remember-me"
                      className="remember-me-"
                      type="checkbox"
                      name="rememberme"
                      value={formValue.password}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="forgot">
                    <Link className="forgot-link" to="/forgotpassword">
                      Forgot Password ?
                    </Link>
                  </div>
                </div>

                <button type="submit" className="submit-btn-login">
                  Login
                </button>

                <div className="register">
                  <Link className="register-link" to="/register">
                    <span>Do not have an account ? Register</span>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
