import React, { useState } from "react";
import FilterDropDown from "src/components/common/FilterDropDown";
import PrimaryBtn from "src/components/common/PrimaryBtn";
import { LIST_CLASS_LEVEL_DEFAULT } from "src/constants/constants";

function AddSubjectPopup() {
  const [subjectSelected, setSubjectSelected] = useState();

  return (
    <div>
      <FilterDropDown
        title="Subject name"
        listDropdown={[
          { id: 1, value: "Math", name: "Math" },
          { id: 2, value: "Physics", name: "Physics" },
        ]}
        showing={subjectSelected}
        setShowing={setSubjectSelected}
      />
      <FilterDropDown
        className="mt-4"
        title="Class level"
        listDropdown={LIST_CLASS_LEVEL_DEFAULT}
        showing={subjectSelected}
        setShowing={setSubjectSelected}
        classNameDropdown="!max-h-[140px]"
      />
      <div className="flex justify-center mt-5">
        <PrimaryBtn className="max-w-[160px]">Add</PrimaryBtn>
      </div>
    </div>
  );
}

export default AddSubjectPopup;
