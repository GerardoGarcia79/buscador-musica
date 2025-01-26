import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import useArtists from "../../hooks/useArtists";
import ResultItem from "./ResultItem";
import ResultItemSkeleton from "./ResultItemSkeleton";

const ShowMoreArtists = () => {
  const { data: artists = [], isLoading: isLoadingArtists } = useArtists();

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <>
      {/* Render Albums */}
      <Box my={2}>
        <Heading fontSize="2xl">Artists</Heading>
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
          {artists.map((artist) => (
            <ResultItem key={artist.url} item={artist} />
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
};

export default ShowMoreArtists;
