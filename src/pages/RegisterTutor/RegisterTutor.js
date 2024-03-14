import React, { useState } from "react";
import "./RegisterTutor.css";
// import { register } from "../Service/Service";
import { Link } from "react-router-dom";
// import HomePage from "./Home";
// import {  Link } from "react-router-dom";
import axios from "axios";
import { Navigate } from "react-router-dom";

const initFormValue = {
  email: "",
  // role: "",
  password: "",
  confirmPassword: "",
  fullName: "",
  phone: "",
  address: "",
  cvTitle: "",
  cv: "",
  description: "",
};

const pages = [
  {
    title: "Account setup",
    fields: [
      { label: "Email", type: "text", name: "email" },
      { label: "Password", type: "password", name: "password" },
      { label: "Confirm password", type: "password", name: "confirmPassword" },
    ],
  },
  {
    title: "Your Information 1",
    fields: [
      { label: "Full Name", type: "text", name: "fullName" },
      { label: "Phone", type: "text", name: "phone" },
      { label: "Address", type: "text", name: "address" },
      { label: "Education Level", type: "text", name: "address" },
      { label: "School", type: "text", name: "address" },
    ],
  },
  {
    title: "Your Information 2",
    fields: [
      { label: "CMND", type: "text", name: "address" },
      { label: "Front CMND", type: "file", name: "address" },
      { label: "Back CMND", type: "file", name: "address" },
      { label: "Avatar", type: "file", name: "address" },
    ],
  },
  {
    title: "Upload CV",
    fields: [
      { label: "CV Title", type: "text", name: "cvTitle" },
      { label: "CV", type: "file", name: "cv" },
      { label: "Description", type: "text", name: "description" },
    ],
  },
  {
    title: "Term and Service",
    fields: [
      { label: "Rule", type: "text", name: "rule" },
      { label: "Agree", type: "checkbox", name: "agree" },
    ],
  },
];

const isEmptyValue = (value) => {
  return !value || value.trim().length < 1;
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone) => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
};

