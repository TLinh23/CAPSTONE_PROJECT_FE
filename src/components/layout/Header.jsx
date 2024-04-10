import React from "react";
import MessageIcon from "../icons/MessageIcon";
import BellIcon from "../icons/BellIcon";
import SecondaryBtn from "../common/SecondaryBtn";
import LoginIcon from "../icons/LoginIcon";
import { Link, NavLink, useNavigate } from "react-router-dom";
import SideBarIcon from "../icons/SideBarIcon";
import { useSideBarContext } from "src/context/SideBarContext";
import { useAuthContext } from "src/context/AuthContext";
import { processLogout } from "src/libs/processLogout";

function Header() {
  const navigate = useNavigate();
  const { toggleModalSideBar } = useSideBarContext();
  const { checkRoleKey, roleKey, userId } = useAuthContext();
  return (
    <div className="sticky top-0 left-0 z-50 flex items-center justify-between w-full px-5 bg-white border-b border-gray-200 rigt-0">
      <div className="flex items-center gap-5">
        {roleKey && (
          <div
            className="p-1 border rounded-md cursor-pointer border-gray hover:bg-[#7f7f7f30] smooth-transform"
            onClick={() => {
              toggleModalSideBar();
            }}
          >
            <SideBarIcon />
          </div>
        )}
        <NavLink className="py-6" to="/">
          <img
            src="https://amentotech.com/htmls/tuturn/images/logo.png"
            alt="logo"
            className="h-[30px] object-cover"
          />
        </NavLink>
      </div>
      {roleKey ? (
        <div className="flex items-center justify-end w-full">
          {/* <div className="flex items-center">
            <div className="relative px-4 py-[26px] border-t-[2px] border-t-orange-500">
              <div className="absolute top-[13px] right-[4px] px-2 text-xs text-white bg-orange-500 rounded-lg rounded-br-sm">
                New
              </div>
              Online Classes
            </div>
          </div> */}
          <div className="flex items-center justify-end w-full">
            {/* <div className="relative px-2 py-6">
              <div className="absolute right-0 flex items-center justify-center w-5 h-5 bg-red-500 rounded-full top-[18px]">
                4
              </div>
              <MessageIcon />
            </div>
            <div className="relative px-2 py-6">
              <BellIcon />
            </div> */}
            <div>
              <Link
                className="flex items-center gap-3 px-2 py-5"
                to={`/profile/${userId}`}
              >
                <img
                  src="https://amentotech.com/htmls/tuturn/images/login.png"
                  alt="avatar"
                  className="object-cover w-10 h-10 rounded-full"
                />
                <div className="uppercase">{roleKey}</div>
              </Link>
            </div>
            <SecondaryBtn
              onClick={() => {
                localStorage.clear();
                processLogout();
                checkRoleKey();
              }}
              className="w-[120px] ml-5"
            >
              Logout
            </SecondaryBtn>
          </div>
        </div>
      ) : (
        <SecondaryBtn
          className="!w-fit !py-2 border-2"
          accessoriesLeft={<LoginIcon />}
          onClick={() => {
            navigate("/login");
          }}
        >
          Log In
        </SecondaryBtn>
      )}
    </div>
  );
}

export default Header;
