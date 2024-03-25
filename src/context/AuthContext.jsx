import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const AuthContext = createContext({
  roleKey: "",
  checkRoleKey: () => null,
  userId: "",
  checkUserId: () => null,
});

function AuthProvider({ children }) {
  const [roleKey, setRoleKey] = useState("");
  const [userId, setUserId] = useState("");

  const checkRoleKey = () => {
    const roleKey = localStorage?.getItem("roleKey");
    setRoleKey(roleKey);
  };
  const checkUserId = () => {
    const userId = localStorage?.getItem("userId");
    setUserId(userId);
  };

  useEffect(() => {
    checkRoleKey();
    checkUserId();
  }, []);

  const contextValue = useMemo(
    () => ({
      roleKey,
      checkRoleKey,
      userId,
      checkUserId,
    }),
    [roleKey, userId]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

const useAuthContext = () => useContext(AuthContext);

export { AuthContext, AuthProvider, useAuthContext };
