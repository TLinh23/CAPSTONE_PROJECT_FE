export const titleHeader = [
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