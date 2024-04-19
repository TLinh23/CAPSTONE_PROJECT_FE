import React from "react";

function ScheduleIcon(props) {
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
        height={15}
        rx={2}
        stroke="#33363F"
        strokeWidth={2}
      />
      <path
        d="M4 11h16M9 16h6M8 3v4M16 3v4"
        stroke="#33363F"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
}

export default ScheduleIcon;
