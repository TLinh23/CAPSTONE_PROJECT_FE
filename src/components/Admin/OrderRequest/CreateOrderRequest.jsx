import React, { useState } from "react";
import Line from "src/components/common/Line";
import SubMenu from "src/components/common/SubMenu";
import Title from "src/components/common/Title";
import OrderRequestSummary from "./OrderRequestSummary";
import OrderRequestDescription from "./OrderRequestDescription";
import OrderRequestInfo from "./OrderRequestInfo";
import { useMutation } from "react-query";
import { createOrderRequest } from "src/apis/order-module";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import PrimaryBtn from "src/components/common/PrimaryBtn";

const listSubMenu = [
  { id: "info", label: "1. Request Info" },
  { id: "summary", label: "2. Price Summary" },
  { id: "description", label: "3. Description" },
];

/**
 * Below is example when you want to call api Put/ Post
 * Action onclick "Send" trigger function `handleSendData`
 * mutate object to call api to be
 */

const TOAST_CREATE_ORDER_REQUEST = "toast-create-order-request-id";

function CreateOrderRequest() {
  const [activeTab, setActiveTab] = useState("info");
  const [newOrderRequest, setNewOrderRequest] = useState();
  const navigate = useNavigate();

  const createOrderRequestMutation = useMutation(
    async (newData) => {
      return await createOrderRequest(newData);
    },
    {
      onSuccess: (data) => {
        console.log("Data: ", data);
        if (data?.status >= 200 && data?.status < 300) {
          toast.success("Create order request successfully");
          navigate("/order-requests");
          toast.dismiss(TOAST_CREATE_ORDER_REQUEST);
        } else {
          toast.error(
            data?.message ||
              data?.response?.data?.message ||
              data?.response?.data ||
              "Oops! Something went wrong..."
          );
          toast.dismiss(TOAST_CREATE_ORDER_REQUEST);
        }
      },
      onError: (err) => {
        toast.error(
          // @ts-ignore
          err?.response?.data?.message || err?.message || "Create error"
        );
        toast.dismiss(TOAST_CREATE_ORDER_REQUEST);
      },
    }
  );

  const handleSendData = () => {
    toast.loading("Sending request...", {
      toastId: TOAST_CREATE_ORDER_REQUEST,
    });
    console.log("Here is data send to BE", newOrderRequest);
    createOrderRequestMutation.mutate(newOrderRequest);
  };

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
      {activeTab === "info" && (
        <OrderRequestInfo
          setActiveTab={setActiveTab}
          newOrderRequest={newOrderRequest}
          setNewOrderRequest={setNewOrderRequest}
        />
      )}
      {activeTab === "summary" && (
        <OrderRequestSummary
          setActiveTab={setActiveTab}
          newOrderRequest={newOrderRequest}
          setNewOrderRequest={setNewOrderRequest}
        />
      )}
      {activeTab === "description" && (
        <OrderRequestDescription
          setActiveTab={setActiveTab}
          handleClickSendData={handleSendData}
          newOrderRequest={newOrderRequest}
          setNewOrderRequest={setNewOrderRequest}
        />
      )}
    </div>
  );
}

export default CreateOrderRequest;
