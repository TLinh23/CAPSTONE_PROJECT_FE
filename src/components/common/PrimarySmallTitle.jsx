import React from "react";

function PrimarySmallTitle({ className = "", children }) {
  return (
    <div className={`text-sm font-bold text-gray ${className}`}>{children}</div>
  );
}

export default PrimarySmallTitle;
