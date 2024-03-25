import React from "react";
import ParentEditProfile from "./Parent/ParentEditProfile";
import { useParams } from "react-router-dom";
import { useAuthContext } from "src/context/AuthContext";
import { ROLE_NAME } from "src/constants/constants";

function EditProfile() {
  const { id } = useParams();
  const { userId, roleKey } = useAuthContext();
  console.log("id: ", id);
  return (
    <div>
      {String(id) === String(userId) && roleKey === ROLE_NAME.PARENT && (
        <ParentEditProfile />
      )}
    </div>
  );
}

export default EditProfile;
