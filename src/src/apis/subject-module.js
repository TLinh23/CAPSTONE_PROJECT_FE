import {
  createSubjectUrl,
  deleteSubjectUrl,
  subjectUrl,
  updateSubjectUrl,
} from "src/constants/APIConfig";
import {
  convertObjectToQueryString,
  deleteAPI,
  postAPI,
  putAPI,
  requestAPI,
} from "src/libs/api";

export const getListSubjects = (paramsObj) => {
  const queryString = convertObjectToQueryString(paramsObj);
  return requestAPI({
    url: `${subjectUrl}${queryString}`,
  });
};

export const updateSubjectDetail = (paramsObj) => {
  return putAPI({
    url: `${updateSubjectUrl}`,
    data: paramsObj,
  });
};

export const deleteSubjectDetail = (id) => {
  return deleteAPI({
    url: `${deleteSubjectUrl}/${id}?id=${id}`,
  });
};

export const createNewSubject = (paramsObj) => {
  return postAPI({
    url: `${createSubjectUrl}`,
    data: paramsObj,
  });
};
