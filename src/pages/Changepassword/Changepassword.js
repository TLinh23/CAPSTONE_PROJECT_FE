import React ,{ useState } from "react";
import "./Changepassword.css";
import { Navigate, Link } from "react-router-dom";

const initFormValue = {
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};


const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

export default function ChangePassword() {
  const [formValue, setFormValue] = useState(initFormValue);
  const [formError, setFormError] = useState({});
  const [sucess, setSucess] = useState(false);

  const handlerSubmit = () => {

  }

  const handleChange = () => {

  }

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
                  <label htmlFor="old-email" className="form-label-changepassword">
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
                  <label htmlFor="new-password" className="form-label-changepassword">
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
                  <label htmlFor="confirm-new-password" className="form-label-changepassword">
                    Re-enter New Password
                  </label>
                  <input
                    id="confirm-new-password"
                    className="form-control-forgot"
                    type="text"
                    name="confirm-new-password"
                    // placeholder="Enter your mail"
                    value={formValue.confirmNewPassword}
                    onChange={handleChange}
                  />
                  {formError.confirmNewPassword && (
                    <div className="error">{formError.confirmNewPassword}</div>
                  )}
                </div>
              </form>
              <div className="buttons-changepassword ">
                <button className="submitBtn-changepassword" type="button">
                  <span className="btnText">
                    Submit
                  </span>
                </button>

              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
