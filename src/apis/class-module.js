import {
  addStudentIntoClassUrl,
  createClassStudentUrl,
  deleteStudentUrl,
  getClassDetailUrl,
  getClassUrl,
  getStudentsClassUrl,
  getTutorClassUrl,
  scheduleUrl,
  updateClassStudentUrl,
} from "src/constants/APIConfig";
import {
  convertObjectToQueryString,
  postAPI,
  putAPI,
  requestAPI,
} from "src/libs/api";

export const getListClass = (paramsObj) => {
  const queryString = convertObjectToQueryString(paramsObj);
  return requestAPI({
    url: `${getClassUrl}${queryString}`,
  });
};

export const getClassByTutor = (paramsObj) => {
  const queryString = convertObjectToQueryString(paramsObj);
  return requestAPI({
    url: `${getTutorClassUrl}${queryString}`,
  });
};

export const getClassDetailData = (id) => {
  return requestAPI({
    url: `${getClassDetailUrl}/${id}`,
  });
};

export const getListStudentInClass = (paramsObj) => {
  const queryString = convertObjectToQueryString(paramsObj);
  return requestAPI({
    url: `${getStudentsClassUrl}${queryString}`,
  });
};

export const addStudentIntoClass = (queryObj) => {
  return postAPI({
    url: `${addStudentIntoClassUrl}`,
    data: queryObj,
  });
};

export const deleteStudentOutOfClass = (queryObj) => {
  return postAPI({
    url: `${deleteStudentUrl}`,
    data: queryObj,
  });
};

export const createClassDetail = (queryObj) => {
  return postAPI({
    url: `${createClassStudentUrl}`,
    data: queryObj,
  });
};

export const editClassDetail = (queryObj) => {
  return putAPI({
    url: `${updateClassStudentUrl}`,
    data: queryObj,
  });
};

export const getScheduleByClass = (paramsObj) => {
  const queryString = convertObjectToQueryString(paramsObj);
  return requestAPI({
    url: `${scheduleUrl}${queryString}`,
  });
};
