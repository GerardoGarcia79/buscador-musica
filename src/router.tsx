import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Home from "./components/Home";
import PrivateRoute from "./components/PrivateRoute";
import ShowMoreAlbums from "./components/MainSection/ShowMoreAlbums";
import ShowMoreArtists from "./components/MainSection/ShowMoreArtists";
import ShowMoreTracks from "./components/MainSection/ShowMoreTracks";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
  },
  { path: "/signup", element: <Signup /> },
  { path: "/signin", element: <Signin /> },
  {
    path: "/home",
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
  },
  {
    path: "/more-albums",
    element: (
      <PrivateRoute>
        <ShowMoreAlbums />
      </PrivateRoute>
    ),
  },
  {
    path: "/more-artists",
    element: (
      <PrivateRoute>
        <ShowMoreArtists />
      </PrivateRoute>
    ),
  },
  {
    path: "/more-tracks",
    element: (
      <PrivateRoute>
        <ShowMoreTracks />
      </PrivateRoute>
    ),
  },
]);
