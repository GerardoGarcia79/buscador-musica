import { ListItem, UnorderedList } from "@chakra-ui/react";
import useAlbums from "../../hooks/useAlbums";

const SearchResults = () => {
  const { albums, error } = useAlbums();

  return (
    <>
      {error && <p>{error}</p>}
      <UnorderedList>
        {albums.map((album) => (
          <ListItem key={album.name}>{album.name}</ListItem>
        ))}
      </UnorderedList>
    </>
  );
};

export default SearchResults;
