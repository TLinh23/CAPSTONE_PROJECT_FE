import React from "react";

function PrimaryInputCheckbox({
  className = "",
  onClick = null,
  accessoriesLeft = null,
  accessoriesRight = null,
  checked = false,
  onChange = null,
  classNameInputCheckBox = "",
  ...props
}) {
  return (
    <label className={`flex items-center ${className}`}>
      {accessoriesLeft && <div className="mr-2">{accessoriesLeft}</div>}
      <input
        type="checkbox"
        className={`absolute w-5 h-5 opacity-0 cursor-pointer custom-checkbox ${classNameInputCheckBox}`}
        {...props}
        onClick={onClick}
        checked={checked}
        onChange={onChange}
      />
      <div
        className={`flex items-center justify-center flex-shrink-0 w-5 h-5 border rounded-md border-primary focus-within:border-blue-500 ${
          checked && "bg-primary"
        }`}
      >
        <svg
          className="hidden"
          width={10}
          height={8}
          viewBox="0 0 8 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.011 5.706a.727.727 0 01-.516-.213L.518 3.516a.728.728 0 111.03-1.032l1.463 1.462 3.44-3.44a.728.728 0 111.031 1.032L3.527 5.493a.727.727 0 01-.516.213z"
            fill="#FFFFFF"
          />
        </svg>
      </div>
      {accessoriesRight && (
        <div className="ml-3 cursor-pointer">{accessoriesRight}</div>
      )}
    </label>
  );
}

export default PrimaryInputCheckbox;
