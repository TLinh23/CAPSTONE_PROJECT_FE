import React from "react";

const STATUS = {
  ACTIVE: "ACTIVE",
  ACCEPTED: "ACCEPTED",
  CREATED: "CREATED",
  REMOVE: "REMOVE",
  PENDING: "PENDING",
  PAID: "PAID",
  COMPLETED: "COMPLETED",
};

function RenderStatus({ className = "", children, status = "" }) {
  return (
    <div
      className={`border w-fit px-2 py-1 rounded-md capitalize ${
        status === "approved" ||
        status === STATUS.CREATED ||
        status === STATUS.ACCEPTED ||
        status === STATUS.ACTIVE ||
        status === STATUS.PAID ||
        status === STATUS.COMPLETED
          ? "border-approved text-approved"
          : status === "pending" || status === STATUS.PENDING
          ? "border-pending text-pending"
          : " border-denied text-denied"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default RenderStatus;
