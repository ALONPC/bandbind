import { ISubscription } from "./subscription";

export type IUserAuth = {
  _id: string;
  email: string;
};

export interface IUser {
  _id?: string;
  email: string;
  password?: string;
  name?: string;
  hashedPassword?: string;
  role?: eRole;
  subscription?: ISubscription;
}

enum eRole {
  "ADMIN",
  "USER",
}
