import React from "react";
import ListOrderRequest from "src/components/Admin/OrderRequest/ListOrderRequest";

function ListOrderRequestPage() {
  return (
    // Each role will have different layout
    <div className="p-5 bg-background">
      <ListOrderRequest />
    </div>
  );
}

export default ListOrderRequestPage;