export default function RegisterTutor() {
  const [currentPage, setCurrentPage] = useState(0);
  const [formData, setFormData] = useState(initFormValue);
  const [errors, setErrors] = useState({});
  const [sucess, setSucess] = useState(false);
  // const [selectedFile, setSelectFile] = useState();

  const nextPage = () => {
    if (validateForm()) {
      setCurrentPage((prevPage) => Math.min(prevPage + 1, pages.length - 1));
    }
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  // const [sucess, setSucess] = useState(false)

  // const handleChange = (event) => {
  //   // console.log("even: ", event.target.files[0])
  //   const { value, name } = event.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  // const handleChangeFile = (e) => {
  //   console.log("file: ", e.target.files[0]);
  //   setSelectFile(e.target.files[0]);
  // };

  // const formData = new FormData();
  // formData.append("File", selectedFile)

  const validateForm = () => {
    const error = {};

    // if (isEmptyValue(formValue.userName)) {
    //   error["userName"] = "User Name is requied";
    // }

    // if (isEmptyValue(formValue.email)) {
    //   error["email"] = "Emai is requied";
    // }
    // if (isEmptyValue(formValue.password)) {
    //   error["password"] = "Password is requied";
    // }
    // if (isEmptyValue(formValue.confirmPassword)) {
    //   error["confirmPassword"] = "Confirm Password is requied";
    // } else if (formValue.confirmPassword !== formValue.password) {
    //   error["confirmPassword"] = "Confirm Password not match";
    // }

    const currentPageFields = pages[currentPage].fields;
    let pageErrors = {};

    currentPageFields.forEach((field) => {
      if (!formData[field.name]) {
        pageErrors[field.name] = `${field.label} is required`;
      } else {
        if (field.name === "email" && !validateEmail(formData.email)) {
          pageErrors[field.name] = "Invalid email format";
        } else if (
          field.name === "password" &&
          formData.password !== formData.confirmPassword
        ) {
          pageErrors["confirmPassword"] = "Passwords do not match";
        } else if (
          (field.name === "phone" || field.name === "studentPhone") &&
          !validatePhone(formData[field.name])
        ) {
          pageErrors[field.name] = "Invalid phone number";
        }
      }
    });

    setErrors(pageErrors);
    return Object.keys(error).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      console.log("formvalue", formData);
      localStorage.setItem("role", "success");

      try {
        // axios({
        //     method: 'post',
        //     url: 'https://localhost:5000/api/Account/register-tutor',
        //     data: {
        //         FirstName: formValue.firstName,
        //         LastName: formValue.lastName,
        //         Email: formValue.email,
        //         Password: formValue.password,
        //         UserName: formValue.userName,
        //         Phone: formValue.phone,
        //         CV: formData,
        //         CVTitle: formValue.cvTitle,
        //         Address: formValue.address,
        //         Description: formValue.description,

        //     }
        //   }).then( (res) => {
        //     //     // setData(res.data)
        //         console.log("data: ", res.data);
        //         localStorage.setItem("firstName", res.data.firstName);
        //         localStorage.setItem("lastName", res.data.lastName)
        //         localStorage.setItem("email", res.data.email
        //         )

        //         // localStorage.setItem
        //       })
        //       .catch(function (error) {
        //         console.log(error);
        //       });
        setSucess(false);
        //   console.log("check register: ", sucess)
      } catch (error) {
        console.log("register error", error);
      }

      setFormData(initFormValue);
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
        <section>
          <div className="container-register">
            <h3>This is logo</h3>
            <hr />
            <header>Registration</header>
            <hr />
            <div className="infor">
              {pages.map((page, index) => (
                <label
                  key={index}
                  className={`lab${index + 1} ${
                    index === currentPage ? "active" : ""
                  }`}
                  onClick={() => setCurrentPage(index)}
                >
                  <h3>{page.title}</h3>
                </label>
              ))}
            </div>
            <hr />
            <form onSubmit={handleSubmit}>
              <div className="form">
                <div className="details personal">
                  <span className="title">{pages[currentPage].title}</span>
                </div>
                <hr />
                <div className="fields">
                  {pages[currentPage].fields.map((field, index) => (
                    <div key={index} className="input-field">
                      {currentPage === pages.length - 1 ? (
                        
                        <div>
                          {index === 0 ? (
                            <>
                            <textarea
                            type={field.type}
                            placeholder={
                              currentPage === pages.length - 1
                                ? ""
                                : `Enter ${field.label}`
                            }
                            value={formData[field.name]}
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                [field.name]: e.target.value,
                              });
                              setErrors({ ...errors, [field.name]: "" });
                            }}
                            required
                          />
                            </>
                          ): (
                            <>
                            <input
                            type={field.type}
                            placeholder={
                              currentPage === pages.length - 1
                                ? ""
                                : `Enter ${field.label}`
                            }
                            value={formData[field.name]}
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                [field.name]: e.target.value,
                              });
                              setErrors({ ...errors, [field.name]: "" });
                            }}
                            required
                          />
                          <label>{field.label}</label>
                            </>
                          )}
                          
                          {/* <label>{field.label}</label> */}
                          {/* {errors[field.name] && (
                        <span className="error-message">
                          {errors[field.name]}
                        </span>
                      )} */}
                        </div>
                      ) : (
                        <div>
                          <label>{field.label}</label>
                          <input
                            type={field.type}
                            placeholder={
                              currentPage === pages.length - 1
                                ? ""
                                : `Enter ${field.label}`
                            }
                            value={formData[field.name]}
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                [field.name]: e.target.value,
                              });
                              setErrors({ ...errors, [field.name]: "" });
                            }}
                            required
                          />
                          {errors[field.name] && (
                            <span className="error-message">
                              {errors[field.name]}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="buttons">
                  {currentPage > 0 && (
                    <button
                      className="backBtn"
                      type="button"
                      onClick={prevPage}
                    >
                      <span className="btnText">Back</span>
                    </button>
                  )}
                  <button
                    className="nextBtn"
                    type={
                      currentPage === pages.length - 1 ? "submit" : "button"
                    }
                    onClick={currentPage === pages.length - 1 ? null : nextPage}
                  >
                    <span className="btnText">
                      {currentPage === pages.length - 1 ? "Create" : "Next"}
                    </span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      )}
    </>
  );
}
