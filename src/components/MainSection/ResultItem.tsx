import { Card, CardBody, Heading, Image, Text } from "@chakra-ui/react";
import { Album } from "../../hooks/useAlbums";
import { Track } from "../../hooks/useTracks";
import { Artist } from "../../hooks/useArtists";
import noImage from "../../assets/no-image.webp";

type Item = Album | Artist | Track;

interface Props {
  item: Item;
}

const ResultItem = ({ item }: Props) => {
  // Determine type and properties to render
  const isAlbum = (item: Item): item is Album =>
    "artist" in item && Array.isArray(item.image);
  const isTrack = (item: Item): item is Track =>
    "artist" in item && Array.isArray(item.image);
  const isArtist = (item: Item): item is Artist =>
    !("artist" in item) && Array.isArray(item.image);

  const shortName =
    item.name.length > 15 ? item.name.slice(0, 15) + "..." : item.name;
  const shortArtistName =
    isAlbum(item) || isTrack(item)
      ? item.artist.length > 15
        ? item.artist.slice(0, 15) + "..."
        : item.artist
      : "";

  return (
    <Card borderRadius={10} overflow="hidden">
      <Image src={item.image[2]["#text"] ? item.image[2]["#text"] : noImage} />
      <CardBody p={1}>
        <Heading fontSize="sm">
          {shortName && shortName !== "(null)" && shortName !== "[unknown]"
            ? shortName
            : item.name === "(null)"
            ? "Name unavailable"
            : item.name
            ? item.name
            : "Name unavailable"}
        </Heading>
        <Text fontSize="sm">
          {isAlbum(item) ||
          (isTrack(item) &&
            shortArtistName !== "[unknown]" &&
            shortArtistName !== "(null)")
            ? shortArtistName || "Artist unavailable"
            : isArtist(item)
            ? "Artist"
            : ""}
        </Text>
      </CardBody>
    </Card>
  );
};

export default ResultItem;
