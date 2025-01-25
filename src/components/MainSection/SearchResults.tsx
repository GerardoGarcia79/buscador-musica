import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useAlbums from "../../hooks/useAlbums";
import ResultItem from "./ResultItem";
import ResultItemSkeleton from "./ResultItemSkeleton";
import useTracks from "../../hooks/useTracks";
import useArtists from "../../hooks/useArtists";

const SearchResults = () => {
  const {
    data: albums,
    error: errorAlbums,
    isLoading: isLoadingAlbums,
  } = useAlbums();
  const {
    data: tracks,
    error: errorTracks,
    isLoading: isLoadingTracks,
  } = useTracks();
  const {
    data: artists,
    error: errorArtists,
    isLoading: isLoadingArtists,
  } = useArtists();
  const [columns, setColumns] = useState(8);
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
      {errorAlbums && (
        <Box color="red.500" textAlign="center" mb={4}>
          {errorAlbums}
        </Box>
      )}
      {errorTracks && (
        <Box color="red.500" textAlign="center" mb={4}>
          {errorTracks}
        </Box>
      )}
      {errorArtists && (
        <Box color="red.500" textAlign="center" mb={4}>
          {errorTracks}
        </Box>
      )}
      {/* Render Albums */}
      <Box my={2}>
        <Heading fontSize="2xl">Albums</Heading>
        {isLoadingAlbums && (
          <SimpleGrid columns={columns} spacing={5}>
            {skeletons.map((skeleton) => (
              <ResultItemSkeleton key={skeleton} />
            ))}
          </SimpleGrid>
        )}
        <SimpleGrid columns={columns} spacing={5}>
          {albums.slice(0, columns).map((album) => (
            <ResultItem key={album.name} item={album} />
          ))}
        </SimpleGrid>
      </Box>
      {/* Render Artists */}
      <Box my={2}>
        <Heading fontSize="2xl">Artists</Heading>
        {isLoadingArtists && (
          <SimpleGrid columns={columns} spacing={5}>
            {skeletons.map((skeleton) => (
              <ResultItemSkeleton key={skeleton} />
            ))}
          </SimpleGrid>
        )}
        <SimpleGrid columns={columns} spacing={5}>
          {artists.slice(0, columns).map((artist) => (
            <ResultItem key={artist.name} item={artist} />
          ))}
        </SimpleGrid>
      </Box>
      {/* Render Tracks */}
      <Box my={2}>
        <Heading fontSize="2xl">Tracks</Heading>
        {isLoadingTracks && (
          <SimpleGrid columns={columns} spacing={5}>
            {skeletons.map((skeleton) => (
              <ResultItemSkeleton key={skeleton} />
            ))}
          </SimpleGrid>
        )}
        <SimpleGrid columns={columns} spacing={5}>
          {tracks.slice(0, columns).map((track) => (
            <ResultItem key={track.name} item={track} />
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
};

export default SearchResults;
