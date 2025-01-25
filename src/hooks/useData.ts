// import { useState, useEffect } from "react";
// import apiClient from "../services/api-client";
// import { CanceledError } from "axios";

// interface FetchResponse<T> {
//   results: {
//     albummatches: {
//       album: T[];
//     };
//   };
// }

// const useData = <T>(endpoint: string) => {
//   const [data, setData] = useState<T[]>([]);
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     const controller = new AbortController();

//     setIsLoading(true);
//     apiClient
//       .get<FetchResponse<T>>(endpoint,
//         {signal: controller.signal})
//       .then((res) => {
//         setIsLoading(false);
//         setData(res.data.results);
//       })
//       .catch((err) => {
//         if (err instanceof CanceledError) return;
//         setError(err.message);
//         setIsLoading(false);
//       });

//     return () => controller.abort();
//   }, []);

//   return { albums, error, isLoading };
// };

// export default useData;

import { useState, useEffect } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

interface FetchResponse<T> {
  results: {
    [key: string]: {
      [key: string]: T[];
    };
  };
}

const useData = <T>(endpoint: string, matchesKey: string) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);
    apiClient
      .get<FetchResponse<T>>(endpoint, { signal: controller.signal })
      .then((res) => {
        setIsLoading(false);

        // Dynamically access the correct array using matchesKey
        const matches = res.data.results[matchesKey];
        const key = Object.keys(matches)[0]; // "artist", "album", or "track"
        setData(matches[key] || []);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setIsLoading(false);
      });

    return () => controller.abort();
  }, [endpoint, matchesKey]);

  return { data, error, isLoading };
};

export default useData;
