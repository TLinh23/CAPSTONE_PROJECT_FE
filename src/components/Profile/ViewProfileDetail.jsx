import React from "react";
import { useLocation } from "react-router-dom";
import ParentProfileDetail from "./Parent/ParentProfileDetail";

function ViewProfileDetail() {
  const location = useLocation();
  const routes = [
    { path: "/parent", component: ParentProfileDetail },
    { path: "/tutor", component: ParentProfileDetail },
    { path: "/staff", component: ParentProfileDetail },
  ];

  const matchingRoute = routes.find((route) =>
    location.pathname.includes(route.path)
  );
  const Component = matchingRoute ? matchingRoute.component : null;

  return <div>{Component && <Component />}</div>;
}

export default ViewProfileDetail;
