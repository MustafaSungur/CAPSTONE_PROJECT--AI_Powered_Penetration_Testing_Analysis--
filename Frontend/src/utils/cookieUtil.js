// cookieUtil.js
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const setTokenInCookie = (token) => {
  cookies.set("token", token, { path: "/" });
};

export const getTokenFromCookie = () => {
  return cookies.get("token");
};
