import React from "react";
import ListTutorTransaction from "src/components/Staff/TransactionManager/ListTutorTransaction";
import { ROLE_NAME } from "src/constants/constants";
import { useAuthContext } from "src/context/AuthContext";
import UnauthorizedPage from "./UnauthorizedPage";

function PageTutorTransaction() {
  const { roleKey } = useAuthContext();
  return roleKey === ROLE_NAME.TUTOR ? (
    <ListTutorTransaction />
  ) : (
    <UnauthorizedPage />
  );
}

export default PageTutorTransaction;
