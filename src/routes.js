import React from "react";
import CollectionPage from "./pages/CollectionPage";
import NewHomePage from "./pages/NewHomePage";
import NotFound from "./pages/NotFound";
import ProfilePage from "./pages/ProfilePage";
import TodoListPage from "./pages/TodoListPage";
import EditProfilePage from "./pages/EditProfilePage";
import ListOrderRequestPage from "./pages/ListOrderRequestPage";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ChangePassword from "./pages/Changepassword/Changepassword";
import RegisterTutor from "./pages/RegisterTutor/RegisterTutor";
import CreateClassroom from "./pages/CreateClassroom/CreateClassroom";
import ClassListParent from "./pages/ClassListForParent/ClassListParent";
import PageOrderRequestDetail from "./pages/PageOrderRequestDetail";
import PageCreateOrderRequest from "./pages/PageCreateOrderRequest";

//list your routes here
export const routes = [
  { path: "/order-requests", element: <ListOrderRequestPage /> },
  { path: "/order-requests/:id", element: <PageOrderRequestDetail /> },
  { path: "/order-requests/create", element: <PageCreateOrderRequest /> },
  { path: "/profile", element: <ProfilePage />, },
  { path: "/profile/edit", element: <EditProfilePage /> },
  { path: "/collections", element: <CollectionPage /> },
  { path: "/collections/:slug", element: <CollectionPage /> },
  { path: "/todos", element: <TodoListPage /> },
  { path: "/", element: <NewHomePage /> },
  { path: "*", element: <NotFound /> },
  { path: "/login", element: <Login/>},
  { path: "/forgotpassword", element: <ForgotPassword/>},
  { path: "/changepassword", element: <ChangePassword/>},
  { path: "/register-tutor", element: <RegisterTutor/>},
  { path: "/create-classroom", element: <CreateClassroom/>},
  { path: "/class-list-parent", element: <ClassListParent/>},
];
//Tessssssss