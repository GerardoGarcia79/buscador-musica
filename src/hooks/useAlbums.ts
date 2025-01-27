import useData from "./useData";
import useStore from "../store";
import { Image } from "../entities/Image";

export interface Album {
  name: string;
  artist: string;
  url: string;
  image: Image[];
}

const useAlbums = () => {
  const query = useStore((state) => state.search);
  return useData<Album>(
    `2.0/?method=album.search&album=${query ? query : "Believe"}`,
    "albummatches"
  );
};

export default useAlbums;
