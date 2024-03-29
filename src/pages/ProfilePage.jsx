import React from "react";
import ViewProfileDetail from "src/components/Profile/ViewProfileDetail";
import Layout from "src/components/layout/Layout";

function ProfilePage() {
  return (
    // Each role will have different layout
    <Layout>
      <ViewProfileDetail />
    </Layout>
  );
}

export default ProfilePage;
