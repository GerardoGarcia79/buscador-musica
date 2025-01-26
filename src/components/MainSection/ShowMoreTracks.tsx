import { Box, Button, Heading, SimpleGrid } from "@chakra-ui/react";
import ResultItem from "./ResultItem";
import ResultItemSkeleton from "./ResultItemSkeleton";
import useTracks from "../../hooks/useTracks";
import React from "react";

const ShowMoreTracks = () => {
  const {
    data: tracks,
    isLoading: isLoadingTracks,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useTracks();

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <>
      {/* Render Albums */}
      <Box my={2}>
        <Heading fontSize="2xl">Tracks</Heading>
        {isLoadingTracks && (
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
              <ResultItemSkeleton key={`album-skeleton-${skeleton}`} />
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
          {tracks?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.map((track) => (
                <ResultItem key={track.url} item={track} />
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

export default ShowMoreTracks;
