import React from "react";
import { useLocation } from "react-router-dom";
import ParentEditProfile from "./Parent/ParentEditProfile";

function EditProfile() {
  const location = useLocation();
  const routes = [
    { path: "/parent", component: ParentEditProfile },
    { path: "/tutor", component: ParentEditProfile },
    { path: "/staff", component: ParentEditProfile },
  ];

  const matchingRoute = routes.find((route) =>
    location.pathname.includes(route.path)
  );
  const Component = matchingRoute ? matchingRoute.component : null;

  return <div>{Component && <Component />}</div>;
}

export default EditProfile;
