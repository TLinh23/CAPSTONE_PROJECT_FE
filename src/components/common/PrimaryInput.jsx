import React from "react";

function PrimaryInput({
  title = null,
  className = "",
  placeholder = "",
  type = "",
  onChange = null,
  classNameInput = "",
  id = "",
  message = "",
  note = "",
  accessoriesLeft = null,
  accessoriesRight = null,
  value = undefined,
  disabled = false,
  isVisible = true,
  isError = undefined,
  messageError = null,
  ...props
}) {
  return (
    <div className={`${className}`}>
      {title && <div className="mb-2 text-sm font-bold text-gray">{title}</div>}
      {note && <p className="mb-2 text-sm text-gray">{note}</p>}
      <div className="relative w-full">
        {accessoriesLeft && (
          <div className="absolute top-3 left-4">{accessoriesLeft}</div>
        )}

        <input
          id={id}
          placeholder={placeholder}
          {...props}
          autoFocus={false}
          type={type}
          onChange={onChange}
          value={isVisible ? value : "hidden content"}
          disabled={disabled}
          className={`${
            !isVisible && "input-hidden"
          } read-only:bg-[#7F7F7F15] w-full text-sm py-3 rounded-md outline-none px-4 bg-transparent text-black border border-gray focus:border-primary hover:border-primary smooth-transform ${
            accessoriesLeft && "pl-11"
          } ${accessoriesRight && "pr-7"}
              ${classNameInput}`}
        />
        {accessoriesRight && (
          <div className="absolute cursor-pointer top-3 right-4">
            {accessoriesRight}
          </div>
        )}
      </div>
      {isError && (
        <div className="mt-2 text-sm text-red-500">{messageError}</div>
      )}
    </div>
  );
}
export default PrimaryInput;
