import {
  acceptRequestUrl,
  cancelRequestUrl,
  createOrderRequestUrl,
  declineRequestUrl,
} from "src/constants/APIConfig";
import { postAPI, putAPI } from "src/libs/api";

export const createOrderRequest = (queryObj) => {
  return postAPI({
    url: `${createOrderRequestUrl}`,
    data: queryObj,
  });
};

export const acceptRequestForTutor = (queryObj) => {
  return putAPI({
    url: `${acceptRequestUrl}`,
    data: queryObj,
  });
};

export const declineRequestForTutor = (queryObj) => {
  return putAPI({
    url: `${declineRequestUrl}`,
    data: queryObj,
  });
};

export const cancelRequestForParent = (queryObj) => {
  return putAPI({
    url: `${cancelRequestUrl}`,
    data: queryObj,
  });
};
