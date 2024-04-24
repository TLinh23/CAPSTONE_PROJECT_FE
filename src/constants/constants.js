import ClassRoomIcon from "src/components/icons/ClassRoomIcon";
import {
  ADMIN_HREF,
  PARENT_HREF,
  STAFF_HREF,
  TUTOR_HREF,
} from "./navbarConstant";
import React from "react";
import ScheduleIcon from "src/components/icons/ScheduleIcon";
import RequestIcon from "src/components/icons/RequestIcon";
import TransactionIcon from "src/components/icons/TransactionIcon";
import AssetIcon from "src/components/icons/AssetIcon";
import ProfileIcon from "src/components/icons/ProfileIcon";
import SubjectIcon from "src/components/icons/SubjectIcon";

export const mainMenu = [
  {
    id: 1,
    name: "Classrooms",
    icon: <ClassRoomIcon />,
  },
];

export const TUTOR_MENU = [
  {
    id: 1,
    name: "List Request",
    href: TUTOR_HREF.REQUEST,
    icon: <RequestIcon />,
    listActiveRouter: [TUTOR_HREF.REQUEST],
  },
  {
    id: 2,
    name: "Schedule",
    href: TUTOR_HREF.SCHEDULE,
    icon: <ScheduleIcon />,
    listActiveRouter: [TUTOR_HREF.SCHEDULE],
  },
  {
    id: 3,
    name: "Transactions",
    href: TUTOR_HREF.LIST_TRANSACTION,
    icon: <TransactionIcon />,
    listActiveRouter: [TUTOR_HREF.LIST_TRANSACTION],
  },
];

export const PARENT_MENU = [
  {
    id: 1,
    name: "List Classroom",
    href: PARENT_HREF.CLASSROOM,
    icon: <RequestIcon />,
    listActiveRouter: [PARENT_HREF.CLASSROOM],
  },
  {
    id: 2,
    name: "List Request",
    href: PARENT_HREF.REQUEST,
    icon: <ProfileIcon />,
    listActiveRouter: [PARENT_HREF.REQUEST],
  },
  {
    id: 3,
    name: "List Assessment",
    href: PARENT_HREF.ASSESMENTS,
    icon: <AssetIcon />,
    listActiveRouter: [PARENT_HREF.ASSESMENTS],
  },
  {
    id: 4,
    name: "Schedule",
    href: PARENT_HREF.SCHEDULE,
    icon: <ScheduleIcon />,
    listActiveRouter: [PARENT_HREF.SCHEDULE],
  },
];

export const STAFF_MENU = [
  {
    id: 1,
    name: "List Classroom",
    href: STAFF_HREF.MANAGE_CLASSROOM,
    icon: <ProfileIcon />,
    listActiveRouter: [STAFF_HREF.MANAGE_CLASSROOM],
  },
  {
    id: 2,
    name: "Transaction",
    href: STAFF_HREF.LIST_TRANSACTION,
    icon: <TransactionIcon />,
    listActiveRouter: [STAFF_HREF.LIST_TRANSACTION],
  },
  {
    id: 3,
    name: "List Subject",
    href: STAFF_HREF.MANAGE_SUBJECT,
    icon: <SubjectIcon />,
    listActiveRouter: [STAFF_HREF.MANAGE_SUBJECT],
  },
  {
    id: 4,
    name: "List Account",
    href: STAFF_HREF.MANAGE_ACCOUNTS,
    icon: <ProfileIcon />,
    listActiveRouter: [STAFF_HREF.MANAGE_ACCOUNTS],
  },
];

export const ADMIN_MENU = [
  {
    id: 1,
    name: "List Staff",
    href: ADMIN_HREF.LIST_STAFF,
    icon: <ProfileIcon />,
    listActiveRouter: [ADMIN_HREF.LIST_STAFF],
  },
];

export const ROLE_NAME = {
  ADMIN: "ADMIN",
  STAFF: "STAFF",
  TUTOR: "TUTOR",
  PARENT: "PARENT",
  STUDENT: "STUDENT",
};

export const LIST_CLASS_LEVEL_DEFAULT = [
  { id: 1, value: "1", name: "1" },
  { id: 2, value: "2", name: "2" },
  { id: 3, value: "3", name: "3" },
  { id: 4, value: "4", name: "4" },
  { id: 5, value: "5", name: "5" },
  { id: 6, value: "6", name: "6" },
  { id: 7, value: "7", name: "7" },
  { id: 8, value: "8", name: "8" },
  { id: 9, value: "9", name: "9" },
  { id: 10, value: "10", name: "10" },
  { id: 11, value: "11", name: "11" },
  { id: 12, value: "12", name: "12" },
];

export const STUDENT_STATUS = {
  CREATED: "CREATED",
  REMOVED: "REMOVED",
};

export const LIST_STATUS_FILTER = [
  { id: 1, key: "CREATED", value: "Created" },
  { id: 2, key: "DELETED", value: "Deleted" },
];

export const LIST_GENDER_VALUE = [
  { id: 1, value: "MALE", name: "Male" },
  { id: 2, value: "FEMALE", name: "Female" },
];

export const LIST_CLASS_FILTER = [
  { id: 1, key: "ACTIVE", value: "Active" },
  { id: 2, key: "SUSPEND", value: "Suspend" },
];

export const LIST_REQUEST_TYPE_FILTER = [
  { id: 1, key: "JOIN", value: "Join" },
  { id: 2, key: "OPEN", value: "Open" },
];

export const LIST_REQUEST_STATUS_FILTER = [
  { id: 1, key: "PENDING", value: "Pending" },
  { id: 2, key: "ACCEPTED", value: "Accepted" },
  { id: 3, key: "REJECTED", value: "Rejected" },
  { id: 4, key: "CANCELLED", value: "Cancelled" },
];

export const MODAL_DIRECTION = {
  LEFT: "left-0",
  RIGHT: "right-0",
};

export const DROPDOWN_SUBMENU_ANIMATE = {
  enter: {
    opacity: 1,
    rotateX: 0,
    transition: {
      duration: 0.2,
    },
    display: "block",
  },
  exit: {
    opacity: 0,
    rotateX: -15,
    transition: {
      duration: 0.2,
      delay: 0.05,
    },
    transitionEnd: {
      display: "none",
    },
  },
};
