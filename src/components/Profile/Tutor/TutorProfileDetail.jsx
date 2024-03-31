import { format } from "date-fns";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FilterDropDown from "src/components/common/FilterDropDown";
import PopupTemplate from "src/components/common/PopupTemplate";
import PrimaryBtn from "src/components/common/PrimaryBtn";
import PrimaryInput from "src/components/common/PrimaryInput";
import SmallTitle from "src/components/common/SmallTitle";
import Title from "src/components/common/Title";
import { useAuthContext } from "src/context/AuthContext";
import { ROLE_NAME } from "src/constants/constants";
import AddSubjectPopup from "./AddSubjectPopup";
import EditSubjectPopup from "./EditSubjectPopup";
import PrimarySmallTitle from "src/components/common/PrimarySmallTitle";
import ProfileHeader from "../ProfileHeader";

function TutorProfileDetail(props) {
  const { dataProfileDetail } = props;
  // fill data from dataProfileDetail, which is from api
  const { userId, roleKey } = useAuthContext();
  const [isShowPopupAddStudent, setIsShowPopupAddStudent] = useState(false);
  const [isShowPopupEditStudent, setIsShowPopupEditStudent] = useState(false);
  const [gender, setGender] = useState();
  const navigate = useNavigate();

  const handleClickAddMoreStudent = () => {
    setIsShowPopupAddStudent(true);
  };

  const handleEditStudent = () => {
    setIsShowPopupEditStudent(true);
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
              <div className="flex items-center justify-center border rounded border-primary w-[200px] h-[200px]">
                <img
                  className="object-cover w-full h-full rounded"
                  src="https://vcdn-thethao.vnecdn.net/2023/09/03/ronaldo-850-jpeg-1693687478-1789-1693688039.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="mt-5">Role: Tutor</div>
          <div className="mt-3">Email: tutor@gmail.com</div>
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
              dataProfileDetail?.userName ? dataProfileDetail?.userName : ""
            }
            readOnly
          />
          <div className="grid items-center grid-cols-2 gap-4">
            <FilterDropDown
              title="Gender"
              listDropdown={[
                { id: 1, value: "Male", name: "Male" },
                { id: 2, value: "Female", name: "Female" },
              ]}
              showing={gender || { id: 1, value: "Male", name: "Male" }}
              setShowing={setGender}
              disabled
            />
            <div>
              <PrimarySmallTitle className="mb-2">
                Date of birth
              </PrimarySmallTitle>
              <input
                max={new Date().toISOString().slice(0, 10)}
                value={
                  dataProfileDetail?.birthDate
                    ? format(
                        new Date(dataProfileDetail?.birthDate),
                        "yyyy-MM-dd"
                      )
                    : ""
                }
                type="date"
                disabled
                className="w-full h-[46px] px-4 py-3 border rounded-md outline-none border-gray focus:border-primary hover:border-primary smooth-transform"
              />
            </div>
          </div>
          {(roleKey === ROLE_NAME.TUTOR &&
            String(userId) === String(dataProfileDetail?.id)) ||
            (roleKey === ROLE_NAME.STAFF && (
              <>
                <PrimaryInput
                  title="Identify number"
                  placeholder="Enter identify number"
                  value={
                    dataProfileDetail?.idNumber
                      ? dataProfileDetail?.idNumber
                      : ""
                  }
                  readOnly
                  isVisible={
                    (roleKey === ROLE_NAME.TUTOR &&
                      String(userId) === String(dataProfileDetail?.id)) ||
                    roleKey === ROLE_NAME.STAFF
                  }
                />
                <PrimaryInput
                  title="Phone number"
                  placeholder="Enter phone number"
                  type="number"
                  value={
                    dataProfileDetail?.phone ? dataProfileDetail?.phone : ""
                  }
                  readOnly
                  isVisible={
                    (roleKey === ROLE_NAME.TUTOR &&
                      String(userId) === String(dataProfileDetail?.id)) ||
                    roleKey === ROLE_NAME.STAFF
                  }
                />
                <PrimaryInput
                  title="Address"
                  rows={4}
                  placeholder="Enter address"
                  value={
                    dataProfileDetail?.address ? dataProfileDetail?.address : ""
                  }
                  readOnly
                  isVisible={
                    (roleKey === ROLE_NAME.TUTOR &&
                      String(userId) === String(dataProfileDetail?.id)) ||
                    roleKey === ROLE_NAME.STAFF
                  }
                />
              </>
            ))}
          <div className="grid items-center grid-cols-2 gap-4">
            <PrimaryInput
              title={<p>Education level</p>}
              placeholder="Enter education level"
              value={
                dataProfileDetail?.userName ? dataProfileDetail?.userName : ""
              }
              readOnly
            />
            <PrimaryInput
              title={<p>Graduation year</p>}
              placeholder="Enter graduation year"
              value={
                dataProfileDetail?.userName ? dataProfileDetail?.userName : ""
              }
              readOnly
            />
          </div>
          <div className="grid items-center gap-x-4 gap-y-2 grid-cols-2575">
            <PrimarySmallTitle>CV</PrimarySmallTitle>
            <div>
              <a
                className="underline hover:text-primary smooth-transform"
                href="https://ik.imagekit.io/ducdev/Minimalist%20Modern%20Professional%20CV%20Resume.pdf?updatedAt=1711421259030"
                target="_blank"
                rel="noreferrer"
              >
                View CV Now
              </a>
            </div>
            {(roleKey === ROLE_NAME.TUTOR &&
              String(userId) === String(dataProfileDetail?.id)) ||
              (roleKey === ROLE_NAME.STAFF && (
                <>
                  <PrimarySmallTitle>Identify Card</PrimarySmallTitle>
                  <div>
                    <a
                      className="underline hover:text-primary smooth-transform"
                      href="https://ik.imagekit.io/ducdev/default-image.jpg?updatedAt=1711243098701"
                      target="_blank"
                      rel="noreferrer"
                    >
                      View Front
                    </a>{" "}
                    /{" "}
                    <a
                      className="underline hover:text-primary smooth-transform"
                      href="https://ik.imagekit.io/ducdev/default-image.jpg?updatedAt=1711243098701"
                      target="_blank"
                      rel="noreferrer"
                    >
                      View Back
                    </a>
                  </div>
                </>
              ))}
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
              {[1, 2].map((item) => (
                <SubjectItem
                  key={item}
                  handleClickEdit={handleEditStudent}
                  roleKey={roleKey}
                  userId={userId}
                  dataProfileDetail={dataProfileDetail}
                />
              ))}
              {roleKey === ROLE_NAME.TUTOR &&
                String(userId) === String(dataProfileDetail?.id) && (
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
        String(userId) === String(dataProfileDetail?.id) && (
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
          <PrimaryBtn
            className="md:max-w-[222px]"
            onClick={() => {
              navigate(`/classroom-requests/create?type=create`);
            }}
          >
            Send Request
          </PrimaryBtn>
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
      <PopupTemplate
        setShowDialog={setIsShowPopupEditStudent}
        showDialog={isShowPopupEditStudent}
        title="Edit subject"
        classNameWrapper="md:!min-w-[486px]"
      >
        <EditSubjectPopup />
      </PopupTemplate>
    </div>
  );
}

export default TutorProfileDetail;

function SubjectItem({ handleClickEdit, roleKey, userId, dataProfileDetail }) {
  return (
    <div className="flex items-center justify-between gap-3 px-3 py-2 border-b border-b-gray">
      <div>
        <div>Toán</div>
        <div>Class Level: 12</div>
      </div>
      {roleKey === ROLE_NAME.TUTOR &&
        String(userId) === String(dataProfileDetail?.id) && (
          <PrimaryBtn
            className="!w-fit !py-1"
            onClick={() => {
              handleClickEdit();
            }}
          >
            Edit
          </PrimaryBtn>
        )}
    </div>
  );
}
