import { addStudentUrl, deleteStudentInParentUrl, updateStudentUrl } from "src/constants/APIConfig";
import { deleteAPI, postAPI, putAPI } from "src/libs/api";


export const createClassDetail = (queryObj) => {
    return postAPI({
      url: `${addStudentUrl}`,
      data: queryObj,
    });
  };
  
  export const editClassDetail = (queryObj) => {
    return putAPI({
      url: `${updateStudentUrl}`,
      data: queryObj,
    });
  };
  
  export const deleteSubjectDetail = (id) => {
    return deleteAPI({
      url: `${deleteStudentInParentUrl}/${id}?id=${id}`,
    });
  };