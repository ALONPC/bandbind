import React, { useState } from "react";
import { IUser } from "../../@types/user";
import { DEFAULT_USER_AUTH } from "./contants";
import { logout } from "../auth";

const useAuthHandler = (initialState: IUser) => {
  const [auth, setAuth] = useState(initialState);

  const setAuthStatus = (userAuth: IUser) => {
    window.localStorage.setItem("UserAuth", JSON.stringify(userAuth));
    setAuth(userAuth);
  };
  const setUnauthStatus = async () => {
    window.localStorage.clear();
    setAuth(DEFAULT_USER_AUTH);
    return await logout();
  };
  return {
    auth,
    setAuthStatus,
    setUnauthStatus,
  };
};
export default useAuthHandler;
