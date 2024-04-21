import {
  deleteSTaffUrl,
  getAccountsUrl,
  getAllStaffUrl,
  registerStaffUrl,
  suspendAccountUrl,
} from "src/constants/APIConfig";
import {
  convertObjectToQueryString,
  deleteAPI,
  postAPI,
  putAPI,
  requestAPI,
} from "src/libs/api";

export const getAllStaffs = (paramsObj) => {
  const queryString = convertObjectToQueryString(paramsObj);
  return requestAPI({
    url: `${getAllStaffUrl}${queryString}`,
  });
};

export const registerNewStaff = (newData) => {
  return postAPI({
    url: `${registerStaffUrl}`,
    data: newData,
  });
};

export const getAllAccountsForStaff = (paramsObj) => {
  const queryString = convertObjectToQueryString(paramsObj);
  return requestAPI({
    url: `${getAccountsUrl}${queryString}`,
  });
};

export const deleteStaffDetail = (id) => {
  return deleteAPI({
    url: `${deleteSTaffUrl}/${id}`,
  });
};

export const staffChangeAccountStatus = (id) => {
  return putAPI({
    url: `${suspendAccountUrl}/${id}`,
  });
};
