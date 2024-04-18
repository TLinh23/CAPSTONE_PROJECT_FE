import {
  addSubjectTutorUrl,
  changePasswordUrl,
  countryUrl,
  deleteSubjectTutorUrl,
  editProfileUrl,
  employeeDummyUrl,
  exploreTutorUrl,
  profileUrl,
  todoListUrl,
  todoWithPagination,
} from "../constants/APIConfig";
import {
  convertObjectToQueryString,
  deleteAPI,
  patchAPI,
  postAPI,
  putAPI,
  requestAPI,
} from "../libs/api";

export const getListCountry = () => {
  return requestAPI({
    url: `${countryUrl}`,
  });
};

export const getListTodo = () => {
  return requestAPI({
    url: `${todoListUrl}`,
  });
};

export const getTodoListDetail = (id) => {
  return requestAPI({
    url: `${todoListUrl}/${id}`,
  });
};

export const updateTodoDetail = (newData, id) => {
  return patchAPI({
    url: `${todoListUrl}/${id}`,
    data: newData,
  });
};

export const getListEmployee = () => {
  return requestAPI({
    url: `${employeeDummyUrl}`,
  });
};

export const getEmployeeDetail = (id) => {
  return requestAPI({
    url: `${employeeDummyUrl}/${id}`,
  });
};

export const updateEmployeeDetail = (newData, id) => {
  return putAPI({
    url: `${employeeDummyUrl}/${id}`,
    data: newData,
  });
};

// Get list with filter key value of be

export const getListTodoWithObj = (paramsObj) => {
  const queryString = convertObjectToQueryString(paramsObj);
  return requestAPI({
    url: `${todoWithPagination}${queryString}`,
  });
};

export const getProfileDetail = () => {
  return requestAPI({
    url: `${profileUrl}`,
  });
};

export const getProfileByIdDetail = (id) => {
  return requestAPI({
    url: `${profileUrl}/${id}`,
  });
};

export const addSubjectTutor = (newData, id) => {
  return postAPI({
    url: `${addSubjectTutorUrl}`,
    data: newData,
  });
};

export const deleteSubjectTutor = (tutorId, subjectId, queryObj) => {
  return deleteAPI({
    url: `${deleteSubjectTutorUrl}/${tutorId}/${subjectId}?level=${queryObj?.level}`,
    data: queryObj,
  });
};

export const getExploreTutors = (paramsObj) => {
  const queryString = convertObjectToQueryString(paramsObj);
  return requestAPI({
    url: `${exploreTutorUrl}${queryString}`,
  });
};

export const editProfileDetail = (newData) => {
  return putAPI({
    url: `${editProfileUrl}`,
    data: newData,
  });
};

export const changePasswordAccount = (newData) => {
  return putAPI({
    url: `${changePasswordUrl}`,
    data: newData,
  });
};
