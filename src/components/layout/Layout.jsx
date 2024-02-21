import React from "react";
import BellIcon from "../icons/BellIcon";
import MessageIcon from "../icons/MessageIcon";

function Layout(props) {
  return (
    <div>
      {/* Header  */}
      <div className="flex items-center justify-between px-5 border-b border-gray-200">
        <a className="py-6" href="/">
          <img
            src="https://amentotech.com/htmls/tuturn/images/logo.png"
            alt="logo"
            className="h-[30px] object-cover"
          />
        </a>
        <div className="flex items-center justify-end w-full">
          <div className="flex items-center">
            {/* List navigate */}
            <div className="relative px-4 py-[26px] border-t-[2px] border-t-orange-500">
              <div className="absolute top-[13px] right-[4px] px-2 text-xs text-white bg-orange-500 rounded-lg rounded-br-sm">
                New
              </div>
              Online Classes
            </div>
          </div>
          <div className="flex items-center">
            <div className="relative px-2 py-6">
              <div className="absolute right-0 flex items-center justify-center w-5 h-5 bg-red-500 rounded-full top-[18px]">
                4
              </div>
              <MessageIcon />
            </div>
            <div className="relative px-2 py-6">
              <BellIcon />
            </div>
            <div className="px-2 py-5">
              <img
                src="https://amentotech.com/htmls/tuturn/images/login.png"
                alt="avatar"
                className="object-cover w-10 h-10 rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
      {props.children}
      {/* Footer */}
    </div>
  );
}

export default Layout;
