import React, { useState } from "react";
import Line from "src/components/common/Line";
import SubMenu from "src/components/common/SubMenu";
import Title from "src/components/common/Title";
import OrderRequestSummary from "./OrderRequestSummary";
import OrderRequestDescription from "./OrderRequestDescription";
import OrderRequestInfo from "./OrderRequestInfo";

const listSubMenu = [
  { id: "info", label: "1. Request Info" },
  { id: "summary", label: "2. Price Summary" },
  { id: "description", label: "3. Description" },
];

function CreateOrderRequest() {
  const [activeTab, setActiveTab] = useState("info");

  return (
    <div>
      <Title>Create Order Request</Title>
      <SubMenu
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        listMenu={listSubMenu}
        className="mt-5"
      />
      <Line className="my-3" />
      {activeTab === "info" && <OrderRequestInfo setActiveTab={setActiveTab} />}
      {activeTab === "summary" && (
        <OrderRequestSummary setActiveTab={setActiveTab} />
      )}
      {activeTab === "description" && (
        <OrderRequestDescription setActiveTab={setActiveTab} />
      )}
    </div>
  );
}

export default CreateOrderRequest;
