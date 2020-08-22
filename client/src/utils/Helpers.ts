import { IUserAuth } from "../../@types/user";
import { DEFAULT_USER_AUTH } from "./contants";

/** Return user auth from local storage value */
export const getStoredUserAuth = (): IUserAuth => {
  const auth = window.localStorage.getItem("UserAuth");
  if (auth) {
    return JSON.parse(auth);
  }
  return DEFAULT_USER_AUTH;
};
