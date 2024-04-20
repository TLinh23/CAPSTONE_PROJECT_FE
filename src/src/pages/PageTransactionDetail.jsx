import React from "react";
import TransationDetail from "src/components/Staff/TransactionManager/TransaxtionDetail";
import Layout from "src/components/layout/Layout";

function PageTransactionDetail() {
  return (
    // Each role will have different layout
    <Layout>
      <TransationDetail />
    </Layout>
  );
}

export default PageTransactionDetail;
