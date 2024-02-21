import React from "react";

function SmallTitle({ className = "", children }) {
  return (
    <p
      className={`text-xl md:text-3xl font-semibold text-grayDark ${className}`}
    >
      {children}
    </p>
  );
}

export default SmallTitle;
