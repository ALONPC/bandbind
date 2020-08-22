import React, { useState } from "react";
import { IUserAuth } from "../../@types/user";
import { DEFAULT_USER_AUTH, API } from "./contants";

const useAuthHandler = (initialState: IUserAuth) => {
  const [auth, setAuth] = useState(initialState);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const setAuthStatus = (userAuth: IUserAuth) => {
    window.localStorage.setItem("UserAuth", JSON.stringify(userAuth));
    setAuth(userAuth);
    setIsLoggedIn(true);
  };
  const setUnauthStatus = async () => {
    window.localStorage.clear();
    setAuth(DEFAULT_USER_AUTH);
    const response = await fetch(`${API}/logout`, {
      method: "GET",
    })
      .then((res) => {
        console.log("logout", res);
        setIsLoggedIn(false);
        return res.json();
      })
      .catch((err) => console.log(err));
    console.log("setUnauthStatus -> response", response);
    return response;
  };
  return {
    auth,
    isLoggedIn,
    setAuthStatus,
    setUnauthStatus,
  };
};
export default useAuthHandler;
