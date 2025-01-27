import { createBrowserRouter } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import PrivateRoute from "./components/PrivateRoute";
import ShowMoreAlbums from "./components/MainSection/ShowMoreAlbums";
import ShowMoreArtists from "./components/MainSection/ShowMoreArtists";
import ShowMoreTracks from "./components/MainSection/ShowMoreTracks";
import Layout from "./Layout";
import SearchResults from "./components/MainSection/SearchResults";
import ErrorPage from "./components/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Layout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <SearchResults /> },
      { path: "more-albums", element: <ShowMoreAlbums /> },
      { path: "more-artists", element: <ShowMoreArtists /> },
      { path: "more-tracks", element: <ShowMoreTracks /> },
    ],
  },
  { path: "signin", element: <Signin /> },
  { path: "signup", element: <Signup /> },
]);
