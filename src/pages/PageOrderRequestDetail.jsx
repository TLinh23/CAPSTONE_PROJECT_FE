import React from "react";
import OrderRequestDetail from "src/components/Admin/OrderRequest/OrderRequestDetail";

function PageOrderRequestDetail() {
  return (
    // Each role will have different layout
    <div className="p-5 bg-background">
      <OrderRequestDetail />
    </div>
  );
}

export default PageOrderRequestDetail;
