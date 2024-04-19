import React from "react";
import ParentProfileDetail from "./Parent/ParentProfileDetail";
import { useAuthContext } from "src/context/AuthContext";

function ViewProfileDetail() {
  const { userId, roleKey } = useAuthContext();

  return (
    <div>
      {roleKey === "parent" && <ParentProfileDetail />}
      {roleKey === "staff" && <div>Staff detail</div>}
    </div>
  );
}

export default ViewProfileDetail;
