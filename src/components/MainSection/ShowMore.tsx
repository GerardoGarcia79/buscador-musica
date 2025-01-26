import { Box, Button, Heading, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import ResultItem from "./ResultItem";
import ResultItemSkeleton from "./ResultItemSkeleton";
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import { Album } from "../../hooks/useAlbums";
import { Artist } from "../../hooks/useArtists";
import { Track } from "../../hooks/useTracks";

interface Props {
  item: "ALBUMS" | "ARTISTS" | "TRACKS";
  data:
    | InfiniteData<Album[]>
    | InfiniteData<Artist[]>
    | InfiniteData<Track[]>
    | undefined;
  isLoading: boolean;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions
  ) => Promise<InfiniteQueryObserverResult<Artist[], Error>>;
  skeletons?: number[];
}

const ShowMore = ({
  item,
  data,
  isLoading,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
}: Props) => {
  return (
    <>
      <Box my={2}>
        <Heading fontSize="2xl">{item}</Heading>
        {isLoading && (
          <SimpleGrid
            columns={{
              base: 2,
              md: 4,
              lg: 6,
              xl: 8,
            }}
            spacing={5}
          >
            {skeletons.map((skeleton) => (
              <ResultItemSkeleton
                key={`${item.toLowerCase()}-skeleton-${skeleton}`}
              />
            ))}
          </SimpleGrid>
        )}
        <SimpleGrid
          columns={{
            base: 2,
            md: 4,
            lg: 6,
            xl: 8,
          }}
          spacing={5}
        >
          {data?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.map((item) => (
                <ResultItem key={item.url} item={item} />
              ))}
            </React.Fragment>
          ))}
        </SimpleGrid>
      </Box>
      {hasNextPage && (
        <Box display="flex" justifyContent="center">
          <Button onClick={() => fetchNextPage()} mt={2} mb={3}>
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </Button>
        </Box>
      )}
    </>
  );
};

export default ShowMore;
