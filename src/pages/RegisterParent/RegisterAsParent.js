import React, { useState } from "react";

import Layout from "src/components/layout/Layout";
import StepperAccount from "./StepperAccount";
import StepperInformation from "./StepperInformation";
import { validateAccountStepData } from "src/hooks/useValidate";
import { titleHeader } from "src/constants/titleHeader";
import { useNotification } from "src/hooks/useNotification";
// import { useRegisterAsParent } from "src/apis/apiRegister";
import { useMutation } from "react-query";
import axios from "axios";
import { toast } from "react-toastify";

const initialValue = {
     email: "",
     password: "",
     fullName: "",
     gender: "",
     phone: "",
     address: "",
     avatar: "",
     date: "",
};
const RegisterAsParent = () => {
     const [currentPage, setCurrentPage] = useState(0);
     const [data, setData] = useState(initialValue);
     const [errors, setErrors] = useState({});
     const { contextHolder } = useNotification();

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

     // const {apiRegisterParent} = useRegisterAsParent();

     const registerParent = useMutation(
          (tutorData) => {
               return axios.post(
                    "https://classntutor.coderdao.click/api/Account/register-parent",
                    tutorData,
                    {
                         headers: {
                              "Content-Type": "multipart/form-data;",
                              Accept: "*/*",
                         },
                    }
               );
          },
          {
               onSuccess: (data) => {
                    console.log("DATA: ", data);
                    toast.success("Register successfully. Please login!");
               },
               onError: (err) => {
                    console.log("Login failed", err);
                    toast.error("Register failed, try again!");
               },
          }
     );

     const handleSubmit = () => {
          console.log(data);
          // @ts-ignore
          registerParent.mutate({
               Gender: "nam",
               Phone: "0932424233",
               RoleId: 2,
               Address: "ha noi",
               Dob: "2023-01-01",
               Avatar: "C:/fakepath/Screenshot 2024-04-08 214416.png",
               FullName: "le son",
               Password: "123456",
          });
     };

     const getData = (name) => {
          return data[name];
     };

     return (
          <Layout>
               {contextHolder}
               <div className="my-10">
                    <hr />
               </div>
               <div className="flex mb-4 gap-3 cursor-pointer">
                    {titleHeader.map((header, index) => (
                         <h2 key={index} onClick={() => setCurrentPage(index)}>
                              <span
                                   className={`${
                                        currentPage === index
                                             ? "bg-primary border-white"
                                             : ""
                                   } rounded-full px-5 py-[13px] border bg-gray border-none text-white `}
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
                              setCurrentPage={setCurrentPage}
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
                         <>
                              <button
                                   className="px-6 py-3 bg-slate-500 text-white rounded-md my-5 hover:bg-slate-700 transition-all"
                                   onClick={() =>
                                        setCurrentPage(
                                             (prevPage) => prevPage - 1
                                        )
                                   }
                              >
                                   Back
                              </button>
                              <button
                                   className="px-6 py-3 bg-red-500 text-white rounded-md my-5 hover:bg-red-700 transition-all"
                                   onClick={handleSubmit}
                              >
                                   Register Form
                              </button>
                         </>
                    )}
               </div>
          </Layout>
     );
};

export default RegisterAsParent;
