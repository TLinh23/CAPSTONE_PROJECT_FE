import React, { useState } from "react";
import Layout from "../../layout/Layout";
import Title from "../../common/Title";
import Input from "../../common/PrimaryInput";
import PrimaryBtn from "../../common/PrimaryBtn";
import axios from "axios";
import { useNotification } from "src/hooks/useNotification";
import { createPayment } from "src/constants/APIConfig";

function AddTransaction() {
  const { contextHolder, openNotification } = useNotification();
  const [transaction, setTransaction] = useState({
    paymentType: "",
    requestedBy: 0,
    payer: 0,
    amount: 0,
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const fetchData = await axios.post(createPayment, {
        payerId: transaction.payer,
        requestId: transaction.requestedBy,
        paymentAmount: transaction.amount,
        paymentDesc: transaction.description,
        paymentType: transaction.paymentType,
        requestDate: Date.now(),
        payDate: Date.now(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
        status: "CREATED",
      });

      if (fetchData.status == 200) {
        openNotification("topRight", "success", "create successfully!");
      }
    } catch (error) {
      openNotification("topRight", "error", error);
    }
  };

  return (
    <Layout>
      {contextHolder}
      <div className="container p-4 mx-auto">
        <Title>Staff - Add New Transaction</Title>
        <div className="mt-4">
          <div className="flex items-center mb-4">
            <label
              className="inline-block w-1/3 text-sm font-bold text-gray-700"
              htmlFor="paymentType"
            >
              Payment Type:
            </label>
            <Input
              id="paymentType"
              name="paymentType"
              placeholder="Payment Type"
              value={transaction.paymentType}
              onChange={handleChange}
              className="w-2/3"
            />
          </div>
          <div className="flex items-center mb-4">
            <label
              className="inline-block w-1/3 text-sm font-bold text-gray-700"
              htmlFor="requestedBy"
            >
              Requested By:
            </label>
            <Input
              id="requestedBy"
              name="requestedBy"
              placeholder="Requested By"
              value={transaction.requestedBy}
              onChange={handleChange}
              className="w-2/3"
            />
          </div>
          <div className="flex items-center mb-4">
            <label
              className="inline-block w-1/3 text-sm font-bold text-gray-700"
              htmlFor="payer"
            >
              Payer:
            </label>
            <Input
              id="payer"
              name="payer"
              placeholder="Payer"
              value={transaction.payer}
              onChange={handleChange}
              className="w-2/3"
            />
          </div>
          <div className="flex items-center mb-4">
            <label
              className="inline-block w-1/3 text-sm font-bold text-gray-700"
              htmlFor="amount"
            >
              Pay Amount:
            </label>
            <Input
              id="amount"
              name="amount"
              placeholder="Pay Amount"
              value={transaction.amount}
              onChange={handleChange}
              className="w-2/3"
            />
          </div>
          <div className="flex items-center mb-4">
            <label
              className="inline-block w-1/3 text-sm font-bold text-gray-700"
              htmlFor="description"
            >
              Transaction Description:
            </label>
            <Input
              id="description"
              name="description"
              placeholder="Transaction Description"
              value={transaction.description}
              onChange={handleChange}
              className="w-2/3"
            />
          </div>
          <div className="flex justify-end mt-4">
            <PrimaryBtn
              onClick={handleSubmit}
              className="px-2 py-1 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
            >
              Add New
            </PrimaryBtn>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AddTransaction;
