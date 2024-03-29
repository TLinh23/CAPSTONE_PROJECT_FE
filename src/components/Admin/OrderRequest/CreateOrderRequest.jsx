import React, { useState } from "react";
import Line from "src/components/common/Line";
import Title from "src/components/common/Title";
import { useMutation } from "react-query";
import { createOrderRequest } from "src/apis/order-module";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import PrimaryBtn from "src/components/common/PrimaryBtn";
import SmallTitle from "src/components/common/SmallTitle";
import PrimaryInput from "src/components/common/PrimaryInput";
import FilterDropDown from "src/components/common/FilterDropDown";
import PrimaryTextArea from "src/components/common/PrimaryTextArea";

/**
 * Below is example when you want to call api Put/ Post
 * Action onclick "Send" trigger function `handleSendData`
 * mutate object to call api to be
 */

const TOAST_CREATE_ORDER_REQUEST = "toast-create-order-request-id";

function CreateOrderRequest() {
  const [newOrderRequest, setNewOrderRequest] = useState(undefined);
  const [studentSelected, setStudentSelected] = useState(undefined);
  const [isConfirmRequest, setIsConfirmRequest] = useState(false);
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
      <Line className="my-3" />
      <div>
        <SmallTitle>Request Info</SmallTitle>
        <div className="md:max-w-[860px]">
          <div className="grid gap-4 grid-cols-2080">
            <div>Tutor</div>
            <div>Nguyen van A</div>
            <div>Subject</div>
            <PrimaryInput
              onChange={(e) => {
                setNewOrderRequest({
                  ...newOrderRequest,
                  subjectName: e.target.value,
                });
              }}
              value={newOrderRequest?.subjectName || ""}
            />
            <div>Student</div>
            <FilterDropDown
              listDropdown={[]}
              showing={studentSelected}
              setShowing={setStudentSelected}
              textDefault="Nguyen Van Hoi"
            />
            <div>Request Type</div>
            <PrimaryInput
              onChange={(e) => {
                setNewOrderRequest({
                  ...newOrderRequest,
                  phone: e.target.value,
                });
              }}
              value={newOrderRequest?.phone || "Create class"}
            />
            <div>Level</div>
            <PrimaryInput
              onChange={(e) => {
                setNewOrderRequest({
                  ...newOrderRequest,
                  phone: e.target.value,
                });
              }}
              value={newOrderRequest?.phone || ""}
            />
            <div>Price</div>
            <PrimaryInput
              onChange={(e) => {
                setNewOrderRequest({
                  ...newOrderRequest,
                  phone: e.target.value,
                });
              }}
              value={newOrderRequest?.phone || ""}
            />
          </div>
          <div className="flex items-center justify-center gap-3 mt-5">
            <PrimaryBtn
              disabled={!isConfirmRequest}
              onClick={handleSendData}
              className="max-w-[200px]"
            >
              Send
            </PrimaryBtn>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateOrderRequest;
