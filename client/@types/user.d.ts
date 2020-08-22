import { ISubscription } from "./subscription";

export type IUserAuth = {
  id: string;
  email: string;
};

export interface IUser {
  email: string;
  password: string;
  name?: string;
  hashedPassword?: string;
  role?: eRole;
  subscription?: ISubscription;
}

enum eRole {
  "ADMIN",
  "USER",
}
