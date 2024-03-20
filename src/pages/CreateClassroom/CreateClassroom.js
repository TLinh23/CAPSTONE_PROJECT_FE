import React, { useState } from "react";
import "./CreateClassroom.css";
// // import { register } from "../Service/Service";
import { Link } from "react-router-dom";
// import axios from "axios";
import { Navigate } from "react-router-dom";

const initFormValue = {
  subject: "",
  classroomName: "",
  // role: "",
  classroomCode: "",
  price: "",
  timeFrom: "",
  timeTo: "",
  classDuration: "",
};

const pages = [
  {
    title: "Classroom information",
    fields: [
      { label: "Subject", type: "text", name: "subject" },
      { label: "Classroom Name", type: "text", name: "classroom-name" },
      { label: "Classroom Code", type: "text", name: "classroom-code" },
      { label: "Price", type: "text", name: "price" },
    ],
  },
  {
    title: "Time",
    fields: [
      { label: "Day", type: "", name: "days" },
      {
        label: "Time",
        type: "",
        name: "",
      },
      { label: "Time Hour", type: "combobox", name: "Time hour" },
    ],
  },
  {
    title: "Confirom",
    fields: [{}, {}],
  },
];

const dayOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const isEmptyValue = (value) => {
  return !value || value.trim().length < 1;
};

const validatePhone = (phone) => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
};

export default function CreateClassroom() {
  const [currentPage, setCurrentPage] = useState(0);
  const [formData, setFormData] = useState(initFormValue);
  const [errors, setErrors] = useState({});
  const [sucess, setSucess] = useState(false);
  // const [selectedFile, setSelectFile] = useState();
  const [checkCreate, setCheckCreate] = useState(false);

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
      }
    });

    setErrors(pageErrors);
    return Object.keys(error).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm() && checkCreate) {
      // console.log("check", checkCreate);
      console.log("formvalue", formData);
      // localStorage.setItem("role", "success");

      try {
        // axios({
        //     method: 'post',
        //     url: 'https://localhost:7288/api/Accounts/odata/Accounts/register',
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
        console.log("create classroom error", error);
      }

      setFormData(initFormValue);
    } else {
      console.log("form create classroom vaild");
    }
  };

  // setSucess(localStorage.getItem("check"));
  const checkIndex = (index, field) => {
    if (index == 0) {
      return (
        <div className="input-day">
          <label className="field-label">{field.label}:</label>
          <form className="form-dayOfWeek" >
            {dayOfWeek.map((day, index) => (
              <div key={index} className="dayOfWeek">
                <label className="day-label">{day}</label>
                <input type="checkbox" value={day} onChange={(e) => {
                  let n = -1;
                  setFormData({
                    ...formData,
                    [day] :  e.target.value
                  })
                }}/>
              </div>
            ))}
          </form>
        </div>
      );
    } else if (index == 1) {
      return (
        <div className="input-time">
          <label className="field-label">{field.label}:</label>
          <form className="form-time">
            <div className="input-from">
              <label className="from">From</label>
              <input
                type="text"
                value={formData["timeFrom"]}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    ["timeFrom"]: e.target.value,
                  });
                }}
                required
              />
            </div>
            <div className="input-to">
              <label className="to-label">To</label>
              <input
                type="text"
                value={formData["timeTo"]}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    ["timeTo"]: e.target.value,
                  });
                }}
                required
              />
            </div>
          </form>
        </div>
      );
    } else if (index == 2) {
      return (
        <div className="input-hour">
          <label className="field-label">{field.label}:</label>
          <form>
            <input
              type="text"
              value={formData[field.name]}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  [field.name]: e.target.value,
                });
              }}
              required
            />
          </form>
        </div>
      );
    }
  };
  //   const handleChange = {(e) {
  //     let isChecked = e.target.checked;
  //     // do whatever you want with isChecked value
  //   }
  // }
  const confirm = (index, field) => {
    if (index === 0) {
      return (
        <div className="description">
          {/* <label>description</label> */}
          <textarea placeholder="Description classroom"></textarea>
        </div>
      );
    } else {
      return (
        <div className="check-create">
          <input
            type="checkbox"
            value="agree"
            onClick={(e) => {
              setCheckCreate(true);
            }}
          />
          <label>I want create classroom</label>
        </div>
      );
    }
  };
  return (
    <>
      {sucess ? (
        <Navigate to="/" />
      ) : (
        <section>
          <div className="container-create-classroom">
            <div className="infor-create-classroom">
              {pages.map((page, index) => (
                <label
                  key={index}
                  className={`lab${index + 1} ${
                    index === currentPage ? "active" : ""
                  }`}
                  onClick={() => setCurrentPage(index)}
                >
                  <h3>
                    {index + 1}.{page.title}
                  </h3>
                </label>
              ))}
            </div>
            <hr />
            <form onSubmit={handleSubmit}>
              <div className="form-create-classroom">
                <div className="details-personal-create-classroom">
                  <span className="title-create-classroom">
                    {pages[currentPage].title}
                  </span>
                </div>

                <div className="fields-create-classroom">
                  {pages[currentPage].fields.map((field, index) => (
                    <div key={index} className="input-field-create-classroom">
                      {currentPage == pages.length - 2 ? (
                        <div>{checkIndex(index, field)}</div>
                      ) : (
                        <div>
                          {currentPage == pages.length - 1 ? (
                            <div>{confirm(index, field)}</div>
                          ) : (
                            <div className="input-create-classroom">
                              <label>{field.label}:</label>

                              <input
                                type={field.type}
                                // placeholder={`Enter ${field.label}`}
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
                                <span className="error-message-create-classroom">
                                  {errors[field.name]}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="buttons-create-classroom">
                  {currentPage > 0 && (
                    <button
                      className="backBtn-create-classroom"
                      type="button"
                      onClick={prevPage}
                    >
                      <span className="btnText-create-classroom">Back</span>
                    </button>
                  )}
                  <button
                    className="nextBtn-create-classroom"
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
