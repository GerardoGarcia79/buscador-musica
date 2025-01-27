import { Artist } from "../entities/Artist";
import useStore from "../store";
import useData from "./useData";

const useArtists = () => {
  const query = useStore((state) => state.search);
  return useData<Artist>(
    `2.0/?method=artist.search&artist=${query ? query : "Believe"}`,
    "artistmatches"
  );
};

export default useArtists;
