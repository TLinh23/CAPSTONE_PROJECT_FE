import React, { useState } from "react";
import ParentEditProfile from "./Parent/ParentEditProfile";
import { useParams } from "react-router-dom";
import { useAuthContext } from "src/context/AuthContext";
import { ROLE_NAME } from "src/constants/constants";
import TutorEditProfile from "./Tutor/TutorEditProfile";
import StaffEditProfile from "./Staff/StaffEditProfile";
import UnauthorizedPage from "src/pages/UnauthorizedPage";
import AdminEditProfile from "./Admin/AdminEditProfile";
import { useQueries } from "react-query";
import { getProfileByIdDetail } from "src/apis/tutor-module";

function EditProfile() {
  const { id } = useParams();
  const { userId, roleKey } = useAuthContext();
  const [profileData, setProfileData] = useState(undefined);

  useQueries([
    {
      queryKey: ["getProfile", id],
      queryFn: async () => {
        if (id) {
          const response = await getProfileByIdDetail(id);
          setProfileData(response?.data?.data);
          return response?.data;
        }
      },
      enabled: !!id,
    },
  ]);

  return (
    <div>
      {String(id) === String(userId) && roleKey === ROLE_NAME.PARENT && (
        <ParentEditProfile profileData={profileData} />
      )}
      {String(id) === String(userId) && roleKey === ROLE_NAME.TUTOR && (
        <TutorEditProfile profileData={profileData} />
      )}
      {String(id) === String(userId) && roleKey === ROLE_NAME.STAFF && (
        <StaffEditProfile profileData={profileData} />
      )}
      {String(id) === String(userId) && roleKey === ROLE_NAME.ADMIN && (
        <AdminEditProfile profileData={profileData} />
      )}

      {String(id) !== String(userId) && (
        <UnauthorizedPage className="height-not-found-page" />
      )}
    </div>
  );
}

export default EditProfile;
