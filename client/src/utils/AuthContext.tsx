import React from "react";
import { getStoredUserAuth } from "../utils/Helpers";
import { DEFAULT_USER_AUTH } from "./contants";
import { IUserAuth } from "../../@types/user";
import useAuthHandler from "./AuthHandler";
interface IAuthContextInterface {
  auth: IUserAuth;
  setAuthStatus: (userAuth: IUserAuth) => void;
  setUnauthStatus: () => void;
  isLoggedIn: boolean;
}
export const authContext = React.createContext<IAuthContextInterface>({
  auth: DEFAULT_USER_AUTH,
  setAuthStatus: () => {},
  setUnauthStatus: () => {},
  isLoggedIn: false,
});
const { Provider } = authContext;
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { auth, setAuthStatus, setUnauthStatus, isLoggedIn } = useAuthHandler(
    getStoredUserAuth()
  );
  return (
    <Provider value={{ auth, setAuthStatus, setUnauthStatus, isLoggedIn }}>
      {children}
    </Provider>
  );
};
export default AuthProvider;
