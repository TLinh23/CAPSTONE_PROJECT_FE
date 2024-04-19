import React from "react";

function MessageIcon(props) {
  return (
    <svg
      width={30}
      height={30}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4 10.472c0-1.203 0-1.804.299-2.287.298-.484.836-.753 1.912-1.29l4-2c.878-.44 1.317-.659 1.789-.659s.911.22 1.789.658l4 2c1.076.538 1.614.807 1.912 1.29C20 8.669 20 9.27 20 10.473V16c0 1.886 0 2.828-.586 3.414C18.828 20 17.886 20 16 20H8c-1.886 0-2.828 0-3.414-.586C4 18.828 4 17.886 4 16v-5.528z"
        stroke="#222"
      />
      <path
        d="M4 10l2.414 2.414A2 2 0 007.828 13h8.344a2 2 0 001.414-.586L20 10"
        stroke="#222"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default MessageIcon;
