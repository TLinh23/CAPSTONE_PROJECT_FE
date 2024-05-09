import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { deleteSubjectTutor } from "src/apis/tutor-module";
import DeniedBtn from "src/components/common/DeniedBtn";
import { useAuthContext } from "src/context/AuthContext";
import { combineStrings } from "src/libs";

function DeleteSubjectPopup({ item, setIsShowPopupDeleteStudent }) {
  const { userId } = useAuthContext();
  const queryClient = useQueryClient();

  const deleteSubjectMutation = useMutation(
    async (newData) => {
      return await deleteSubjectTutor(userId, item?.subjectId, newData);
    },
    {
      onSuccess: (data) => {
        console.log("Data: ", data);
        if (data?.status >= 200 && data?.status < 300) {
          toast.success("Add subject successfully");
          setIsShowPopupDeleteStudent(false);
          queryClient.invalidateQueries("getProfile");
        } else {
          toast.error(
            // @ts-ignore
            combineStrings(data?.response?.data?.errors) ||
              // @ts-ignore
              combineStrings(data?.response?.data?.message) ||
              // @ts-ignore
              combineStrings(data?.message) ||
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
  const handleClickDeleteSubject = () => {
    const queryObj = {
      tutorId: Number(userId),
      subjectId: item?.subjectId,
      level: item?.level,
    };
    // @ts-ignore
    deleteSubjectMutation.mutate(queryObj);
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
