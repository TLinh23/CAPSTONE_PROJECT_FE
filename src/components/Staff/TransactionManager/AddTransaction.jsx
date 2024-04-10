import React, { useState } from "react";
import Layout from "../../layout/Layout";
import Title from "../../common/Title";
import Input from "../../common/PrimaryInput";
import PrimaryBtn from "../../common/PrimaryBtn";
import axios from "axios";
import { useNotification } from "src/hooks/useNotification";
// @ts-ignore
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
               const currentDate = new Date(Date.now());
               const dateString = currentDate.toLocaleString();
               const fetchData = await axios.post(
                    createPayment,
                    {
                         payerId: transaction.payer,
                         requestId: transaction.requestedBy,
                         paymentAmount: transaction.amount,
                         paymentDesc: transaction.description,
                         paymentType: transaction.paymentType,
                         requestDate: dateString,
                         payDate: dateString,
                         createdAt: dateString,
                         updatedAt: dateString,
                         status: "CREATED",
                    },
                    {
                         headers: {
                              Authorization:
                                   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJoYWluYW0zMzFAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU1RBRkYiLCJleHAiOjE3MTUzNjA0ODAsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjUwMDAvIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NTAwMC8ifQ.qdtg9j71OvL6Na7iale13YTxSzj4OInQoYrm3Uzebyo",
                         },
                    }
               );

               if (fetchData.status == 200) {
                    openNotification(
                         "topRight",
                         "success",
                         "create successfully!"
                    );
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
