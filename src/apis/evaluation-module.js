import {
  getAllEvaluationUrl,
  parentEvaluationUrl,
} from "src/constants/APIConfig";
import { convertObjectToQueryString, requestAPI } from "src/libs/api";

export const getAllEvaluation = (paramsObj) => {
  const queryString = convertObjectToQueryString(paramsObj);
  return requestAPI({
    url: `${getAllEvaluationUrl}${queryString}`,
  });
};

export const getParentEvaluation = (paramsObj) => {
  const queryString = convertObjectToQueryString(paramsObj);
  return requestAPI({
    url: `${parentEvaluationUrl}${queryString}`,
  });
};
