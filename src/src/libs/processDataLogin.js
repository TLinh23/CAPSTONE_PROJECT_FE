import cookie from "cookie";

export function processDataLogin(data) {
  window.document.cookie = cookie.serialize("accessToken", data.access_token, {
    maxAge: data.expires_in,
    path: "/",
  });
  window.document.cookie = cookie.serialize(
    "refreshToken",
    data.refresh_token,
    {
      maxAge: data.refresh_expires_in,
      path: "/",
    }
  );
}
