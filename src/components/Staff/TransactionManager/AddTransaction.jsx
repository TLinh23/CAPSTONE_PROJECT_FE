import React, { useState } from "react";
import Layout from "../../layout/Layout";
import Title from "../../common/Title";
import Input from "../../common/PrimaryInput";
import PrimaryBtn from "../../common/PrimaryBtn";
import axios from "axios";
import { useNotification } from "src/hooks/useNotification";
import { createPayment } from "src/constants/APIConfig";
import FilterDropDown from "src/components/common/FilterDropDown";

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
      <div className="bg-white block-border">
        <Title>Add New Transaction</Title>
        <div className="flex flex-col gap-4 mt-10">
          <div className="grid gap-5 grid-cols-37">
            <label
              className="inline-block w-1/3 text-sm font-bold text-gray-700"
              htmlFor="requestedBy"
            >
              Requested By:
            </label>
            <FilterDropDown
              listDropdown={undefined}
              showing={undefined}
              setShowing={undefined}
              textDefault="Select requested by"
              className="!w-2/3"
            />
          </div>
          <div className="grid gap-5 grid-cols-37">
            <label
              className="inline-block w-1/3 text-sm font-bold text-gray-700"
              htmlFor="payer"
            >
              Payer:
            </label>
            <FilterDropDown
              listDropdown={undefined}
              showing={undefined}
              setShowing={undefined}
              textDefault="Select payer"
              className="!w-2/3"
            />
          </div>
          <div className="grid gap-5 grid-cols-37">
            <label
              className="inline-block w-1/3 text-sm font-bold text-gray-700"
              htmlFor="payer"
            >
              Payer:
            </label>
            <FilterDropDown
              listDropdown={undefined}
              showing={undefined}
              setShowing={undefined}
              textDefault="Select payment type"
              className="!w-2/3"
            />
          </div>
          <div className="grid gap-5 grid-cols-37">
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
          <div className="grid gap-5 grid-cols-37">
            <label
              className="inline-block text-sm font-bold text-gray-700"
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
          <div className="flex justify-center mt-4">
            <PrimaryBtn onClick={handleSubmit} className="!w-[200px]">
              Add
            </PrimaryBtn>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AddTransaction;
