import { useInfiniteQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";

export interface FetchResponse<T> {
  results: {
    [key: string]: {
      [key: string]: T[];
    };
  };
}

const useData = <T>(endpoint: string, matchesKey: string) => {
  return useInfiniteQuery<T[], Error>({
    queryKey: [endpoint, matchesKey],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await apiClient.get<FetchResponse<T>>(endpoint, {
        params: {
          page: pageParam,
          limit: 30,
        },
      });
      const matches = response.data.results[matchesKey];
      const key = Object.keys(matches)[0];
      return matches[key] || [];
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length < 30 ? undefined : allPages.length + 1;
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};

export default useData;
