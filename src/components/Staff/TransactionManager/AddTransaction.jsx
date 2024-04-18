import React, { useState } from "react";
import Layout from "../../layout/Layout";
import PrimaryBtn from "../../common/PrimaryBtn";
import FilterDropDown from "src/components/common/FilterDropDown";
import ProfileHeader from "src/components/Profile/ProfileHeader";
import PrimaryInput from "../../common/PrimaryInput";
import { useMutation, useQueries } from "react-query";
import { useAuthContext } from "src/context/AuthContext";
import { getProfileByIdDetail } from "src/apis/tutor-module";
import { getAllAccountsForStaff } from "src/apis/staff-module";
import { toast } from "react-toastify";
import { createNewTransaction } from "src/apis/transaction-module";
import { useNavigate } from "react-router-dom";

function AddTransaction() {
  const [newTransactionDetail, setNewTransactionDetail] = useState(undefined);
  const [dataProfileDetail, setDataProfileDetail] = useState(undefined);
  const [listParentAccount, setListParentAccount] = useState(undefined);
  const [payerAccountSelected, setPayerAccountSelected] = useState(undefined);
  const [paymentTypeSelected, setPaymentTypeSelected] = useState(undefined);
  const { userId } = useAuthContext();

  useQueries([
    {
      queryKey: ["getProfile", userId],
      queryFn: async () => {
        if (userId) {
          const response = await getProfileByIdDetail(userId);
          setDataProfileDetail(response?.data?.data);
          return response?.data;
        }
      },
      enabled: !!userId,
    },
    {
      queryKey: ["getListAccounts"],
      queryFn: async () => {
        const queryObj = {};
        queryObj["PagingRequest.CurrentPage"] = 1;
        queryObj["PagingRequest.PageSize"] = 99;

        const response = await getAllAccountsForStaff(queryObj);
        setListParentAccount(response?.data?.data);
        return response?.data;
      },
    },
  ]);

  const navigate = useNavigate();

  const addNewTransactionMutation = useMutation(
    async (newData) => {
      console.log("newData: ", newData);
      return await createNewTransaction(newData);
    },
    {
      onSuccess: (data) => {
        console.log("Data: ", data);
        if (data?.status >= 200 && data?.status < 300) {
          toast.success("Add successfully");
          navigate(-1);
        } else {
          toast.error(
            data?.message ||
              data?.response?.data?.message ||
              data?.response?.data ||
              "Oops! Something went wrong..."
          );
        }
      },
      onError: (err) => {
        toast.error(
          // @ts-ignore
          err?.response?.data?.message || err?.message || "Add error"
        );
      },
    }
  );

  const handleAddNewTransaction = () => {
    const queryObj = {
      ...newTransactionDetail,
      requestId: Number(userId),
      status: "CREATED",
    };
    if (payerAccountSelected) {
      queryObj["payerId"] = payerAccountSelected?.personId;
    }
    if (paymentTypeSelected) {
      queryObj["paymentType"] = paymentTypeSelected?.key;
    }
    console.log(queryObj);
    addNewTransactionMutation.mutate(queryObj);
  };

  return (
    <Layout>
      <div className="bg-white block-border">
        <ProfileHeader title="Add New Transaction" />
        <div className="flex flex-col gap-4 mt-10">
          <div className="grid gap-5 grid-cols-37">
            <label className="inline-block text-sm font-bold text-gray-700">
              Requested By: <span className="text-red-500">*</span>
            </label>
            <FilterDropDown
              listDropdown={undefined}
              showing={undefined}
              setShowing={undefined}
              textDefault={dataProfileDetail?.fullName}
              className="!w-2/3"
            />
            <label
              className="inline-block text-sm font-bold text-gray-700"
              htmlFor="payer"
            >
              Payer: <span className="text-red-500">*</span>
            </label>
            <FilterDropDown
              listDropdown={listParentAccount?.items}
              showing={payerAccountSelected}
              setShowing={setPayerAccountSelected}
              textDefault="Select payer"
              className="!w-2/3"
            />
            <label
              className="inline-block text-sm font-bold text-gray-700"
              htmlFor="payer"
            >
              Payment Type: <span className="text-red-500">*</span>
            </label>
            <FilterDropDown
              listDropdown={[
                {
                  id: 1,
                  key: "PHI DUY TRI TAI KHOAN",
                  value: "PHI DUY TRI TAI KHOAN",
                },
              ]}
              showing={paymentTypeSelected}
              setShowing={setPaymentTypeSelected}
              textDefault="Select payment type"
              className="!w-2/3"
            />
            <label
              className="inline-block text-sm font-bold text-gray-700"
              htmlFor="amount"
            >
              Pay Amount: <span className="text-red-500">*</span>
            </label>
            <PrimaryInput
              className="!w-2/3"
              type="number"
              onChange={(e) => {
                setNewTransactionDetail({
                  ...newTransactionDetail,
                  paymentAmount: e.target.value,
                });
              }}
              value={newTransactionDetail?.paymentAmount || ""}
            />
            <label
              className="inline-block text-sm font-bold text-gray-700"
              htmlFor="description"
            >
              Transaction Description:
            </label>
            <PrimaryInput
              className="!w-2/3"
              onChange={(e) => {
                setNewTransactionDetail({
                  ...newTransactionDetail,
                  paymentDesc: e.target.value,
                });
              }}
              value={newTransactionDetail?.paymentDesc || ""}
            />
            <label
              className="inline-block text-sm font-bold text-gray-700"
              htmlFor="description"
            >
              Request Date: <span className="text-red-500">*</span>
            </label>
            <PrimaryInput
              type="date"
              className="!w-2/3"
              onChange={(e) => {
                setNewTransactionDetail({
                  ...newTransactionDetail,
                  requestDate: e.target.value,
                });
              }}
              value={newTransactionDetail?.requestDate || ""}
            />
          </div>
          <div className="flex justify-center mt-4">
            <PrimaryBtn
              disabled={
                !payerAccountSelected ||
                !paymentTypeSelected ||
                !newTransactionDetail?.paymentAmount
              }
              onClick={handleAddNewTransaction}
              className="!w-[200px]"
            >
              Add
            </PrimaryBtn>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AddTransaction;
