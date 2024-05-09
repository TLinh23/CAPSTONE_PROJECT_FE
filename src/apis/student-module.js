import {
  addStudentUrl,
  deleteStudentInParentUrl,
  updateStudentUrl,
} from "src/constants/APIConfig";
import { postAPI, putAPI } from "src/libs/api";

export const createStudentInParentDetail = (queryObj) => {
  return postAPI({
    url: `${addStudentUrl}`,
    data: queryObj,
  });
};

export const editStudentDetailInParent = (queryObj) => {
  return putAPI({
    url: `${updateStudentUrl}`,
    data: queryObj,
  });
};

export const deleteStudentDetail = (id) => {
  return putAPI({
    url: `${deleteStudentInParentUrl}/${id}?id=${id}`,
  });
};
