// import { useEffect, useState } from "react";
// import apiClient from "../services/api-client";
// import { CanceledError } from "axios";
import useData from "./useData";

interface Image {
  "#text": string;
  size: "small" | "medium" | "large" | "extralarge";
}

export interface Track {
  name: string;
  artist: string;
  url: string;
  image: Image[];
}

// interface FetchTracksResponse {
//   results: {
//     trackmatches: {
//       track: Track[];
//     };
//   };
// }

const useTracks = () =>
  useData<Track>("2.0/?method=track.search&track=Believe", "trackmatches");
//   {
//   const [tracks, setTracks] = useState<Track[]>([]);
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     const controller = new AbortController();

//     setIsLoading(true);
//     apiClient
//       .get<FetchTracksResponse>("/2.0", {
//         params: {
//           method: "track.search",
//           album: "Believe",
//           //   limit: 8,
//         },
//         signal: controller.signal,
//       })
//       .then((res) => {
//         setIsLoading(false);
//         setTracks(res.data.results.trackmatches.track);
//       })
//       .catch((err) => {
//         if (err instanceof CanceledError) return;
//         setError(err.message);
//         setIsLoading(false);
//       });

//     return () => controller.abort();
//   }, []);

//   return { tracks, error, isLoading };
// };

export default useTracks;
