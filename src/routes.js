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
import PageOrderRequestDetail from "./pages/PageOrderRequestDetail";
import PageCreateOrderRequest from "./pages/PageCreateOrderRequest";
import AccountManager from "./components/Staff/AccountManager/ListAccountManager";
import ListClassManager from "./components/Staff/ClassManager/ListClassManager";
import Transaction from "./components/Staff/TransactionManager/Transaction";
import AddTransaction from "./components/Staff/TransactionManager/AddTransaction";
import ListStaffManager from "./components/Admin/StaffManager/ListStaffManager";
import AddStaff from "./components/Admin/StaffManager/AddStaff";
import AddAssessment from "./components/Tutor/AssessmentManager/AddAssessment";

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
import PageRegisterAsTutor from "./pages/RegisterTutor/PageRegisterAsTutor";
import PageIntroduceAllTutor from "./pages/PageIntroduceAllTutor";
import PageRegisterAsParent from "./pages/RegisterParent/PageRegisterAsParent";
import PageListTutorClassroom from "./pages/PageListTutorClassroom";
import PageTutorCreateClassroom from "./pages/PageTutorCreateClassroom";
import PageEditTutorClassroomDetail from "./pages/PageEditTutorClassroomDetail";
import PageListParentClassroom from "./pages/PageListParentClassroom";
import PageAssessDetail from "./pages/PageAssessDetail";
import PageListAssessment from "./pages/PageListAssessment";
import PageIntroduceAllClassrooms from "./pages/PageIntroduceAllClassrooms";

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
  {
    path: "/tutor-classrooms/:id/edit",
    element: <PageEditTutorClassroomDetail />,
  },
  { path: "/tutor-classrooms/:id/students", element: <PageTutorListStudent /> },
  {
    path: "/tutor-classrooms/:id/students/create",
    element: <PageCreateNewStudentInClass />,
  },
  {
    path: "/tutors",
    element: <PageIntroduceAllTutor />,
  },
  {
    path: "/classrooms",
    element: <PageIntroduceAllClassrooms />,
  },
  { path: "/register-parent", element: <PageRegisterAsParent /> },
  { path: "/tutor-classrooms", element: <PageListTutorClassroom /> },
  { path: "/tutor-create-classroom", element: <PageTutorCreateClassroom /> },

  { path: "/todos", element: <TodoListPage /> },
  { path: "/login", element: <Login /> },
  { path: "/forgotpassword", element: <ForgotPassword /> },
  { path: "/changepassword", element: <ChangePassword /> },
  { path: "/register-tutor", element: <PageRegisterAsTutor /> },

  { path: "/parent-classrooms", element: <PageListParentClassroom /> },

  { path: "/assessesments", element: <PageListAssessment /> },
  { path: "/assessesments/:id", element: <PageAssessDetail /> },

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
  { path: "/addAssess", element: <AddAssessment /> },

  { path: "/", element: <NewHomePage /> },
  { path: "*", element: <NotFound /> },
];
