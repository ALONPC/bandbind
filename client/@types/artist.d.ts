import { IEvent } from "./event";

export interface IArtist {
  _id?: string;
  name?: string;
  genres?: Array<string>;
  imageUrl?: string;
  url?: string;
  events?: Array<IEvent>;
}
