import React from "react";
import DeniedBtn from "src/components/common/DeniedBtn";
import SecondaryBtn from "src/components/common/SecondaryBtn";

function DeleteStudentPopup(props) {
  const { item } = props;
  const handleClickDeleteStudent = () => {
    console.log("Handle delete");
  };

  return (
    <div>
      <div>Do you want to delete this student {item?.fullName}</div>
      <div className="flex items-center justify-center gap-5 mt-5">
        <DeniedBtn
          className="!text-white bg-denied hover:bg-dangerous"
          onClick={handleClickDeleteStudent}
        >
          Delete
        </DeniedBtn>
        <SecondaryBtn>Cancel</SecondaryBtn>
      </div>
    </div>
  );
}

export default DeleteStudentPopup;
