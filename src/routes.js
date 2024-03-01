import React from "react";
import CollectionPage from "./pages/CollectionPage";
import NewHomePage from "./pages/NewHomePage";
import NotFound from "./pages/NotFound";
import ProfilePage from "./pages/ProfilePage";

//list your routes here
export const routes = [
  { path: "/profile", element: <ProfilePage /> },
  { path: "/collections", element: <CollectionPage /> },
  { path: "/collections/:slug", element: <CollectionPage /> },
  { path: "/", element: <NewHomePage /> },
  { path: "*", element: <NotFound /> },
];
//Tessssssss