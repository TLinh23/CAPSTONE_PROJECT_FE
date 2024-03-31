import React from "react";
import CollectionPage from "./pages/CollectionPage";
import NewHomePage from "./pages/NewHomePage";
import NotFound from "./pages/NotFound";
import ProfilePage from "./pages/ProfilePage";
import TodoListPage from "./pages/TodoListPage";
import EditProfilePage from "./pages/EditProfilePage";
import ListOrderRequestPage from "./pages/ListOrderRequestPage";
import PageOrderRequestDetail from "./pages/PageOrderRequestDetail";
import PageCreateOrderRequest from "./pages/PageCreateOrderRequest";
//loc
import AccountManager from "./components/Staff/AccountManager/ListAccountManager";
import ListClassManager from "./components/Staff/ClassManager/ListClassManager";
import ListTransactionManager from "./components/Staff/ClassManager/ListClassManager";

//trang account detail
import AccountDetail from "./pages/PageAccountDetail";
import ClassDetailManager from "./pages/PageClassDetail";

//list your routes here
export const routes = [
  { path: "/order-requests", element: <ListOrderRequestPage /> },
  { path: "/order-requests/:id", element: <PageOrderRequestDetail /> },
  { path: "/order-requests/create", element: <PageCreateOrderRequest /> },
  // { path: "/tutor/profile", element: <ProfilePage /> },
  // { path: "/staff/profile", element: <ProfilePage /> },
  { path: "/profile/:id", element: <ProfilePage /> },
  { path: "/profile/:id/edit", element: <EditProfilePage /> },
  // { path: "/tutor/profile/edit", element: <EditProfilePage /> },
  // { path: "/staff/profile/edit", element: <EditProfilePage /> },
  { path: "/collections", element: <CollectionPage /> },
  { path: "/collections/:slug", element: <CollectionPage /> },
  { path: "/todos", element: <TodoListPage /> },
  { path: "/", element: <NewHomePage /> },
  { path: "*", element: <NotFound /> },
  //loc
  {path: "/accountManager", element: <AccountManager/>},
  {path: "/AccountDetail/:id", element: <AccountDetail/>},
  {path: "/listClassManager", element: <ListClassManager/>},
  {path: "/classDetailManager/:id", element: <ClassDetailManager/>},
  {path: "/listTransactionManager", element: <ListTransactionManager/>},
];
