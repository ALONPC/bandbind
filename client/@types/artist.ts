import { IEvent } from "./event";

export interface IArtist {
  id: string;
  name: string;
  genres: Array<string>;
  imageUrl: string;
  url: string;
  events: Array<IEvent>;
}
