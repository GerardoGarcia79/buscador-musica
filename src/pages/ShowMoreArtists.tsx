import ShowMore from "../components/ShowMore";
import useArtists from "../hooks/useArtists";

const ShowMoreArtists = () => {
  const {
    data: artists,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useArtists();

  return (
    <ShowMore
      data={artists}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      isLoading={isLoading}
      item="ARTISTS"
    />
  );
};

export default ShowMoreArtists;
