import cookie from "cookie";
import { refreshAccessTokenUrl } from "../constants/APIConfig";
import { processDataLogin } from "./processDataLogin";
import { browserRedirectToIndexAfterSignOut } from "./redirect";
import axios from "axios";

// optionaly add base url for axios
const client = axios.create({
  url: process.env.REACT_APP_BASE_URL,
  headers: {
    "x-api-key": process.env.REACT_APP_BASE_URL,
  },
});

/**
 * Convert a flat object to a query string
 * @param parameters A flat object
 * @param prefix Defaults to '?'
 */
export const convertObjectToQueryString = (parameters, prefix = "?") => {
  const query = Object.keys(parameters)
    .map((key) => {
      let value = parameters[key];

      if (typeof value === "boolean") value = value ? 1 : 0;

      return encodeURIComponent(key) + "=" + encodeURIComponent(value);
    })
    .join("&");

  return prefix + query;
};

export const refreshAccessToken = async () => {
  const cookies = cookie.parse(window?.document.cookie);

  const onSuccess = (response) => {
    const data = response?.data;
    processDataLogin(data);
  };

  const onError = (error) => {
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key !== "TEST_KEY") {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((key) => {
      localStorage.removeItem(key);
    });
    window.document.cookie = cookie.serialize("accessToken", "", {
      maxAge: -1, // Expire the accessToken immediately.
      path: "/",
    });
    window.document.cookie = cookie.serialize("refreshToken", "", {
      maxAge: -1, // Expire the refreshToken immediately.
      path: "/",
    });
    browserRedirectToIndexAfterSignOut();

    // optionaly catch errors and add some additional logging here
    return error;
  };

  const payload = {
    refreshToken: cookies.refreshToken,
  };

  if (cookies.refreshToken && !cookies.accessToken) {
    try {
      const response = await client({
        method: "post",
        url: refreshAccessTokenUrl,
        data: payload,
      });
      onSuccess(response);
    } catch (error) {
      onError(error);
    }
  }
};

export const requestAPI = async ({ ...options }) => {
  await refreshAccessToken();
  const cookies = cookie.parse(window?.document.cookie);
  const acceptLanguage = localStorage.getItem("i18nextLng");

  if (cookies.accessToken) {
    client.defaults.headers.common.Authorization = `Bearer ${
      cookies?.accessToken || ""
    }`;
  }

  if (acceptLanguage) {
    client.defaults.headers.common["Accept-Language"] = acceptLanguage;
  }

  const onSuccess = (response) => response;
  const onError = async (error) => {
    // optionaly catch errors and add some additional logging here
    if (error?.response?.status === 401) {
      window.document.cookie = cookie.serialize("accessToken", "", {
        maxAge: -1, // Expire the accessToken immediately.
        path: "/",
      });
      await refreshAccessToken();
    }
    // if (error?.response?.status === 404) {
    //   window.location.href = "/404";
    // }
    return error;
  };
  return client(options).then(onSuccess).catch(onError);
};

export const postAPI = async ({ ...options }) => {
  await refreshAccessToken();
  const cookies = cookie.parse(window?.document.cookie);
  if (cookies.accessToken) {
    client.defaults.headers.common.Authorization = `Bearer ${
      cookies?.accessToken || ""
    }`;
  }
  const acceptLanguagePost = localStorage.getItem("i18nextLng");
  if (acceptLanguagePost) {
    client.defaults.headers.common["Accept-Language"] = acceptLanguagePost;
  }

  const onSuccess = (response) => response;
  const onErrorPost = async (error) => {
    // optionaly catch errors and add some additional logging here
    if (error?.response?.status === 401) {
      window.document.cookie = cookie.serialize("accessToken", "", {
        maxAge: -1, // Expire the accessToken immediately.
        path: "/",
      });
      await refreshAccessToken();
    }
    return error;
  };

  return client({ method: "post", ...options })
    .then(onSuccess)
    .catch(onErrorPost);
};

export const patchAPI = async ({ ...options }) => {
  await refreshAccessToken();
  const cookies = cookie.parse(window?.document.cookie);
  if (cookies.accessToken) {
    client.defaults.headers.common.Authorization = `Bearer ${
      cookies?.accessToken || ""
    }`;
  }
  const acceptLanguagePath = localStorage.getItem("i18nextLng");
  if (acceptLanguagePath) {
    client.defaults.headers.common["Accept-Language"] = acceptLanguagePath;
  }

  const onSuccessPath = (response) => response;
  const onErrorPath = (error) => {
    // optionaly catch errors and add some additional logging here
    return error;
  };

  return client({ method: "patch", ...options })
    .then(onSuccessPath)
    .catch(onErrorPath);
};

export const putAPI = async ({ ...options }) => {
  await refreshAccessToken();
  const cookies = cookie.parse(window?.document.cookie);
  if (cookies.accessToken) {
    client.defaults.headers.common.Authorization = `Bearer ${
      cookies?.accessToken || ""
    }`;
  }
  const acceptLanguagePath = localStorage.getItem("i18nextLng");
  if (acceptLanguagePath) {
    client.defaults.headers.common["Accept-Language"] = acceptLanguagePath;
  }

  const onSuccessPath = (response) => response;
  const onErrorPath = (error) => {
    // optionaly catch errors and add some additional logging here
    return error;
  };

  return client({ method: "put", ...options })
    .then(onSuccessPath)
    .catch(onErrorPath);
};

export const deleteAPI = async ({ ...options }) => {
  await refreshAccessToken();
  const cookies = cookie.parse(window?.document.cookie);
  if (cookies.accessToken) {
    client.defaults.headers.common.Authorization = `Bearer ${
      cookies?.accessToken || ""
    }`;
  }
  const acceptLanguageDelete = localStorage.getItem("i18nextLng");
  if (acceptLanguageDelete) {
    client.defaults.headers.common["Accept-Language"] = acceptLanguageDelete;
  }

  const onSuccessDelete = (response) => response;
  const onErrorDelete = (error) => {
    // optionaly catch errors and add some additional logging here
    return error;
  };

  return client({ method: "delete", ...options })
    .then(onSuccessDelete)
    .catch(onErrorDelete);
};
