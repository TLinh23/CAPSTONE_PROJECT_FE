import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { uploadImage } from "src/apis/upload-image-module";

const TOAST_UPLOAD_CUSTOM_ID = "toast-upload-custom-id";

function useUploadImage() {
  const [imageUpload, setImageUpload] = useState();
  const [imageUrlResponse, setImageUrlResponse] = useState("");

  const handleUploadImage = (event) => {
    const target = event.target || event.srcElement;
    if (target.value.length === 0) {
      console.log("Cancel was hit, no file selected!");
    } else {
      setImageUpload(target.files[0]);
    }
  };

  useEffect(() => {
    if (imageUpload) {
      const formData = new FormData();
      formData.append("image", imageUpload);
      // @ts-ignore
      uploadImageMutation.mutate(formData);
    }
  }, [imageUpload]);

  const uploadImageMutation = useMutation(
    async (imageUpload) => {
      return await uploadImage(imageUpload);
    },
    {
      onSuccess: (data) => {
        if (data?.status >= 200 && data?.status < 300) {
          setImageUrlResponse(data?.data);
          toast.success("Upload image successfully");
        } else {
          console.log("Error: ", data);
          toast.error(data?.response?.data || "Upload image error");
        }
      },
      onError: (err) => {
        // @ts-ignore
        toast.error(err?.response?.data?.message || err?.message);
      },
    }
  );

  useEffect(() => {
    if (uploadImageMutation.isLoading) {
      toast.loading("Loading...", {
        toastId: TOAST_UPLOAD_CUSTOM_ID,
      });
    } else {
      toast.dismiss(TOAST_UPLOAD_CUSTOM_ID);
    }
  }, [uploadImageMutation.isLoading]);

  return { imageUrlResponse, handleUploadImage, imageUpload };
}

export default useUploadImage;
