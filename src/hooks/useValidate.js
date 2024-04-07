export const validateAccountStepData = (titleHeader,currentPage, data) => {
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