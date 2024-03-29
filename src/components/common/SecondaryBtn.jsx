import React from "react";

function SecondaryBtn({
  className = "",
  accessoriesLeft = null,
  children,
  ...props
}) {
  return (
    <button
      {...props}
      className={`flex items-center justify-center gap-2 w-full rounded text-primary border border-primary font-medium py-3 px-4 active:bg-[#2F8DE425] hover:bg-[#2F8DE425] disabled:bg-[#7f7f7f40] ${className}`}
    >
      {accessoriesLeft && <div className="">{accessoriesLeft}</div>}
      {children}
    </button>
  );
}

export default SecondaryBtn;
