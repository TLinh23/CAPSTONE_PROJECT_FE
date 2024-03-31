import React from "react";
import Title from "../common/Title";
import { useNavigate } from "react-router-dom";
import ArrowLeftIcon from "../icons/ArrowLeftIcon";

function ProfileHeader({ title = "" }) {
  const navigate = useNavigate();
  return (
    <div
      className="flex items-center gap-3 cursor-pointer w-fit"
      onClick={() => {
        navigate(-1);
      }}
    >
      <div className="cursor-pointer">
        <ArrowLeftIcon />
      </div>
      <Title>{title}</Title>
    </div>
  );
}

export default ProfileHeader;
