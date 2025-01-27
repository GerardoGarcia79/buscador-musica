import { Box, Button, Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import { Album } from "../entities/Album";
import { Artist } from "../entities/Artist";
import { Track } from "../entities/Track";
import ResultItem from "./ResultItem";
import ResultItemSkeleton from "./ResultItemSkeleton";

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
        <Flex justifyContent="space-between">
          <Heading fontSize="3xl" mb={2}>
            {item}
          </Heading>
          <Link to="/">
            <Button variant="outline">Go Back</Button>
          </Link>
        </Flex>
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
