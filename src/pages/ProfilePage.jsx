import React from "react";
import ViewProfileDetail from "src/components/Profile/ViewProfileDetail";

function ProfilePage() {
  return (
    // Each role will have different layout
    <div className="p-5 bg-[#F6F5FA]">
      <ViewProfileDetail />
    </div>
  );
}

export default ProfilePage;
