import { Track } from "../entities/Track";
import useStore from "../store";
import useData from "./useData";

const useTracks = () => {
  const query = useStore((state) => state.search);
  return useData<Track>(
    `2.0/?method=track.search&track=${query ? query : "Believe"}`,
    "trackmatches"
  );
};

export default useTracks;
