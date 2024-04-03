import React from "react";

const STATUS = {
  CREATED: "CREATED",
  REMOVE: "REMOVE",
};

function RenderStatus({ children, status = "" }) {
  return (
    <div
      className={`border w-fit px-2 py-1 rounded-md capitalize ${
        status === "approved" || status === STATUS.CREATED
          ? "border-approved text-approved"
          : status === "pending"
          ? "border-pending text-pending"
          : " border-denied text-denied"
      }`}
    >
      {children}
    </div>
  );
}

export default RenderStatus;
