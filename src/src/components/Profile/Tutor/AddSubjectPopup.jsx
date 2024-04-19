import React, { useState } from "react";
import { useMutation, useQueries, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { getListSubjects } from "src/apis/subject-module";
import { addSubjectTutor } from "src/apis/tutor-module";
import FilterDropDown from "src/components/common/FilterDropDown";
import PrimaryBtn from "src/components/common/PrimaryBtn";
import { LIST_CLASS_LEVEL_DEFAULT } from "src/constants/constants";
import { useAuthContext } from "src/context/AuthContext";

function AddSubjectPopup({ setIsShowPopupAddStudent }) {
  const [subjectSelected, setSubjectSelected] = useState(undefined);
  const [listAllSubjects, setListAllSubjects] = useState(undefined);
  const [classLevelSelected, setClassLevelSelected] = useState(undefined);
  const queryClient = useQueryClient();
  const { userId } = useAuthContext();

  useQueries([
    {
      queryKey: ["getListSubjects"],
      queryFn: async () => {
        const queryObj = {};
        queryObj["PagingRequest.CurrentPage"] = 1;
        queryObj["PagingRequest.PageSize"] = 99;
        queryObj["Status"] = "CREATED";

        const response = await getListSubjects(queryObj);
        setListAllSubjects(response?.data?.data);
        return response?.data;
      },
    },
  ]);

  const createMutation = useMutation(
    async (newData) => {
      console.log("newData: ", newData);
      return await addSubjectTutor(newData);
    },
    {
      onSuccess: (data) => {
        console.log("Data: ", data);
        if (data?.status >= 200 && data?.status < 300) {
          toast.success("Add subject successfully");
          setIsShowPopupAddStudent(false);
          queryClient.invalidateQueries("getProfile");
        } else {
          toast.error(
            data?.message ||
              data?.response?.data?.message ||
              data?.response?.data ||
              "Oops! Something went wrong..."
          );
        }
      },
      onError: (err) => {
        toast.error(
          // @ts-ignore
          err?.response?.data?.message || err?.message || "Update error"
        );
      },
    }
  );

  const handleClickAddSubject = async () => {
    if (!subjectSelected) {
      toast.error("Please select subject");
    }
    if (!classLevelSelected) {
      toast.error("Please select level");
    }
    const submitObject = {
      subjectId: subjectSelected?.subjectId,
      level: Number(classLevelSelected?.value),
      tutorId: Number(userId),
      status: "CREATED",
    };

    // @ts-ignore
    createMutation.mutate(submitObject);
  };

  return (
    <div>
      <FilterDropDown
        title="Subject name"
        listDropdown={listAllSubjects?.items || []}
        showing={subjectSelected}
        setShowing={setSubjectSelected}
        textDefault="Select subject"
        required="*"
      />
      <FilterDropDown
        className="mt-4"
        title="Class level"
        listDropdown={LIST_CLASS_LEVEL_DEFAULT}
        showing={classLevelSelected}
        setShowing={setClassLevelSelected}
        classNameDropdown="!max-h-[140px]"
        textDefault="Select level"
        required="*"
      />
      <div className="flex justify-center mt-5">
        <PrimaryBtn onClick={handleClickAddSubject} className="max-w-[160px]">
          Add
        </PrimaryBtn>
      </div>
    </div>
  );
}

export default AddSubjectPopup;
