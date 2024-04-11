import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AccountParentSetup from "src/components/ParentRegister/AccountParentSetup";
import InformationParent from "src/components/ParentRegister/InformationParent";
import SubMenu from "src/components/common/SubMenu";
import Layout from "src/components/layout/Layout";
import { registerParentUrl } from "src/constants/APIConfig";
import {
  emailValidation,
  passwordValidation,
  phoneValidation,
  requileValidation,
} from "src/constants/validations";
import useUploadImage from "src/hooks/useUploadImage";
import * as Yup from "yup";

const listSubMenu = [
  { id: "setup", label: "Account Setup" },
  { id: "information", label: "Your Information" },
];

const validationSchema = Yup.object({
  Email: emailValidation,
  Password: passwordValidation,
  FullName: requileValidation,
  Phone: phoneValidation,
});

const EXCLUDED_KEY = ["RePassword"];

function PageRegisterAsParent() {
  const [activeTab, setActiveTab] = useState("setup");
  const { imageUpload, handleUploadImage } = useUploadImage();
  const [otherInformation, setOtherInformation] = useState(undefined);
  const navigate = useNavigate();

  const registerParentMutation = useMutation(
    (parentData) => {
      return axios.post(registerParentUrl, parentData);
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
      RoleId: 2,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        const submitObject = {
          ...values,
          ...otherInformation,
        };
        if (imageUpload) {
          submitObject["Avatar"] = imageUpload;
        }
        console.log("Go create parent", submitObject);
        for (const key in submitObject) {
          const value = submitObject[key];
          const isExcludedKey = EXCLUDED_KEY.includes(key);

          if (isExcludedKey || !value) {
            continue;
          }

          formData.append(key, value);
        }
        // @ts-ignore
        registerParentMutation.mutate(formData);
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
              <AccountParentSetup
                setActiveTab={setActiveTab}
                formilk={formilk}
              />
            )}
            {activeTab === "information" && (
              <InformationParent
                setActiveTab={setActiveTab}
                formilk={formilk}
                imageUpload={imageUpload}
                handleUploadImage={handleUploadImage}
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

export default PageRegisterAsParent;
