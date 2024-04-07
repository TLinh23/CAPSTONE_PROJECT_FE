import * as Yup from "yup";

export const emailValidation = Yup.string()
  .min(4, "Email must be at least 4 characters")
  .email("Invalid email")
  .required("Email is required");

export const passwordValidation = Yup.string()
  .min(6, "Password must be at least 6 characters")
  .required("Password is required");

export const phoneValidation = Yup.string().matches(
  /(\+84|84|0)(3|5|7|8|9|1[2689])([0-9]{8})\b/,
  "Invalid phone number"
);
