import React from "react";
import MessageIcon from "../icons/MessageIcon";
import BellIcon from "../icons/BellIcon";
import SecondaryBtn from "../common/SecondaryBtn";
import LoginIcon from "../icons/LoginIcon";
import { NavLink } from "react-router-dom";

function Header() {
  const isLogedIn = false;

  return (
    <div className="sticky top-0 left-0 z-50 flex items-center justify-between w-full px-5 bg-white border-b border-gray-200 rigt-0">
      <NavLink className="py-6" to="/">
        <img
          src="https://amentotech.com/htmls/tuturn/images/logo.png"
          alt="logo"
          className="h-[30px] object-cover"
        />
      </NavLink>
      {isLogedIn ? (
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
      ) : (
        <SecondaryBtn
          className="!w-fit !py-2 border-2"
          accessoriesLeft={<LoginIcon />}
        >
          Log In
        </SecondaryBtn>
      )}
    </div>
  );
}

export default Header;
