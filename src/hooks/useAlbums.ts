import { Album } from "../entities/Album";
import useStore from "../store";
import useData from "./useData";

const useAlbums = () => {
  const query = useStore((state) => state.search);
  return useData<Album>(
    `2.0/?method=album.search&album=${query ? query : "Believe"}`,
    "albummatches"
  );
};

export default useAlbums;
