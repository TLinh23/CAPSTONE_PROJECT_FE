import React from "react";

function SmallTitle({ className = "", children }) {
  return (
    <p className={`text-xl font-medium text-grayDark ${className}`}>
      {children}
    </p>
  );
}

export default SmallTitle;
