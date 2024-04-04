import React from "react";

const StepperInformation = ({ template, handleChange, getData, errors }) => {
     return (
          <div className="flex flex-col gap-5">
               <h1>{template.title}</h1>
               <hr />
               {template.fields.map((field, i) => (
                    <>
                         <div
                              key={i}
                              className="flex flex-col md:flex-row items-center gap-1"
                         >
                              <label className="w-48">{field.label}</label>
                              {field.type === "radio" ? (
                                   <>
                                        <input
                                             type={field.type}
                                             name={field.name}
                                             value="NAM"
                                             checked={
                                                  getData(field.name) === "NAM"
                                             }
                                             onChange={(e) =>
                                                  handleChange(
                                                       field.name,
                                                       e.target.value
                                                  )
                                             }
                                        />
                                        <label htmlFor="male">Male</label>
                                        <input
                                             type={field.type}
                                             name={field.name}
                                             value="NU"
                                             checked={
                                                  getData(field.name) === "NU"
                                             }
                                             onChange={(e) =>
                                                  handleChange(
                                                       field.name,
                                                       e.target.value
                                                  )
                                             }
                                        />
                                        <label htmlFor="female">Female</label>
                                   </>
                              ) : (
                                   <>
                                        <input
                                             type={field.type}
                                             name={field.name}
                                             className={`flex-grow border border-gray-300 rounded-md p-2 mt-1 ${
                                                  errors[field.name]
                                                       ? " border-red-400"
                                                       : ""
                                             }`}
                                             value={getData(field.name) || ""}
                                             onChange={(e) =>
                                                  handleChange(
                                                       field.name,
                                                       e.target.value
                                                  )
                                             }
                                             placeholder={`Enter your ${field.name}`}
                                        />
                                   </>
                              )}
                         </div>
                         {errors[field.name] && (
                              <span className="text-red-500 text-center my-[-15px]">
                                   {errors[field.name]}
                              </span>
                         )}
                    </>
               ))}
          </div>
     );
};

export default StepperInformation;
