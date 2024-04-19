import React from "react";

function ProfileIcon(props) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle
        cx={12}
        cy={7}
        r={4}
        stroke="#33363F"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <path
        d="M5.338 18.32C5.999 15.528 8.772 14 11.643 14h.714c2.871 0 5.644 1.527 6.305 4.32.128.541.23 1.107.287 1.682.055.55-.397.998-.949.998H6c-.552 0-1.004-.449-.949-.998.057-.575.159-1.14.287-1.681z"
        stroke="#33363F"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
}

export default ProfileIcon;
