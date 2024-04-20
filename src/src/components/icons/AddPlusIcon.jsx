import React from "react";

function AddPlusIcon(props) {
  return (
    <svg
      width={12}
      height={12}
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.32 4.708H4.75v2.549c0 .41-.336.743-.75.743a.746.746 0 01-.75-.743V4.708H.68A.753.753 0 010 3.961c0-.385.293-.707.68-.747h2.562V.674A.755.755 0 013.996 0c.388 0 .714.29.754.674v2.54h2.57c.387.04.68.362.68.747a.753.753 0 01-.68.747z"
        fill="#000"
      />
    </svg>
  );
}

export default AddPlusIcon;
