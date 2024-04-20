import React from "react";
import CameraIcon from "../icons/CameraIcon";
import Loading from "./Loading";

function UploadImage({
  imageUrlResponse,
  className = "input-img",
  loadingImage = false,
  onChange = null,
  classNameImage = "",
}) {
  return (
    <label
      // htmlFor="input-file"
      className={`cursor-pointer ${className}`}
    >
      <input onChange={onChange} type="file" accept="image/*" />
      {loadingImage ? (
        <div className="w-full min-h-[176px] flex items-center justify-center">
          <Loading />
        </div>
      ) : imageUrlResponse ? (
        <div className="flex flex-col items-center justify-center w-max">
          <img
            src={
              typeof imageUrlResponse === "string"
                ? imageUrlResponse
                : URL.createObjectURL(imageUrlResponse)
            }
            alt={"avatar"}
            className={`rounded w-full h-full object-cover ${classNameImage}`}
          />
        </div>
      ) : (
        <AddImageBtn />
      )}
    </label>
  );
}

export default UploadImage;

function AddImageBtn() {
  return (
    <div className="w-[200px] h-[200px] border border-dashed border-blue rounded flex flex-col items-center justify-center">
      <CameraIcon />
      <div className="px-4 py-3 font-medium border rounded text-primary border-primary">
        Upload image
      </div>
    </div>
  );
}
