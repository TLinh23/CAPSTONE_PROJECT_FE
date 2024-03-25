import { format } from "date-fns";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FilterDropDown from "src/components/common/FilterDropDown";
import PopupTemplate from "src/components/common/PopupTemplate";
import PrimaryBtn from "src/components/common/PrimaryBtn";
import PrimaryInput from "src/components/common/PrimaryInput";
import SmallTitle from "src/components/common/SmallTitle";
import Title from "src/components/common/Title";
import AddStudentPopup from "./AddStudentPopup";
import EditStudentPopup from "./EditStudentPopup";

function ParentProfileDetail() {
  const [staffAccountObject, setStaffAccountObject] = useState(null);
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
      <Title>Personal information</Title>
      <div className="grid grid-cols-1 gap-4 mt-5 md:grid-cols-155530">
        <div className="flex flex-col h-full">
          <div>
            <div className="mb-5 text-xl font-semibold text-center">Avatar</div>
            <div className="flex items-center justify-center border rounded border-primary w-[200px] h-[200px]">
              <img
                className="object-cover w-full h-full rounded"
                src="https://vcdn-thethao.vnecdn.net/2023/09/03/ronaldo-850-jpeg-1693687478-1789-1693688039.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="mt-5">Role: Staff</div>
          <div className="mt-3">Email: ducucucucu@gmail.com</div>
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
              staffAccountObject?.userName ? staffAccountObject?.userName : ""
            }
            readOnly
          />
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
            <div className="mb-2 text-sm font-bold text-gray">
              Date of birth
            </div>
            <input
              max={new Date().toISOString().slice(0, 10)}
              value={
                staffAccountObject?.birthDate
                  ? format(
                      new Date(staffAccountObject?.birthDate),
                      "yyyy-MM-dd"
                    )
                  : ""
              }
              onChange={(e) => {
                const selectedDate = e.target.value;
                const currentDate = new Date().toISOString().slice(0, 10);
                if (selectedDate > currentDate) {
                  setStaffAccountObject({
                    ...staffAccountObject,
                    birthDate: currentDate,
                  });
                } else {
                  setStaffAccountObject({
                    ...staffAccountObject,
                    birthDate: selectedDate,
                  });
                }
              }}
              type="date"
              disabled
              className="w-full h-[46px] px-4 py-3 border rounded-md outline-none border-gray focus:border-primary hover:border-primary smooth-transform"
            />
          </div>
          <PrimaryInput
            title="Phone number"
            placeholder="Enter phone number"
            type="number"
            value={staffAccountObject?.phone ? staffAccountObject?.phone : ""}
            readOnly
          />
          <PrimaryInput
            title="Address detail"
            rows={4}
            placeholder="Enter address detail"
            value={
              staffAccountObject?.address ? staffAccountObject?.address : ""
            }
            readOnly
          />
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
              <StudentItem handleClickEdit={handleEditStudent} />
              <StudentItem handleClickEdit={handleEditStudent} />
              <div
                className="p-2 text-center cursor-pointer smooth-transform hover:underline"
                onClick={handleClickAddMoreStudent}
              >
                Add more
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <PrimaryBtn
          className="md:max-w-[222px]"
          onClick={() => {
            navigate("/parent/profile/edit");
          }}
        >
          Update
        </PrimaryBtn>
      </div>
      <PopupTemplate
        setShowDialog={setIsShowPopupAddStudent}
        showDialog={isShowPopupAddStudent}
        title="Add student"
      >
        <AddStudentPopup />
      </PopupTemplate>
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

export default ParentProfileDetail;

function StudentItem({ handleClickEdit }) {
  return (
    <div className="flex items-center justify-between gap-3 px-3 py-2 border-b border-b-gray">
      <div>
        <div>Huy</div>
        <div>091634237472</div>
      </div>
      <PrimaryBtn
        className="!w-fit !py-1"
        onClick={() => {
          handleClickEdit();
        }}
      >
        Edit
      </PrimaryBtn>
    </div>
  );
}
