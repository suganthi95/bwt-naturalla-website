import cookie from "js-cookie";

export const setCookie = (name: any, value: any, options = {}) => {
  cookie.set(name, value, { ...options, sameSite: "Strict" });
};

export const getCookie = (name: any) => {
  return cookie.get(name);
};
export const removeCookie = (name: any) => {
  return cookie.remove(name);
};
