import { useEffect, useState } from "react";
import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import useAlbums from "../../hooks/useAlbums";
import ResultItem from "./ResultItem";
import ResultItemSkeleton from "./ResultItemSkeleton";

const SearchResults = () => {
  const { albums, error, isLoading } = useAlbums();
  const [columns, setColumns] = useState(8); // Default number of columns
  const [skeletons, setSkeletons] = useState<number[]>([]);

  // Function to update column count based on screen width
  const updateColumns = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 425) {
      setColumns(1);
      setSkeletons([1]);
    } // Mobile
    if (screenWidth <= 600) {
      setColumns(2);
      setSkeletons([1, 2]);
    } // Mobile large
    else if (screenWidth <= 768) {
      setColumns(4);
      setSkeletons([1, 2, 3, 4]);
    } // Tablet
    else if (screenWidth <= 1024) {
      setColumns(6);
      setSkeletons([1, 2, 3, 4, 5, 6]);
    } // Desktop
    else {
      setColumns(8);
      setSkeletons([1, 2, 3, 4, 5, 6, 7, 8]);
    } // Large Screens
  };

  useEffect(() => {
    updateColumns(); // Initial setup
    window.addEventListener("resize", updateColumns); // Listen for resize
    return () => window.removeEventListener("resize", updateColumns); // Cleanup on unmount
  }, []);

  return (
    <>
      {error && (
        <Box color="red.500" textAlign="center" mb={4}>
          {error}
        </Box>
      )}
      <Box my={2}>
        <Heading fontSize="2xl">Albums</Heading>
        {isLoading && (
          <SimpleGrid columns={columns} spacing={5}>
            {skeletons.map((skeleton) => (
              <ResultItemSkeleton key={skeleton} />
            ))}
          </SimpleGrid>
        )}
        <SimpleGrid columns={columns} spacing={5}>
          {albums.slice(0, columns).map((album) => (
            <ResultItem key={album.name} album={album} />
          ))}
        </SimpleGrid>
      </Box>
      <Box my={2}>
        <Heading fontSize="2xl">Artists</Heading>
        {isLoading && (
          <SimpleGrid columns={columns} spacing={5}>
            {skeletons.map((skeleton) => (
              <ResultItemSkeleton key={skeleton} />
            ))}
          </SimpleGrid>
        )}
        <SimpleGrid columns={columns} spacing={5}>
          {albums.slice(0, columns).map((album) => (
            <ResultItem key={album.artist} album={album} />
          ))}
        </SimpleGrid>
      </Box>
      <Box my={2}>
        <Heading fontSize="2xl">Tracks</Heading>
        {isLoading && (
          <SimpleGrid columns={columns} spacing={5}>
            {skeletons.map((skeleton) => (
              <ResultItemSkeleton key={skeleton} />
            ))}
          </SimpleGrid>
        )}
        <SimpleGrid columns={columns} spacing={5}>
          {albums.slice(0, columns).map((album) => (
            <ResultItem key={album.url} album={album} />
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
};

export default SearchResults;
