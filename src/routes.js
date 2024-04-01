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
//loc
import AccountManager from "./components/Staff/AccountManager/ListAccountManager";
import ListClassManager from "./components/Staff/ClassManager/ListClassManager";
import Transaction from "./components/Staff/TransactionManager/Transaction";
import AddTransaction from "./components/Staff/TransactionManager/AddTransaction";
import ListStaffManager from "./components/Admin/StaffManager/ListStaffManager";
import AddStaff from "./components/Admin/StaffManager/AddStaff"; 

//trang account detail
import AccountDetail from "./pages/PageAccountDetail";
import ClassDetail from "./pages/PageClassDetail";
import TransactionDetail from "./pages/PageTransactionDetail";

import PageOpenedClassRooms from "./pages/PageOpenedClassRooms";
import PageSchedule from "./pages/PageSchedule";

//list your routes here
export const routes = [
  { path: "/classroom-requests", element: <ListOrderRequestPage /> },
  { path: "/classroom-requests/:id", element: <PageOrderRequestDetail /> },
  { path: "/classroom-requests/create", element: <PageCreateOrderRequest /> },
  { path: "/profile/:id", element: <ProfilePage /> },
  { path: "/profile/:id/edit", element: <EditProfilePage /> },
  { path: "/collections", element: <CollectionPage /> },
  { path: "/collections/:slug", element: <CollectionPage /> },

  { path: "/todos", element: <TodoListPage /> },
  { path: "/login", element: <Login /> },
  { path: "/forgotpassword", element: <ForgotPassword /> },
  { path: "/changepassword", element: <ChangePassword /> },
  { path: "/register-tutor", element: <RegisterTutor /> },
  { path: "/create-classroom", element: <CreateClassroom /> },
  { path: "/class-list-parent", element: <ClassListParent /> },
  //loc
  { path: "/accountManager", element: <AccountManager /> },
  { path: "/AccountDetail/:id", element: <AccountDetail /> },
  { path: "/listClassManager", element: <ListClassManager /> },
  { path: "/ClassDetailManager/:id", element: <ClassDetail /> },
  { path: "/listTransactionManager", element: <Transaction /> },
  { path: "/transactionDetail/:id", element: <TransactionDetail /> },
  { path: "/addTransaction", element: <AddTransaction /> },
  { path: "/listStaffManager", element: <ListStaffManager /> },
  { path: "/addStaff", element: <AddStaff /> },

  { path: "/", element: <NewHomePage /> },
  { path: "*", element: <NotFound /> },

];
