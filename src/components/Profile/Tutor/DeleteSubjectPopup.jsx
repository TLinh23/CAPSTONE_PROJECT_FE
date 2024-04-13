import React from "react";
import DeniedBtn from "src/components/common/DeniedBtn";

function DeleteSubjectPopup({ item }) {
  const handleClickDeleteSubject = () => {
    console.log("Llalal");
  };
  return (
    <div>
      <div>Do you want to delete this subject</div>
      <div className="mt-5">
        {item?.subjectName} - Level: {item?.level}
      </div>
      <div className="flex items-center justify-center mt-5">
        <DeniedBtn onClick={handleClickDeleteSubject} className="max-w-[160px]">
          Delete
        </DeniedBtn>
      </div>
    </div>
  );
}

export default DeleteSubjectPopup;
