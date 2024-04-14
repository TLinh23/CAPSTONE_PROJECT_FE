import { format } from "date-fns";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PopupTemplate from "src/components/common/PopupTemplate";
import PrimaryBtn from "src/components/common/PrimaryBtn";
import PrimaryInput from "src/components/common/PrimaryInput";
import SmallTitle from "src/components/common/SmallTitle";
import { useAuthContext } from "src/context/AuthContext";
import { ROLE_NAME } from "src/constants/constants";
import AddSubjectPopup from "./AddSubjectPopup";
import PrimarySmallTitle from "src/components/common/PrimarySmallTitle";
import ProfileHeader from "../ProfileHeader";
import DeniedBtn from "src/components/common/DeniedBtn";
import DeleteSubjectPopup from "./DeleteSubjectPopup";

function TutorProfileDetail(props) {
  const { id } = useParams();
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
          <div className="grid items-center grid-cols-2 gap-4">
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
          </div>
          {((roleKey === ROLE_NAME.TUTOR &&
            String(userId) === String(dataProfileDetail?.account?.personId)) ||
            roleKey === ROLE_NAME.STAFF) && (
            <>
              <PrimaryInput
                title="Identify number"
                placeholder="Enter identify number"
                value={
                  dataProfileDetail?.tutor?.cmnd
                    ? dataProfileDetail?.tutor?.cmnd
                    : ""
                }
                readOnly
              />
              <PrimaryInput
                title="Phone number"
                placeholder="Enter phone number"
                value={dataProfileDetail?.phone ? dataProfileDetail?.phone : ""}
                readOnly
              />
              <PrimaryInput
                title="Address"
                rows={4}
                placeholder="Enter address"
                value={
                  dataProfileDetail?.address ? dataProfileDetail?.address : ""
                }
                readOnly
              />
            </>
          )}
          <PrimaryInput
            title={<p>School</p>}
            value={
              dataProfileDetail?.tutor?.school
                ? dataProfileDetail?.tutor?.school
                : ""
            }
            readOnly
          />
          <div className="grid items-center grid-cols-2 gap-4">
            <PrimaryInput
              title={<p>Education level</p>}
              placeholder="Enter education level"
              value={
                dataProfileDetail?.tutor?.educationLevel
                  ? dataProfileDetail?.tutor?.educationLevel
                  : ""
              }
              readOnly
            />
            <PrimaryInput
              title={<p>Graduation year</p>}
              placeholder="Enter graduation year"
              value={
                dataProfileDetail?.tutor?.graduationYear
                  ? dataProfileDetail?.tutor?.graduationYear
                  : ""
              }
              readOnly
            />
          </div>
          <div className="grid items-center gap-x-4 gap-y-2 grid-cols-2575">
            <PrimarySmallTitle>CV</PrimarySmallTitle>
            <div>
              <a
                className="underline hover:text-primary smooth-transform"
                href={dataProfileDetail?.tutor?.cv}
                target="_blank"
                rel="noreferrer"
              >
                View CV Now
              </a>
            </div>
            {((roleKey === ROLE_NAME.TUTOR &&
              String(userId) ===
                String(dataProfileDetail?.account?.personId)) ||
              roleKey === ROLE_NAME.STAFF) && (
              <>
                <PrimarySmallTitle>Identify Card</PrimarySmallTitle>
                <div>
                  <a
                    className="underline hover:text-primary smooth-transform"
                    href={dataProfileDetail?.tutor?.frontCmnd}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Front
                  </a>{" "}
                  /{" "}
                  <a
                    className="underline hover:text-primary smooth-transform"
                    href={dataProfileDetail?.tutor?.backCmnd}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Back
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
        <div>
          <SmallTitle className="mb-3 text-xl font-semibold text-center">
            List of Subject
          </SmallTitle>
          <div className="border rounded-md border-gray">
            <PrimaryInput
              placeholder="Search"
              classNameInput="!border !border-transparent"
              className="border-b border-b-gray"
            />
            <div className="flex flex-col">
              {dataProfileDetail?.subjectTutors?.map((item, index) => (
                <SubjectItem
                  key={index}
                  roleKey={roleKey}
                  userId={userId}
                  dataProfileDetail={dataProfileDetail}
                  item={item}
                />
              ))}
              {roleKey === ROLE_NAME.TUTOR &&
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
      {roleKey === ROLE_NAME.TUTOR &&
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
      {roleKey === ROLE_NAME.PARENT && (
        <div className="flex justify-center mt-8">
          <Link
            to={`/classroom-requests/create?requestType=OPEN&tutorId=${id}`}
            className="md:max-w-[222px]"
          >
            <PrimaryBtn>Send Request</PrimaryBtn>
          </Link>
        </div>
      )}
      <PopupTemplate
        setShowDialog={setIsShowPopupAddStudent}
        showDialog={isShowPopupAddStudent}
        title="Add subject"
        classNameWrapper="md:!min-w-[486px]"
      >
        <AddSubjectPopup />
      </PopupTemplate>
    </div>
  );
}

export default TutorProfileDetail;

function SubjectItem({ item, roleKey, userId, dataProfileDetail }) {
  const [isShowPopupEditStudent, setIsShowPopupEditStudent] = useState(false);
  const [isShowPopupDeleteStudent, setIsShowPopupDeleteStudent] =
    useState(false);

  const handleClickEdit = () => {
    setIsShowPopupEditStudent(true);
  };

  const handleClickDelete = () => {
    setIsShowPopupDeleteStudent(true);
  };

  return (
    <>
      <div className="flex items-center justify-between gap-3 px-3 py-2 border-b border-b-gray">
        <div>
          <div>{item?.subjectName}</div>
          <div>Class Level: {item?.level}</div>
        </div>
        {roleKey === ROLE_NAME.TUTOR &&
          String(userId) === String(dataProfileDetail?.account?.personId) && (
            <DeniedBtn
              className="!w-fit !py-1"
              onClick={() => {
                handleClickDelete();
              }}
            >
              Delete
            </DeniedBtn>
          )}
      </div>
      <PopupTemplate
        setShowDialog={setIsShowPopupDeleteStudent}
        showDialog={isShowPopupDeleteStudent}
        title="Delete subject"
        classNameWrapper="md:!min-w-[486px]"
      >
        <DeleteSubjectPopup item={item} />
      </PopupTemplate>
    </>
  );
}
