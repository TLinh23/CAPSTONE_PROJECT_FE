import React from "react";

const StepperAccount = ({
     errors,
     getData,
     template,
     handleChange,
     setCurrentPage
}) => {
     const handleContinue = () => {
          if (errors) {
               setCurrentPage(1);
          }
     };
     return (
          <section>
               <div key={0} className="flex flex-col gap-5">
                    <h1 className="my-4">{template.title}</h1>
                    <hr />
                    {template.fields.map((field, i) => (
                         <>
                              <div
                                   key={i}
                                   className="flex flex-col md:flex-row items-center"
                              >
                                   <label className="w-48">{field.label}</label>
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
                              </div>
                              {errors[field.name] && (
                                   <span className="text-red-500 text-center my-[-15px]">
                                        {errors[field.name]}
                                   </span>
                              )}
                         </>
                    ))}
               </div>
               <button
                    className="px-6 py-3 bg-red-500 text-white rounded-md my-5 hover:bg-red-700 transition-all float-right"
                    onClick={handleContinue}
               >
                    Continue
               </button>
          </section>
     );
};

export default StepperAccount;
