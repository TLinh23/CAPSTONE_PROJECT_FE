import React from "react";
import OrderRequestDetail from "src/components/OrderRequest/OrderRequestDetail";
import Layout from "src/components/layout/Layout";

function PageOrderRequestDetail() {
  return (
    // Each role will have different layout
    <Layout>
      <OrderRequestDetail />
    </Layout>
  );
}

export default PageOrderRequestDetail;
