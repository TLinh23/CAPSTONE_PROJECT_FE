import { uploadImageUrl } from "src/constants/APIConfig";
import { postAPI } from "src/libs/api";

export const uploadImage = (newImage) => {
  return postAPI({
    url: `${uploadImageUrl}`,
    data: newImage,
  });
};
