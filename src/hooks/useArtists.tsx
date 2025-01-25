import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

interface Image {
  "#text": string;
  size: "small" | "medium" | "large" | "extralarge";
}

export interface Artist {
  name: string;
  url: string;
  image: Image[];
}

interface FetchArtistsResponse {
  results: {
    artistmatches: {
      artist: Artist[];
    };
  };
}

const useArtists = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);
    apiClient
      .get<FetchArtistsResponse>("/2.0", {
        params: {
          method: "artist.search",
          artist: "cher",
          //   limit: 8,
        },
        signal: controller.signal,
      })
      .then((res) => {
        setIsLoading(false);
        setArtists(res.data.results.artistmatches.artist);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setIsLoading(false);
      });

    return () => controller.abort();
  }, []);

  return { artists, error, isLoading };
};
export default useArtists;
