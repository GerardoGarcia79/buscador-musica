import { useEffect, useState } from "react";
import useAlbums from "../../hooks/useAlbums";
import useArtists from "../../hooks/useArtists";
import useTracks from "../../hooks/useTracks";
import { updateColumns } from "../../utils";
import ResultsGrid from "./ResultsGrid";

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

  const calculateColumns = () => updateColumns(setColumns, setSkeletons);

  useEffect(() => {
    calculateColumns(); // Initial setup
    window.addEventListener("resize", calculateColumns); // Listen for resize
    return () => window.removeEventListener("resize", calculateColumns); // Cleanup on unmount
  }, []);

  return (
    <>
      <ResultsGrid
        columns={columns}
        data={albums}
        error={errorAlbums}
        isLoading={isLoadingAlbums}
        item="albums"
        moreLink="/more-albums"
        skeletons={skeletons}
      />
      <ResultsGrid
        columns={columns}
        data={artists}
        error={errorArtists}
        isLoading={isLoadingArtists}
        item="artists"
        moreLink="/more-artists"
        skeletons={skeletons}
      />
      <ResultsGrid
        columns={columns}
        data={tracks}
        error={errorTracks}
        isLoading={isLoadingTracks}
        item="tracks"
        moreLink="/more-tracks"
        skeletons={skeletons}
      />
    </>
  );
};

export default SearchResults;
