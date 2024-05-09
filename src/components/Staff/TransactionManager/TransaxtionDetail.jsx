import React, { useState } from "react";
import RenderStatus from "src/components/common/RenderStatus";
import Title from "../../common/Title";
import { useParams } from "react-router-dom";
import { useQueries } from "react-query";
import { getTransactionDetail } from "src/apis/transaction-module";
import ProfileHeader from "src/components/Profile/ProfileHeader";

function TransactionDetail() {
  const [transactionDetail, setTransactionDetail] = useState(undefined);
  const { id } = useParams();

  useQueries([
    {
      queryKey: ["getTransactionDetail", id],
      queryFn: async () => {
        if (id) {
          const response = await getTransactionDetail(id);
          setTransactionDetail(response?.data?.data);
          return response?.data;
        }
      },
      enabled: !!id,
    },
  ]);

  return (
    <div className="bg-white block-border">
      <ProfileHeader title="Transaction Details" />
      <div className="max-w-2xl p-6 mx-auto mt-5 rounded-lg shadow-lg">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between">
            <RequestTitle>Payment Type:</RequestTitle>
            <RequestDescription>
              {transactionDetail?.paymentType}
            </RequestDescription>
          </div>

          <div className="flex justify-between">
            <RequestTitle>Requested By:</RequestTitle>
            <RequestDescription>
              {transactionDetail?.requestName}
            </RequestDescription>
          </div>

          <div className="flex justify-between">
            <RequestTitle>Payer:</RequestTitle>
            <RequestDescription>
              {transactionDetail?.payerName}
            </RequestDescription>
          </div>

          <div className="flex justify-between">
            <RequestTitle>Pay Amount:</RequestTitle>
            <RequestDescription>
              {transactionDetail?.paymentAmount}
            </RequestDescription>
          </div>

          <div className="flex justify-between">
            <RequestTitle>Transaction Code:</RequestTitle>
            <RequestDescription>
              {transactionDetail?.paymentDesc}
            </RequestDescription>
          </div>

          <div className="flex justify-between">
            <RequestTitle>Request Date:</RequestTitle>
            <RequestDescription>
              {transactionDetail?.requestDate}
            </RequestDescription>
          </div>

          <div className="flex justify-between">
            <RequestTitle>Pay Date:</RequestTitle>
            <RequestDescription>
              {transactionDetail?.payDate}
            </RequestDescription>
          </div>

          <div className="flex justify-between">
            <RequestTitle>Status:</RequestTitle>
            <div
              className={`border w-fit px-2 py-1 rounded-md capitalize ${
                transactionDetail?.status === "PAID"
                  ? "border-approved text-approved"
                  : "border-pending text-pending"
              }`}
            >
              {transactionDetail?.status}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RequestTitle({ children }) {
  return <div className="mr-4 text-lg font-semibold">{children}</div>;
}

function RequestDescription({ children }) {
  return <span className="text-sm font-normal">{children}</span>;
}

export default TransactionDetail;
