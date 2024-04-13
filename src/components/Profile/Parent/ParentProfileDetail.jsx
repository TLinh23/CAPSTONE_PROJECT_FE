import { format } from "date-fns";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PopupTemplate from "src/components/common/PopupTemplate";
import PrimaryBtn from "src/components/common/PrimaryBtn";
import PrimaryInput from "src/components/common/PrimaryInput";
import SmallTitle from "src/components/common/SmallTitle";
import AddStudentPopup from "./AddStudentPopup";
import EditStudentPopup from "./EditStudentPopup";
import { useAuthContext } from "src/context/AuthContext";
import { ROLE_NAME } from "src/constants/constants";
import PrimarySmallTitle from "src/components/common/PrimarySmallTitle";
import ProfileHeader from "../ProfileHeader";
import DeniedBtn from "src/components/common/DeniedBtn";

function ParentProfileDetail(props) {
  const { dataProfileDetail } = props;
  const { userId, roleKey } = useAuthContext();
  const [isShowPopupAddStudent, setIsShowPopupAddStudent] = useState(false);
  const navigate = useNavigate();

  const handleClickAddMoreStudent = () => {
    setIsShowPopupAddStudent(true);
  };

  return (
    <div className="bg-[#ffffff] block-border">
      <ProfileHeader title="Personal information" />
      <div className="grid grid-cols-1 gap-4 mt-5 md:grid-cols-155530">
        <div className="w-full h-auto">
          <div className="flex flex-col items-center justify-between">
            <div>
              <div className="mb-5 text-xl font-semibold text-center">
                Avatar
              </div>
              <div className="flex items-center justify-center rounded w-[200px] h-[200px]">
                <img
                  className="object-cover w-full h-full rounded"
                  src={
                    dataProfileDetail?.userAvater || "/images/logo-default.png"
                  }
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="mt-5">
            Role: {dataProfileDetail?.account?.roleName}
          </div>
          <div className="mt-3">Email: {dataProfileDetail?.account?.email}</div>
        </div>
        <div className="flex flex-col gap-4">
          <PrimaryInput
            title={
              <p>
                Full name <span className="text-red-500">*</span>
              </p>
            }
            placeholder="Enter first name"
            value={
              dataProfileDetail?.fullName ? dataProfileDetail?.fullName : ""
            }
            readOnly
          />
          <PrimaryInput
            title="Gender"
            value={dataProfileDetail?.gender ? dataProfileDetail?.gender : ""}
            readOnly
          />
          <PrimaryInput
            title="Birth date"
            value={
              dataProfileDetail?.dob
                ? format(new Date(dataProfileDetail?.dob), "dd-MM-yyyy")
                : ""
            }
            readOnly
          />
          {((roleKey === ROLE_NAME.PARENT &&
            String(userId) === String(dataProfileDetail?.account?.personId)) ||
            roleKey === ROLE_NAME.STAFF) && (
            <>
              <PrimaryInput
                title="Phone number"
                placeholder="Enter phone number"
                type="number"
                value={dataProfileDetail?.phone ? dataProfileDetail?.phone : ""}
                readOnly
              />
              <PrimaryInput
                title="Address detail"
                rows={4}
                placeholder="Enter address detail"
                value={
                  dataProfileDetail?.address ? dataProfileDetail?.address : ""
                }
                readOnly
              />
            </>
          )}
        </div>
        <div>
          <SmallTitle className="mb-3 text-xl font-semibold text-center">
            List of Student
          </SmallTitle>
          <div className="border rounded-md border-gray">
            <PrimaryInput
              placeholder="Search"
              classNameInput="!border !border-transparent"
              className="border-b border-b-gray"
            />
            <div className="flex flex-col">
              {dataProfileDetail?.students?.map((item, index) => (
                <StudentItem
                  item={item}
                  key={index}
                  roleKey={roleKey}
                  userId={userId}
                  dataProfileDetail={dataProfileDetail}
                />
              ))}
              {roleKey === ROLE_NAME.PARENT &&
                String(userId) ===
                  String(dataProfileDetail?.account?.personId) && (
                  <div
                    className="p-2 text-center cursor-pointer smooth-transform hover:underline"
                    onClick={handleClickAddMoreStudent}
                  >
                    Add more
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
      {roleKey === ROLE_NAME.PARENT &&
        String(userId) === String(dataProfileDetail?.account?.personId) && (
          <div className="flex justify-center mt-8">
            <PrimaryBtn
              className="md:max-w-[222px]"
              onClick={() => {
                navigate(`/profile/${dataProfileDetail?.id}/edit`);
              }}
            >
              Update
            </PrimaryBtn>
          </div>
        )}
      <PopupTemplate
        setShowDialog={setIsShowPopupAddStudent}
        showDialog={isShowPopupAddStudent}
        title="Add student"
      >
        <AddStudentPopup />
      </PopupTemplate>
    </div>
  );
}

export default ParentProfileDetail;

function StudentItem({ item, roleKey, userId, dataProfileDetail }) {
  const [isShowPopupEditStudent, setIsShowPopupEditStudent] = useState(false);
  const handleClickEdit = () => {
    setIsShowPopupEditStudent(true);
  };

  return (
    <div className="flex items-center justify-between gap-3 px-3 py-2 border-b border-b-gray">
      <div>
        <div>{item?.fullName}</div>
        <div>{item?.phone}</div>
      </div>
      {roleKey === ROLE_NAME.PARENT &&
        String(userId) === String(dataProfileDetail?.account?.personId) && (
          <div>
            <PrimaryBtn
              className="!w-fit !py-1"
              onClick={() => {
                handleClickEdit();
              }}
            >
              Edit
            </PrimaryBtn>
            <DeniedBtn
              className="!w-fit !py-1 mt-1"
              onClick={() => {
                handleClickEdit();
              }}
            >
              Delete
            </DeniedBtn>
          </div>
        )}
      <PopupTemplate
        setShowDialog={setIsShowPopupEditStudent}
        showDialog={isShowPopupEditStudent}
        title="Edit student"
      >
        <EditStudentPopup />
      </PopupTemplate>
    </div>
  );
}
