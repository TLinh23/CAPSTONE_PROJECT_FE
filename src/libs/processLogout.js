import cookie from "cookie";

export function processLogout() {
  window.document.cookie = cookie.serialize("accessToken", "", {
    maxAge: -1, // Expire the cookie immediately.
    path: "/",
  });
}
