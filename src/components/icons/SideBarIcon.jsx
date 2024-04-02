import React from "react";

function SideBarIcon(props) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5 7h14M5 12h14M5 17h14"
        stroke="#33363F"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
}

export default SideBarIcon;
