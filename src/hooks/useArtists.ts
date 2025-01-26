// import useStore from "../store";
// import useData from "./useData";

// interface Image {
//   "#text": string;
//   size: "small" | "medium" | "large" | "extralarge";
// }

// export interface Artist {
//   name: string;
//   url: string;
//   image: Image[];
// }

// const useArtists = () => {
//   const query = useStore((state) => state.search);

//   return useData<Artist>(
//     `2.0/?method=artist.search&artist=${query}`,
//     "artistmatches"
//   );
// };
// export default useArtists;

import useData from "./useData";
import useStore from "../store";

interface Image {
  "#text": string;
  size: "small" | "medium" | "large" | "extralarge";
}

export interface Artist {
  name: string;
  url: string;
  image: Image[];
}

const useArtists = () => {
  const query = useStore((state) => state.search);
  return useData<Artist>(
    `2.0/?method=artist.search&artist=${query}`,
    "artistmatches"
  );
};

export default useArtists;
