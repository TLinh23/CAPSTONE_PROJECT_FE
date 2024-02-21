import { countryUrl } from "../constants/APIConfig";
import { requestAPI } from "../libs/api";

export const getListCountry = () => {
  return requestAPI({
    url: `${countryUrl}`,
  });
};
