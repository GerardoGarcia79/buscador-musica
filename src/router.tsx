import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./Layout";
import ErrorPage from "./pages/ErrorPage";
import SearchResults from "./pages/SearchResults";
import ShowMoreAlbums from "./pages/ShowMoreAlbums";
import ShowMoreArtists from "./pages/ShowMoreArtists";
import ShowMoreTracks from "./pages/ShowMoreTracks";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

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
