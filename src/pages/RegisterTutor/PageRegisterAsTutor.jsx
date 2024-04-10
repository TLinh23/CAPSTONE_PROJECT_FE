import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AccountSetup from "src/components/TutorRegistor/AccountSetup";
import CVTutor from "src/components/TutorRegistor/CVTutor";
import TutorInformation from "src/components/TutorRegistor/TutorInformation";
import SubMenu from "src/components/common/SubMenu";
import Layout from "src/components/layout/Layout";
import { registerTutorUl } from "src/constants/APIConfig";
import {
  emailValidation,
  passwordValidation,
  requileValidation,
  phoneValidation,
  identityValidation,
} from "src/constants/validations";
import useUploadImage from "src/hooks/useUploadImage";
import * as Yup from "yup";

const listSubMenu = [
  { id: "setup", label: "Account Setup" },
  { id: "information", label: "Your Information" },
  { id: "cv", label: "Upload CV" },
];

const validationSchema = Yup.object({
  Email: emailValidation,
  Password: passwordValidation,
  FullName: requileValidation,
  Phone: phoneValidation,
  Cmnd: identityValidation,
});

function PageRegisterAsTutor() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("setup");
  const { imageUpload, handleUploadImage } = useUploadImage();
  const [otherInformation, setOtherInformation] = useState(undefined);

  const registerTutorMutation = useMutation(
    (tutorData) => {
      return axios.post(registerTutorUl, tutorData);
    },
    {
      onSuccess: (data) => {
        console.log("DATA: ", data);
        toast.success("Register successfully. Please login!");

        setTimeout(() => {
          navigate("/login");
        }, 100);
      },
      onError: (err) => {
        console.log("Login failed", err);
        toast.error("Register failed, try again!");
      },
    }
  );

  const formilk = useFormik({
    initialValues: {
      Email: "",
      Password: "",
      RePassword: "",
      FullName: "",
      Phone: "",
      Address: "",
      Cmnd: "",
      RoleId: 1,
      EducationLevel: "",
      School: "",
      GraduationYear: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const submitObject = {
          ...values,
          ...otherInformation,
        };
        if (imageUpload) {
          submitObject["Avatar"] = imageUpload;
        }
        console.log("Go create tutor", submitObject);
        // @ts-ignore
        registerTutorMutation.mutate(submitObject);
      } catch (error) {
        console.error("Call api failed:", error.response.data);
      }
    },
  });

  return (
    <Layout>
      <div
        style={{
          scrollbarWidth: "none",
        }}
      >
        <SubMenu
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          listMenu={listSubMenu}
        />
        <div className="pt-5 mt-5 border-t border-gray">
          <form onSubmit={formilk.handleSubmit}>
            {activeTab === "setup" && (
              <AccountSetup setActiveTab={setActiveTab} formilk={formilk} />
            )}
            {activeTab === "information" && (
              <TutorInformation
                setActiveTab={setActiveTab}
                formilk={formilk}
                imageUpload={imageUpload}
                handleUploadImage={handleUploadImage}
                otherInformation={otherInformation}
                setOtherInformation={setOtherInformation}
              />
            )}
            {activeTab === "cv" && (
              <CVTutor
                setActiveTab={setActiveTab}
                formilk={formilk}
                otherInformation={otherInformation}
                setOtherInformation={setOtherInformation}
              />
            )}
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default PageRegisterAsTutor;
