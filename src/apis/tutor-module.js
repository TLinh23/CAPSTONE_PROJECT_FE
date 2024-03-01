import {
  countryUrl,
  employeeDummyUrl,
  todoListUrl,
  todoWithPagination,
} from "../constants/APIConfig";
import {
  convertObjectToQueryString,
  patchAPI,
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
