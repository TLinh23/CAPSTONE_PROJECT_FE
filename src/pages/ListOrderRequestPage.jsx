import React from "react";
import ListOrderRequest from "src/components/Admin/OrderRequest/ListOrderRequest";

function ListOrderRequestPage() {
  return (
    // Each role will have different layout
    <div className="p-5 bg-[#F6F5FA]">
      <ListOrderRequest />
    </div>
  );
}

export default ListOrderRequestPage;
