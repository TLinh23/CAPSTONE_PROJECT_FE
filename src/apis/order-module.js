import { orderRequestUrl } from "src/constants/APIConfig";
import { postAPI } from "src/libs/api";

export const createOrderRequest = (queryObj) => {
  return postAPI({
    url: `${orderRequestUrl}`,
    data: queryObj,
  });
};
