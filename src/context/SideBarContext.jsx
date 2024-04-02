import React, { createContext, useContext, useMemo, useState } from "react";

const SideBarContext = createContext({
  toggleModalSideBar: () => null,
  isOpenSideBar: false,
});

function SideBarProvider({ children }) {
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);

  const toggleModalSideBar = () => {
    setIsOpenSideBar(!isOpenSideBar);
  };

  const contextValue = useMemo(() => {
    return {
      toggleModalSideBar,
      isOpenSideBar,
    };
  }, [isOpenSideBar]);

  return (
    <SideBarContext.Provider value={contextValue}>
      {children}
    </SideBarContext.Provider>
  );
}

const useSideBarContext = () => useContext(SideBarContext);

export { SideBarContext, SideBarProvider, useSideBarContext };
