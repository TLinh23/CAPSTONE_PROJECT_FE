import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { uploadImage } from "src/apis/upload-image-module";

const TOAST_UPLOAD_CUSTOM_ID = "toast-upload-custom-id";

function useUploadImage() {
  const [imageUpload, setImageUpload] = useState();

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
    }
  }, [imageUpload]);

  return { handleUploadImage, imageUpload };
}

export default useUploadImage;
