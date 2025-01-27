import ShowMore from "../components/ShowMore";
import useTracks from "../hooks/useTracks";

const ShowMoreTracks = () => {
  const {
    data: tracks,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useTracks();

  return (
    <ShowMore
      data={tracks}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      isLoading={isLoading}
      item="TRACKS"
    />
  );
};

export default ShowMoreTracks;
