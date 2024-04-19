import {
  createPaymentUrl,
  getPaymentDetailUrl,
  searchFilterPaymentsUrl,
  updatePaymentUrl,
} from "src/constants/APIConfig";
import {
  convertObjectToQueryString,
  postAPI,
  putAPI,
  putJsonAPI,
  requestAPI,
} from "src/libs/api";

export const getListTransactions = (paramsObj) => {
  const queryString = convertObjectToQueryString(paramsObj);
  return requestAPI({
    url: `${searchFilterPaymentsUrl}${queryString}`,
  });
};

export const getTransactionDetail = (id) => {
  return requestAPI({
    url: `${getPaymentDetailUrl}/${id}`,
  });
};

export const updateTransactionDetail = (id, newData) => {
  return putJsonAPI({
    url: `${updatePaymentUrl}/${id}`,
    data: newData,
  });
};

export const createNewTransaction = (newData) => {
  return postAPI({
    url: `${createPaymentUrl}`,
    data: newData,
  });
};
