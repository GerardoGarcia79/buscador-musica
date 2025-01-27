import useData from "./useData";
import useStore from "../store";
import { Image } from "../entities/Image";

export interface Track {
  name: string;
  artist: string;
  url: string;
  image: Image[];
}

const useTracks = () => {
  const query = useStore((state) => state.search);
  return useData<Track>(
    `2.0/?method=track.search&track=${query ? query : "Believe"}`,
    "trackmatches"
  );
};

export default useTracks;
