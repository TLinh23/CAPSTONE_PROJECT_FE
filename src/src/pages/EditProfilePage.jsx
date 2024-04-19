import React from "react";
import EditProfile from "src/components/Profile/EditProfile";
import Layout from "src/components/layout/Layout";

function EditProfilePage() {
  return (
    // Each role will have different layout
    <Layout>
      <EditProfile />
    </Layout>
  );
}

export default EditProfilePage;
