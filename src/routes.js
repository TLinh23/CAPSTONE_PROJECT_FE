import React from "react";
import CollectionPage from "./pages/CollectionPage";
import NewHomePage from "./pages/NewHomePage";
import NotFound from "./pages/NotFound";
import ProfilePage from "./pages/ProfilePage";
import TodoListPage from "./pages/TodoListPage";
import EditProfilePage from "./pages/EditProfilePage";
import ListOrderRequestPage from "./pages/ListOrderRequestPage";
//Feature's Loc
import ClassList from './pagess/ClassList';
import RequestListAsTutor from './pagess/RequestListAsTutor';
import ClassManager from './pagess/ClassManager';
import ClassroomManager from './pagess/ClassroomManager';
import ClassDetail from './pagess/ClassDetail';
import AccountManager from './pagess/AccountManager';
import TransactionRecord from './pagess/TransactionRecord';


//list your routes here
export const routes = [
  { path: "/order-requests", element: <ListOrderRequestPage /> },
  { path: "/profile", element: <ProfilePage /> },
  { path: "/profile/edit", element: <EditProfilePage /> },
  { path: "/collections", element: <CollectionPage /> },
  { path: "/collections/:slug", element: <CollectionPage /> },
  { path: "/todos", element: <TodoListPage /> },
  { path: "/", element: <NewHomePage /> },
  { path: "*", element: <NotFound /> },
  //Feature's Loc
  { path: "/classList", element: <ClassList /> },
  { path: "/requestList", element: <RequestListAsTutor /> },
  { path: "/classManager", element: <ClassManager /> },
  { path: "/classroomManager", element: <ClassroomManager /> },
  { path: "/classDetail/:id", element: <ClassDetail /> },
  { path: "/accountManager", element: <AccountManager /> },
  { path: "/transactionRecord", element: <TransactionRecord /> },
];
