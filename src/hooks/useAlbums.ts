import useData from "./useData";

interface Image {
  "#text": string;
  size: "small" | "medium" | "large" | "extralarge";
}

export interface Album {
  name: string;
  artist: string;
  url: string;
  image: Image[];
}

const useAlbums = () =>
  useData<Album>("2.0/?method=album.search&album=believe", "albummatches");

export default useAlbums;
