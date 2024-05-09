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
        status.toUpperCase() === "approved" ||
        status.toUpperCase() === STATUS.CREATED ||
        status.toUpperCase() === STATUS.ACCEPTED ||
        status.toUpperCase() === STATUS.ACTIVE ||
        status.toUpperCase() === STATUS.PAID ||
        status.toUpperCase() === STATUS.COMPLETED
          ? "border-approved text-approved"
          : status.toLowerCase() === "pending" ||
            status.toUpperCase() === STATUS.PENDING
          ? "border-pending text-pending"
          : " border-denied text-denied"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default RenderStatus;
