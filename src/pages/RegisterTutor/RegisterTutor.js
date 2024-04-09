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
  gender: "",
  phone: "",
  address: "",
  cmnd: "",
  frontCMND: "",
  backCMND: "",
  educationLevel: "",
  graduationYear: "",
  avatar: "",
  school: "",
  dob: "",
  cv: "",
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
      { label: "Gender", type: "", name: "gender" },
      { label: "Phone", type: "text", name: "phone" },
      { label: "Address", type: "text", name: "address" },
      { label: "Date of birth", type: "text", name: "dob" },
      { label: "CMND", type: "text", name: "CMND" },
    ],
  },
  {
    title: "Your Information 2",
    fields: [
      { label: "Avatar", type: "file", name: "avatar" },
      { label: "Front CMND", type: "file", name: "frontCMND" },
      { label: "Back CMND", type: "file", name: "backCMND" },
    ],
  },
  {
    title: "Upload CV",
    fields: [
      { label: "Education Level", type: "text", name: "educationLevel" },
      { label: "School", type: "text", name: "school" },
      { label: "Graduation year", type: "text", name: "graduationYear" },
      { label: "CV", type: "file", name: "cv" },
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
  const [selectedFile, setSelectFile] = useState();

  const nextPage = () => {
    if (validateForm()) {
      setCurrentPage((prevPage) => Math.min(prevPage + 1, pages.length - 1));
    }
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleChangeFile = (e) => {
    console.log("file: ", e.target.files[0]);
    setSelectFile(e.target.files[0]);
  };

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
        axios({
          method: "post",
          url: "https://localhost:5000/api/Account/register-tutor",
          data: {
            FullName: formData.fullName,
            Email: formData.email,
            CMND: formData.cmnd,
            FrontCMND: selectedFile,
            BackCMND: formData.backCMND,
            Avatar: formData.avatar,
            Password: formData.password,
            Gender: formData.gender,
            Phone: formData.phone,
            Dob: formData.dob,
            EducationLevel: formData.educationLevel,
            GraduationYear: formData.graduationYear,
            School: formData.school,
            Cv: formData.cv,
            Address: formData.address,
            Description: formData.description,
          },
        })
          .then((res) => {
            //     // setData(res.data)
            console.log("data: ", res.data);
            // localStorage.setItem("firstName", res.data.firstName);
            // localStorage.setItem("lastName", res.data.lastName)
            // localStorage.setItem("email", res.data.email)

            // localStorage.setItem
          })
          .catch(function (error) {
            console.log(error);
          });
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
    <div>
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
                            // type={field.type}
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
                      ) : (
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
                  ) : currentPage === pages.length - 4 ? (
                    <div>
                      {index === 1 ? (
                        <div className="">
                          <label>{field.label}</label>
                          <div className="gender-register-tutor">
                            <label>Male</label>
                            <input
                              type="radio"
                              id="male"
                              className="male"
                              name="male"
                              value=""
                              onClick={() => {
                                formData["gender"] = "male";
                                // Cập nhật formData ở đây nếu cần thiết
                              }}
                            />
                            <label>Female</label>
                            <input
                              type="radio"
                              id="female"
                              className="female"
                              name="female"
                              value="female"
                              onClick={() => {
                                formData["gender"] = "female";
                                // Cập nhật formData ở đây nếu cần thiết
                              }}
                            />
                          </div>
                        </div>
                      ) : currentPage === pages.length - 3 ? (
                        <div>
                          <label>{field.label}</label>
                          <input
                            type={field.type}
                            value={formData[field.name]}
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                [field.name]: e.target.files[0],
                              });
                              setErrors({ ...errors, [field.name]: "" });
                            }}
                            required
                          />
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
                <button className="backBtn" type="button" onClick={prevPage}>
                  <span className="btnText">Back</span>
                </button>
              )}
              <button
                className="nextBtn"
                type={currentPage === pages.length - 1 ? "submit" : "button"}
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
    </div>
  );
}
