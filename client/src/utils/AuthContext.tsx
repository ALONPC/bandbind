import React from "react";
import { getStoredUserAuth } from "../utils/Helpers";
import { DEFAULT_USER_AUTH } from "./contants";
import { IUser } from "../../@types/user";
import useAuthHandler from "./AuthHandler";
interface IAuthContextInterface {
  auth: IUser;
  setAuthStatus: (userAuth: IUser) => void;
  setUnauthStatus: () => void;
}
export const authContext = React.createContext<IAuthContextInterface>({
  auth: DEFAULT_USER_AUTH,
  setAuthStatus: () => {},
  setUnauthStatus: () => {},
});
const { Provider } = authContext;
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { auth, setAuthStatus, setUnauthStatus } = useAuthHandler(
    getStoredUserAuth()
  );
  return (
    <Provider value={{ auth, setAuthStatus, setUnauthStatus }}>
      {children}
    </Provider>
  );
};
export default AuthProvider;
