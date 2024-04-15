import {
  getAccountsUrl,
  getAllStaffUrl,
  registerStaffUrl,
} from "src/constants/APIConfig";
import { convertObjectToQueryString, postAPI, requestAPI } from "src/libs/api";

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
