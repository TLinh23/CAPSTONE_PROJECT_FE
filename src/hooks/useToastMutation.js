import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useCreateMutation = (
  createFunction,
  routerLink = "",
  toastSuccess = "",
  functionAfterSuccess = undefined,
  functionAfterError = undefined
) => {
  const navigate = useNavigate();
  const createMutation = useMutation(
    async (newData) => {
      return await createFunction(newData);
    },
    {
      onSuccess: (data) => {
        if (data?.status >= 200 && data?.status < 300) {
          toast.success(toastSuccess);
          if (routerLink) {
            navigate(routerLink);
          }
          if (functionAfterSuccess) {
            functionAfterSuccess();
          }
        } else {
          console.log("Create error: ", data, data?.response?.data?.message);
          const errorMessages = data?.response?.data?.errors?.map(
            (error) => error?.msg
          );
          if (errorMessages) {
            toast.error(
              errorMessages.join("\n") ||
                data?.message ||
                "Opps! Something went wrong..."
            );
          } else {
            toast.error(
              `Create error: ${
                data?.response?.data?.message || data?.response?.data
              }`
            );
          }
          if (functionAfterError) {
            functionAfterError();
          }
        }
      },
      onError: (error) => {
        console.log("Create Error", error);
        toast.error(
          // @ts-ignore
          error?.response?.message || error?.message || "Create error"
        );
        if (functionAfterError) {
          functionAfterError();
        }
      },
    }
  );

  return { createMutation };
};

export const useUpdateMutation = (
  id,
  updateDetail,
  queryKey = "",
  toastSuccess = "",
  functionAfterSuccess = undefined
) => {
  const updateQueryClient = useQueryClient();
  const updateMutation = useMutation(
    async (newTicketType) => {
      return await updateDetail(newTicketType, id);
    },
    {
      onSuccess: (data) => {
        console.log("Data: ", data);
        if (data?.status >= 200 && data?.status < 300) {
          toast.success(toastSuccess);
          updateQueryClient.invalidateQueries(queryKey);
          if (functionAfterSuccess) {
            functionAfterSuccess();
          }
        } else {
          const updateErrorMessages = data?.response?.data?.errors?.map(
            (error) => error?.msg
          );
          if (updateErrorMessages) {
            toast.error(
              updateErrorMessages.join("\n") ||
                data?.message ||
                "Opps! Something went wrong..."
            );
          } else {
            toast.error(
              `Update error: ${
                data?.response?.data?.message || data?.response?.data
              }`
            );
          }
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

  return { updateMutation };
};
