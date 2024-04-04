import React from "react";
import AssessmentDetails from "src/components/Tutor/AssessmentManager/AssessmentDetails";
import Layout from "src/components/layout/Layout";

function PageClassDetail() {
  return (
    // Each role will have different layout
    <Layout>
      <AssessmentDetails/>
    </Layout>
  );
}
export default PageClassDetail;
