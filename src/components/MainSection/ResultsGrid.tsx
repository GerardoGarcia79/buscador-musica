import { Box, Heading, HStack, SimpleGrid, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ResultItem from "./ResultItem";
import ResultItemSkeleton from "./ResultItemSkeleton";
import { Album } from "../../hooks/useAlbums";
import { InfiniteData } from "@tanstack/react-query";
import { Artist } from "../../hooks/useArtists";
import { Track } from "../../hooks/useTracks";

interface Props {
  item: "albums" | "artists" | "tracks";
  data:
    | InfiniteData<Album[]>
    | InfiniteData<Artist[]>
    | InfiniteData<Track[]>
    | undefined;
  isLoading: boolean;
  skeletons: number[];
  columns: number;
  moreLink: "/more-albums" | "/more-artists" | "/more-tracks";
  error: Error | null;
}

const ResultsGrid = ({
  item,
  data,
  isLoading,
  skeletons,
  columns,
  moreLink,
  error,
}: Props) => {
  return (
    <Box my={2}>
      <HStack justifyContent="space-between">
        <Heading fontSize="2xl">{item.toUpperCase()}</Heading>
        {data?.pages?.[0]?.length !== undefined &&
        data.pages[0].length < columns ? null : (
          <Link to={moreLink}>Show More</Link>
        )}
      </HStack>
      {error && (
        <Box color="red.500" textAlign="center" mb={4}>
          {error.message}
        </Box>
      )}
      {data?.pages[0].length === 0 && (
        <Text>{`No ${item} found. Please try again with another name.`}</Text>
      )}
      {isLoading && (
        <SimpleGrid columns={columns} spacing={5}>
          {skeletons.map((skeleton) => (
            <ResultItemSkeleton key={`${item}-skeleton-${skeleton}`} />
          ))}
        </SimpleGrid>
      )}
      <SimpleGrid columns={columns} spacing={5}>
        {data?.pages[0].length === 0
          ? null
          : data?.pages[0]
              .slice(0, columns)
              .map((item, index) => <ResultItem key={index} item={item} />)}
      </SimpleGrid>
    </Box>
  );
};

export default ResultsGrid;
