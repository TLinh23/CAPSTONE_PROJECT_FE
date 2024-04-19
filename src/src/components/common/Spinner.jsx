import React from "react";
import { useAppSelector } from "src/store";
import { Spin } from "antd";

function Spinner() {
  // @ts-ignore
  const isLoading = useAppSelector((state) => state.loadingPage);

  return (
    isLoading && (
      <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full z-9999">
        <Spin size="large" />
      </div>
    )
  );
}

export default Spinner;
