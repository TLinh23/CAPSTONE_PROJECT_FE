import React from "react";
import { ROLE_NAME } from "src/constants/constants";
import { useAuthContext } from "src/context/AuthContext";
import TutorOrderDetail from "./Tutor/TutorOrderDetail";
import ParentOrderDetail from "./Parent/ParentOrderDetail";

function OrderRequestDetail() {
  const { roleKey } = useAuthContext();
  return (
    <div>
      {roleKey === ROLE_NAME.PARENT && <ParentOrderDetail />}
      {roleKey === ROLE_NAME.TUTOR && <TutorOrderDetail />}
    </div>
  );
}

export default OrderRequestDetail;
