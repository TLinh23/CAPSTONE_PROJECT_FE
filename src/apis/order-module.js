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

export const acceptRequestForTutor = (requestId) => {
  return putAPI({
    url: `${acceptRequestUrl}?requestId=${requestId}`,
  });
};

export const declineRequestForTutor = (requestId) => {
  return putAPI({
    url: `${declineRequestUrl}?requestId=${requestId}`,
  });
};

export const cancelRequestForParent = (requestId) => {
  return putAPI({
    url: `${cancelRequestUrl}?requestId=${requestId}`,
  });
};
