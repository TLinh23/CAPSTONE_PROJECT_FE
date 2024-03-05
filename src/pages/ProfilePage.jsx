import React from "react";
import ViewProfileDetail from "src/components/Profile/ViewProfileDetail";

function ProfilePage() {
  return (
    // Each role will have different layout
    <div className="p-5 bg-background">
      <ViewProfileDetail />
    </div>
  );
}

export default ProfilePage;
