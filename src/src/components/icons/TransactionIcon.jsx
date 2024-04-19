import React from "react";

function TransactionIcon(props) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x={3}
        y={6}
        width={18}
        height={13}
        rx={2}
        stroke="#33363F"
        strokeWidth={2}
      />
      <path
        d="M7 15h.01M4 11h17"
        stroke="#33363F"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
}

export default TransactionIcon;
