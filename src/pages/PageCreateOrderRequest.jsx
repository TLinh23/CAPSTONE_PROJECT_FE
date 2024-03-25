import React from "react";
import CreateOrderRequest from "src/components/Admin/OrderRequest/CreateOrderRequest";
import Layout from "src/components/layout/Layout";

function PageCreateOrderRequest() {
  return (
    // Each role will have different layout
    <Layout>
      <CreateOrderRequest />
    </Layout>
  );
}

export default PageCreateOrderRequest;
