import React from "react";
import EditProfile from "src/components/Profile/EditProfile";

function EditProfilePage() {
  return (
    // Each role will have different layout
    <div className="p-5 bg-background">
      <EditProfile />
    </div>
  );
}

export default EditProfilePage;
