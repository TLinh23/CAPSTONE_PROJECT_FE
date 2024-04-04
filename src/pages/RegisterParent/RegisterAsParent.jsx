import React, { useState } from "react";
import Layout from "src/components/layout/Layout";
import StepperAccount from "./StepperAccount";
import StepperInformation from "./StepperInformation";

const titleHeader = [
     {
          title: "Account setup",
          fields: [
               { label: "Email", type: "email", name: "email" },
               { label: "Password", type: "password", name: "password" },
               {
                    label: "Confirm password",
                    type: "password",
                    name: "confirmPassword",
               },
          ],
     },
     {
          title: "Your Information",
          fields: [
               { label: "Full Name", type: "text", name: "fullName" },
               { label: "Gender", type: "radio", name: "gender" },
               { label: "Phone", type: "text", name: "phone" },
               { label: "Address", type: "text", name: "address" },
               { label: "Date of birth", type: "date", name: "date" },
               { label: "Avatar", type: "file", name: "avatar" },
          ],
     },
];

const RegisterAsParent = () => {
     const [currentPage, setCurrentPage] = useState(0);
     const [data, setData] = useState({});
     const [errors, setErrors] = useState({});

     const handleChange = (name, value) => {
          setData((prevData) => ({
               ...prevData,
               [name]: value,
          }));
          setErrors((prevErrors) => ({
               ...prevErrors,
               [name]: "",
          }));
     };

     const validateAccountStepData = () => {
          let fieldErrors = {};
          titleHeader[currentPage].fields.forEach((field) => {
               const { name, label, type } = field;
               const value = data[name];
               switch (name || type) {
                    case "email":
                         if (!isValidEmail(value)) {
                              fieldErrors[name] = `Invalid ${label}`;
                         }
                         break;
                    case "password":
                         if (!isValidPassword(value)) {
                              fieldErrors[
                                   name
                              ] = `${label} is wrong password format must have 1 unique character and 1 number `;
                         }
                         break;
                    case "confirmPassword":
                         if (value !== data["password"]) {
                              fieldErrors[name] = "Passwords do not match";
                         }
                         break;
                    case "radio":
                         if (!value) {
                              fieldErrors[name] = `${label} is required`;
                         }
                         break;
                    case "text":
                         if (!value) {
                              fieldErrors[name] = `${label} is required`;
                         }
                         break;
                    case "date":
                         if (!value) {
                              fieldErrors[name] = `${label} is required`;
                         }
                         break;
                    case "file":
                         if (!value) {
                              fieldErrors[name] = `${label} is required`;
                         }
                         break;
                    default:
                         break;
               }
          });
          return fieldErrors;
     };

     const isValidEmail = (email) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(email);
     };
     const isValidPassword = (password) => {
          const passwordRegex =
               /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{7,})/;
          return passwordRegex.test(password);
     };

     const handleContinue = () => {
          const fieldErrors = validateAccountStepData();
          if (Object.keys(fieldErrors).length === 0) {
               setCurrentPage((prevPage) => prevPage + 1);
          } else {
               setErrors(fieldErrors);
          }
     };

     const getData = (name) => {
          return data[name];
     };

     return (
          <Layout>
               <div className="my-10">
                    <hr />
               </div>
               <div className="flex mb-4 gap-3 cursor-pointer">
                    {titleHeader.map((header, index) => (
                         <h2 key={index} onClick={() => setCurrentPage(index)}>
                              <span
                                   className={`${
                                        currentPage === index
                                             ? "bg-primary text-white border-white"
                                             : ""
                                   } rounded-full px-5 py-[13px] border border-black `}
                              >
                                   {index + 1}
                              </span>{" "}
                              {header.title}
                         </h2>
                    ))}
               </div>

               <section className="w-full">
                    {currentPage === 0 && (
                         <StepperAccount
                              handleChange={handleChange}
                              getData={getData}
                              template={titleHeader[0]}
                              errors={errors}
                         />
                    )}
                    {currentPage === 1 && (
                         <StepperInformation
                              handleChange={handleChange}
                              getData={getData}
                              template={titleHeader[1]}
                              errors={errors}
                         />
                    )}
               </section>
               <div className="flex justify-end gap-5">
                    {currentPage !== 0 && (
                         <button
                              className="px-6 py-3 bg-slate-500 text-white rounded-md my-5 hover:bg-slate-700 transition-all"
                              onClick={() =>
                                   setCurrentPage((prevPage) => prevPage - 1)
                              }
                         >
                              Back
                         </button>
                    )}
                    <button
                         className="px-6 py-3 bg-red-500 text-white rounded-md my-5 hover:bg-red-700 transition-all"
                         onClick={handleContinue}
                    >
                         {currentPage === titleHeader.length - 1
                              ? "Submit"
                              : "Continue"}
                    </button>
               </div>
          </Layout>
     );
};

export default RegisterAsParent;
