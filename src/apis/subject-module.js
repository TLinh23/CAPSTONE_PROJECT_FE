import { subjectUrl } from "src/constants/APIConfig";
import { convertObjectToQueryString, requestAPI } from "src/libs/api";

export const getListSubjects = (paramsObj) => {
  const queryString = convertObjectToQueryString(paramsObj);
  return requestAPI({
    url: `${subjectUrl}${queryString}`,
  });
};
