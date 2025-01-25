import { useState, useEffect } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

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

interface FetchAlbumsResponse {
  results: {
    albummatches: {
      album: Album[];
    };
  };
}

const useAlbums = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    apiClient
      .get<FetchAlbumsResponse>("/2.0", {
        params: {
          method: "album.search",
          album: "believe",
          //   limit: 8,
        },
        signal: controller.signal,
      })
      .then((res) => setAlbums(res.data.results.albummatches.album))
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });

    return () => controller.abort();
  }, []);

  return { albums, error };
};

export default useAlbums;
