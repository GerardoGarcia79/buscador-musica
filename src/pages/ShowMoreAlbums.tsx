import ShowMore from "../components/ShowMore";
import useAlbums from "../hooks/useAlbums";

const ShowMoreAlbums = () => {
  const {
    data: albums,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useAlbums();

  return (
    <ShowMore
      data={albums}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      isLoading={isLoading}
      item="ALBUMS"
    />
  );
};

export default ShowMoreAlbums;
