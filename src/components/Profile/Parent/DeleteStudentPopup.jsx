import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { deleteStudentDetail } from "src/apis/student-module";
import DeniedBtn from "src/components/common/DeniedBtn";
import SecondaryBtn from "src/components/common/SecondaryBtn";

function DeleteStudentPopup(props) {
  const { item, setShowPopup } = props;
  const queryClient = useQueryClient();

  const deleteStudentMutation = useMutation(
    async () => {
      return await deleteStudentDetail(item?.studentId);
    },
    {
      onSuccess: (data) => {
        console.log("Data: ", data);
        if (data?.status >= 200 && data?.status < 300) {
          toast.success("Delete student successfully");
          queryClient.invalidateQueries("getProfile");
          setShowPopup(false);
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
          err?.response?.data?.message || err?.message || "Delete error"
        );
      },
    }
  );

  const handleClickDeleteStudent = () => {
    // @ts-ignore
    deleteStudentMutation.mutate();
  };

  return (
    <div>
      <div>Do you want to delete this student {item?.fullName}</div>
      <div className="flex items-center justify-center gap-5 mt-5">
        <DeniedBtn
          className="!text-white !bg-dangerous hover:!bg-denied"
          onClick={handleClickDeleteStudent}
        >
          Delete
        </DeniedBtn>
        <SecondaryBtn
          onClick={() => {
            setShowPopup(false);
          }}
        >
          Cancel
        </SecondaryBtn>
      </div>
    </div>
  );
}

export default DeleteStudentPopup;
