import React from "react";

function SubMenu({ setActiveTab, activeTab, listMenu, className = "" }) {
  return (
    <div className={`flex items-baseline gap-1 ${className}`}>
      {listMenu?.map((i) => (
        <TabItem
          setActiveTab={setActiveTab}
          key={i?.id}
          activeTab={activeTab}
          subMenuItem={i}
        />
      ))}
    </div>
  );
}

export default SubMenu;

function TabItem({ activeTab, setActiveTab, subMenuItem }) {
  const handleClickItem = () => {
    setActiveTab(subMenuItem?.id);
  };

  return (
    <div
      onClick={handleClickItem}
      className={`cursor-pointer smooth-transform hover:text-primary hover:bg-[#0077FF20] text-center md:min-w-[200px] min-w-[70px] text-base py-2 rounded-[10px] border-b-[2px] ${
        subMenuItem?.id === activeTab
          ? "bg-[#0077FF20] text-primary"
          : "text-gray"
      }`}
    >
      {subMenuItem.label}
    </div>
  );
}
