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
import ListAssessmentManager from "./components/Tutor/AssessmentManager/ListAssessmentManager"
import RegisterAsParent from "./pages/RegisterParent/RegisterAsParent"
//trang account detail
import AccountDetail from "./pages/PageAccountDetail";
import ClassDetail from "./pages/PageClassDetail";
import TransactionDetail from "./pages/PageTransactionDetail";
import ListAllClass from "./pages/ListAllClass";
import TutorFee from "./pages/TutorFee";

import PageOpenedClassRooms from "./pages/PageOpenedClassRooms";
import PageSchedule from "./pages/PageSchedule";
import PageManageSubjects from "./pages/PageManageSubjects";
import PageTutorClassroomDetail from "./pages/PageTutorClassroomDetail";
import PageTutorListStudent from "./pages/PageTutorListStudent";
import PageCreateNewStudentInClass from "./pages/PageCreateNewStudentInClass";


//list your routes here
export const routes = [
  { path: "/classroom-requests", element: <ListOrderRequestPage /> },
  { path: "/classroom-requests/:id", element: <PageOrderRequestDetail /> },
  { path: "/classroom-requests/create", element: <PageCreateOrderRequest /> },
  { path: "/profile/:id", element: <ProfilePage /> },
  { path: "/profile/:id/edit", element: <EditProfilePage /> },
  { path: "/manage-subjects", element: <PageManageSubjects /> },
  { path: "/collections", element: <CollectionPage /> },
  { path: "/collections/:slug", element: <CollectionPage /> },
  { path: "/opended-classrooms", element: <PageOpenedClassRooms /> },
  { path: "/schedule", element: <PageSchedule /> },
  { path: "/tutor-classrooms/:id", element: <PageTutorClassroomDetail /> },
  { path: "/tutor-classrooms/:id/students", element: <PageTutorListStudent /> },
  {
    path: "/tutor-classrooms/:id/students/create",
    element: <PageCreateNewStudentInClass />,
  },

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
  { path: "/lissAllClass", element: <ListAllClass /> },
  { path: "/tutorFee", element: <TutorFee /> },
  { path: "/listAssessmentManager", element: <ListAssessmentManager /> },
  { path: "/register-parent", element: <RegisterAsParent /> },

  

  { path: "/", element: <NewHomePage /> },
  { path: "*", element: <NotFound /> },
];
