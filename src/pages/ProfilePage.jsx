import React from "react";
import EditProfile from "src/components/EditProfile/EditProfile";

function ProfilePage() {
  return (
    // Each role will have different layout
    <div className="p-5 bg-[#F6F5FA]">
      <EditProfile />
    </div>
  );
}

export default ProfilePage;
