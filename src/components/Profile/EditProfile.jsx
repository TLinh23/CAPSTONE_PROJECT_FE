import React from "react";
import ParentEditProfile from "./Parent/ParentEditProfile";
import { useParams } from "react-router-dom";
import { useAuthContext } from "src/context/AuthContext";
import { ROLE_NAME } from "src/constants/constants";
import TutorEditProfile from "./Tutor/TutorEditProfile";
import StaffEditProfile from "./Staff/StaffEditProfile";
import NotFound from "src/pages/NotFound";
import UnauthorizedPage from "src/pages/UnauthorizedPage";
import AdminEditProfile from "./Admin/AdminEditProfile";

function EditProfile() {
  const { id } = useParams();
  const { userId, roleKey } = useAuthContext();
  console.log("id: ", id);
  return (
    <div>
      {String(id) === String(userId) && roleKey === ROLE_NAME.PARENT && (
        <ParentEditProfile />
      )}
      {String(id) === String(userId) && roleKey === ROLE_NAME.TUTOR && (
        <TutorEditProfile />
      )}
      {String(id) === String(userId) && roleKey === ROLE_NAME.STAFF && (
        <StaffEditProfile />
      )}
      {String(id) === String(userId) && roleKey === ROLE_NAME.ADMIN && (
        <AdminEditProfile />
      )}

      {String(id) !== String(userId) && (
        <UnauthorizedPage className="height-not-found-page" />
      )}
    </div>
  );
}

export default EditProfile;
