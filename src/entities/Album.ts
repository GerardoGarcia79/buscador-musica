import { Image } from "./Image";

export interface Album {
  name: string;
  artist: string;
  url: string;
  image: Image[];
}
