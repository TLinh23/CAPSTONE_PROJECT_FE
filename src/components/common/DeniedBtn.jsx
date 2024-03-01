import React from "react";

function DeniedBtn({ className = "", children, ...props }) {
  return (
    <button
      {...props}
      className={`bg-transparent w-full rounded text-denied border border-denied font-medium py-3 px-4 active:bg-[#B5283535] hover:bg-[#B5283515] disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}

export default DeniedBtn;
