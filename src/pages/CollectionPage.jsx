import React from "react";
import { useParams } from "react-router-dom";
import { getListCountry } from "../apis/tutor-module";
import { useAppDispatch } from "src/store";
import { hideLoading, showLoading } from "src/store/features/loadingPage";
import { useFormik } from "formik";
import * as Yup from "yup";
import PrimaryInput from "src/components/common/PrimaryInput";
import PrimaryBtn from "src/components/common/PrimaryBtn";

// this validation below is example of using formik with Yup. Go to NPM to check docs

const validationSchema = Yup.object({
  email: Yup.string()
    .min(5, "Email must be at least 5 characters")
    .required("Email is required"),
  password: Yup.string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
});

function CollectionPage() {
  const { slug } = useParams();
  const dispatch = useAppDispatch();

  const handleOpen = () => {
    console.log("Test redux-tooltip line 30");
    dispatch(showLoading());

    const resetState = setInterval(() => {
      dispatch(hideLoading());
    }, 2000);
    console.log("Test redux-tooltip line 37");
    return () => clearInterval(resetState);
  };
  const handleClose = async () => {
    const response = await getListCountry();
    console.log("Response: ", response?.data);
  };

  const formilk = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        console.log("Go go", values);
      } catch (error) {
        console.error("Call api failed:", error.response.data);
      }
    },
  });

  return (
    <div>
      <div>CollectionPage {slug}</div>
      <div onClick={handleOpen}>Click Open</div>
      <div onClick={handleClose}>Click close</div>
      <form className="space-y-4 md:space-y-6" onSubmit={formilk.handleSubmit}>
        <PrimaryInput
          id="email"
          title="Email"
          classNameInput={`${
            formilk.touched.email && formilk.errors.email
              ? "border border-red-500"
              : ""
          }`}
          placeholder="name@company.com"
          onChange={formilk.handleChange}
          onBlur={formilk.handleBlur}
          value={formilk.values.email}
          isError={formilk.touched.email && formilk.errors.email}
          messageError={formilk.errors.email}
        />
        <PrimaryInput
          id="password"
          type="password"
          title="Password"
          classNameInput={`${
            formilk.touched.password && formilk.errors.password
              ? "border border-red-500"
              : ""
          }`}
          placeholder="••••••••"
          onChange={formilk.handleChange}
          onBlur={formilk.handleBlur}
          value={formilk.values.password}
          isError={formilk.touched.password && formilk.errors.password}
          messageError={formilk.errors.password}
        />
        <PrimaryBtn type="submit">Submit</PrimaryBtn>
      </form>
    </div>
  );
}

export default CollectionPage;
