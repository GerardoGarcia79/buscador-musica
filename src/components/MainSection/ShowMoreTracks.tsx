import useTracks from "../../hooks/useTracks";
import ShowMore from "./ShowMore";

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
