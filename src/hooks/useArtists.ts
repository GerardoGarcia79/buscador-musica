import useData from "./useData";

interface Image {
  "#text": string;
  size: "small" | "medium" | "large" | "extralarge";
}

export interface Artist {
  name: string;
  url: string;
  image: Image[];
}

const useArtists = () =>
  useData<Artist>("2.0/?method=artist.search&artist=Justin", "artistmatches");
export default useArtists;
