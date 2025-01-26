import { Box, Button, Heading, SimpleGrid } from "@chakra-ui/react";
import useArtists from "../../hooks/useArtists";
import ResultItem from "./ResultItem";
import ResultItemSkeleton from "./ResultItemSkeleton";
import React from "react";

const ShowMoreArtists = () => {
  const {
    data: artists,
    isLoading: isLoadingArtists,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useArtists();

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <>
      {/* Render Albums */}
      <Box my={2}>
        <Heading fontSize="2xl">ARTISTS</Heading>
        {isLoadingArtists && (
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
          {artists?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.map((artist) => (
                <ResultItem key={artist.url} item={artist} />
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

export default ShowMoreArtists;
