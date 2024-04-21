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
  fullName: "",
  userAvatar: "",
});

function AuthProvider({ children }) {
  const [roleKey, setRoleKey] = useState("");
  const [userId, setUserId] = useState("");
  const [fullName, setFullName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");

  const checkRoleKey = () => {
    const roleKey = localStorage?.getItem("roleKey");
    setRoleKey(roleKey);
  };
  const checkUserId = () => {
    const userId = localStorage?.getItem("userId");
    const fullName = localStorage?.getItem("fullName");
    const userAvatar = localStorage?.getItem("userAvatar");
    setUserAvatar(userAvatar);
    setFullName(fullName);
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
      fullName,
      userAvatar,
    }),
    [roleKey, userId, fullName, userAvatar]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

const useAuthContext = () => useContext(AuthContext);

export { AuthContext, AuthProvider, useAuthContext };
