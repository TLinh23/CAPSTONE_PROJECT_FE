import React from "react";
import Title from "./Title";
import SecondaryBtn from "./SecondaryBtn";
import PrimaryBtn from "./PrimaryBtn";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Line from "./Line";

function HeaderDetail({
  className = "",
  homeUrl = "",
  editUrl = "",
  editBtn = false,
  children,
}) {
  const navigate = useNavigate();
  return (
    <div>
      <div
        className="flex items-center gap-3 cursor-pointer w-fit"
        onClick={() => {
          navigate(-1);
        }}
      >
        <div className="cursor-pointer">
          <ArrowLeftOutlined />
        </div>
        <Title>Detail</Title>
      </div>
      <div className="flex justify-around gap-5 md:justify-end">
        {editBtn && (
          <PrimaryBtn
            onClick={() => {
              navigate(editUrl);
            }}
            className="min-w-[140px]"
          >
            Edit
          </PrimaryBtn>
        )}
      </div>
      <Line className="mt-3" />
      <div className={`bg-white block-border mt-5 ${className}`}>
        {children}
      </div>
    </div>
  );
}

export default HeaderDetail;
