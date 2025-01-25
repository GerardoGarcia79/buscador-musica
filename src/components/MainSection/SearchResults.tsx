import { useEffect, useState } from "react";
import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import useAlbums from "../../hooks/useAlbums";
import ResultItem from "./ResultItem";

const SearchResults = () => {
  const { albums, error } = useAlbums();
  const [columns, setColumns] = useState(8); // Default number of columns

  // Function to update column count based on screen width
  const updateColumns = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 425) setColumns(1); // Mobile
    if (screenWidth <= 600) setColumns(2); // Mobile large
    else if (screenWidth <= 768) setColumns(4); // Tablet
    else if (screenWidth <= 1024) setColumns(6); // Desktop
    else setColumns(8); // Large Screens
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
        <SimpleGrid columns={columns} spacing={5}>
          {albums.slice(0, columns).map((album) => (
            <ResultItem key={album.name} album={album} />
          ))}
        </SimpleGrid>
      </Box>
      <Box my={2}>
        <Heading fontSize="2xl">Artists</Heading>
        <SimpleGrid columns={columns} spacing={5}>
          {albums.slice(0, columns).map((album) => (
            <ResultItem key={album.artist} album={album} />
          ))}
        </SimpleGrid>
      </Box>
      <Box my={2}>
        <Heading fontSize="2xl">Tracks</Heading>
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
