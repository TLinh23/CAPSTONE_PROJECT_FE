import React from "react";
import AccountDetail from "src/components/Staff/AccountDetail";
import Layout from "src/components/layout/Layout";

function PageAccountDetail() {
  return (
    // Each role will have different layout
    <Layout>
      <AccountDetail />
    </Layout>
  );
}

export default PageAccountDetail;
