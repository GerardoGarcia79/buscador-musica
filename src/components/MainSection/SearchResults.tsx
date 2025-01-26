import { Box, Heading, HStack, SimpleGrid, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useAlbums from "../../hooks/useAlbums";
import ResultItem from "./ResultItem";
import ResultItemSkeleton from "./ResultItemSkeleton";
import useTracks from "../../hooks/useTracks";
import useArtists from "../../hooks/useArtists";
import { Link } from "react-router-dom";
import React from "react";

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
  console.log(columns);
  console.log(albums?.pages?.[0]?.length);

  return (
    <>
      {errorAlbums && (
        <Box color="red.500" textAlign="center" mb={4}>
          {errorAlbums.message}
        </Box>
      )}
      {errorTracks && (
        <Box color="red.500" textAlign="center" mb={4}>
          {errorTracks.message}
        </Box>
      )}
      {errorArtists && (
        <Box color="red.500" textAlign="center" mb={4}>
          {errorArtists.message}
        </Box>
      )}
      {/* Render Albums */}
      <Box my={2}>
        <HStack justifyContent="space-between">
          <Heading fontSize="2xl">Albums</Heading>
          {albums?.pages?.[0]?.length !== undefined &&
          albums.pages[0].length < columns ? null : (
            <Link to="/more-albums">Show More</Link>
          )}
        </HStack>
        {albums?.pages[0].length === 0 && (
          <Text>No albums found. Please try again with another name.</Text>
        )}
        {isLoadingAlbums && (
          <SimpleGrid columns={columns} spacing={5}>
            {skeletons.map((skeleton) => (
              <ResultItemSkeleton key={`album-skeleton-${skeleton}`} />
            ))}
          </SimpleGrid>
        )}
        <SimpleGrid columns={columns} spacing={5}>
          {albums?.pages[0].length === 0
            ? null
            : albums?.pages.map((page, index) => (
                <React.Fragment key={index}>
                  {page.slice(0, columns).map((album) => (
                    <ResultItem key={album.url} item={album} />
                  ))}
                </React.Fragment>
              ))}
        </SimpleGrid>
      </Box>
      {/* Render Artists */}
      <Box my={2}>
        <HStack justifyContent="space-between">
          <Heading fontSize="2xl">Artists</Heading>
          {albums?.pages?.[0]?.length !== undefined &&
          albums.pages[0].length < columns ? null : (
            <Link to="/more-artists">Show More</Link>
          )}
        </HStack>
        {artists?.pages[0].length === 0 && (
          <Text>No artists found. Please try again with another name.</Text>
        )}
        {isLoadingArtists && (
          <SimpleGrid columns={columns} spacing={5}>
            {skeletons.map((skeleton) => (
              <ResultItemSkeleton key={`artist-skeleton-${skeleton}`} />
            ))}
          </SimpleGrid>
        )}
        <SimpleGrid columns={columns} spacing={5}>
          {artists?.pages[0].length === 0
            ? null
            : artists?.pages.map((page, index) => (
                <React.Fragment key={index}>
                  {page.slice(0, columns).map((artist) => (
                    <ResultItem key={artist.url} item={artist} />
                  ))}
                </React.Fragment>
              ))}
        </SimpleGrid>
      </Box>
      {/* Render Tracks */}
      <Box my={2}>
        <HStack justifyContent="space-between">
          <Heading fontSize="2xl">Tracks</Heading>
          {albums?.pages?.[0]?.length !== undefined &&
          albums.pages[0].length < columns ? null : (
            <Link to="/more-tracks">Show More</Link>
          )}
        </HStack>
        {tracks?.pages[0].length === 0 && (
          <Text>No tracks found. Please try again with another name.</Text>
        )}
        {isLoadingTracks && (
          <SimpleGrid columns={columns} spacing={5}>
            {skeletons.map((skeleton) => (
              <ResultItemSkeleton key={`track-skeleton-${skeleton}`} />
            ))}
          </SimpleGrid>
        )}
        <SimpleGrid columns={columns} spacing={5}>
          {tracks?.pages[0].length === 0
            ? null
            : tracks?.pages.map((page, index) => (
                <React.Fragment key={index}>
                  {page.slice(0, columns).map((track) => (
                    <ResultItem key={track.url} item={track} />
                  ))}
                </React.Fragment>
              ))}
        </SimpleGrid>
      </Box>
    </>
  );
};

export default SearchResults;
