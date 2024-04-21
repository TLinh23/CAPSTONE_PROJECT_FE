import React from "react";
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
  const { checkRoleKey, roleKey, userId, fullName, userAvatar } =
    useAuthContext();
  const isAvatarNull = userAvatar === "null";
  return (
    <div className="sticky top-0 left-0 z-50 flex items-center justify-between w-full px-5 bg-white border-b border-gray-200 rigt-0">
      <div className="flex items-center w-full gap-5">
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
        <NavLink
          className="ml-7 p-2 hover:border-b hover:bg-[#2f8DE415] smooth-transform"
          to="/classrooms"
        >
          Explore Classrooms
        </NavLink>
        <NavLink
          className="p-2 hover:border-b hover:bg-[#2f8DE415] smooth-transform"
          to="/tutors"
        >
          Explore Tutors
        </NavLink>
      </div>
      {roleKey ? (
        <div className="flex items-center justify-end w-full">
          <div className="flex items-center justify-end w-full">
            <div>
              <Link
                className="flex items-center gap-3 px-2 py-5"
                to={`/profile/${userId}`}
              >
                <img
                  src={!isAvatarNull ? userAvatar : "/images/logo-default.png"}
                  alt="avatar"
                  className="object-cover w-10 h-10 rounded-full"
                />
                <div className="capitalize">
                  {roleKey} - {fullName}
                </div>
              </Link>
            </div>
            <SecondaryBtn
              onClick={() => {
                localStorage.clear();
                navigate("/");
                processLogout();
                checkRoleKey();
              }}
              className="!w-[120px] ml-5"
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
          Login
        </SecondaryBtn>
      )}
    </div>
  );
}

export default Header;
