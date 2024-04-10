import { getClassUrl, getTutorClassUrl } from "src/constants/APIConfig";
import { convertObjectToQueryString, requestAPI } from "src/libs/api";

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
