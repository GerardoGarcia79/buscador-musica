import { Card, CardBody, Heading, Image, Text } from "@chakra-ui/react";
import { Album } from "../../hooks/useAlbums";

interface Props {
  album: Album; // TODO:Add Artist and Song later
}

const ResultItem = ({ album }: Props) => {
  let shortAlbumName = "";
  let shortArtistName = "";
  if (album.name.length > 15) shortAlbumName = album.name.slice(0, 15) + "...";
  if (album.artist.length > 15)
    shortArtistName = album.artist.slice(0, 15) + "...";

  return (
    <Card borderRadius={10} overflow="hidden">
      <Image src={album.image[2]["#text"]} />
      <CardBody p={1}>
        <Heading fontSize="sm">
          {shortAlbumName ? shortAlbumName : album.name}
        </Heading>
        <Text fontSize="sm">
          {shortArtistName ? shortArtistName : album.artist}
        </Text>
      </CardBody>
    </Card>
  );
};

export default ResultItem;
