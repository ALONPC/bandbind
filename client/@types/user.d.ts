import { ISubscription } from "./subscription";

export type IUserAuth = {
  _id: string;
  email: string;
};

export interface IUser {
  _id?: string;
  name?: string;
  email: string;
  password?: string;
  hashedPassword?: string;
  // role?: eRole;
  role?: string;
  subscription?: ISubscription;
}

enum eRole {
  "ADMIN",
  "USER",
}
