import React from "react";
import ClassDetailManager from "src/components/Staff/ClassManager/ClassDetailManager";
import Layout from "src/components/layout/Layout";

function PageClassDetail() {
  return (
    // Each role will have different layout
    <Layout>
      <ClassDetailManager/>
    </Layout>
  );
}
export default PageClassDetail;
