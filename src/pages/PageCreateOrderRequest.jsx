import React from "react";
import CreateOrderRequest from "src/components/Admin/OrderRequest/CreateOrderRequest";

function PageCreateOrderRequest() {
  return (
    // Each role will have different layout
    <div className="p-5 bg-background">
      <CreateOrderRequest />
    </div>
  );
}

export default PageCreateOrderRequest;
