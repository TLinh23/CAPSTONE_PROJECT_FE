import React from "react";
import ListOrderRequest from "src/components/Admin/OrderRequest/ListOrderRequest";
import Layout from "src/components/layout/Layout";

function ListOrderRequestPage() {
  return (
    // Each role will have different layout
    <Layout>
      <ListOrderRequest />
    </Layout>
  );
}

export default ListOrderRequestPage;
