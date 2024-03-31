import React, { useState } from "react";
import { useAuthContext } from "src/context/AuthContext";
import ParentOrders from "./Parent/ParentOrders";
import { ROLE_NAME } from "src/constants/constants";
import TutorOrders from "./Tutor/TutorOrders";

function ListOrderRequest() {
  const { roleKey } = useAuthContext();
  return (
    <div>
      {roleKey === ROLE_NAME.PARENT && <ParentOrders />}
      {roleKey === ROLE_NAME.TUTOR && <TutorOrders />}
    </div>
  );
}

export default ListOrderRequest;
