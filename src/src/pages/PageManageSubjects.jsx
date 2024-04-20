import React from "react";
import AllSubjects from "src/components/ManageSubject/AllSubjects";
import Layout from "src/components/layout/Layout";

function PageManageSubjects() {
  return (
    // Each role will have different layout
    <Layout>
      <AllSubjects />
    </Layout>
  );
}

export default PageManageSubjects;
