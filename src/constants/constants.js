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
    href: TUTOR_HREF.CLASSROOM,
    icon: <ClassRoomIcon />,
    listActiveRouter: [TUTOR_HREF.CLASSROOM],
  },
];

export const TUTOR_MENU = [
  {
    id: 1,
    name: "List Request",
    href: TUTOR_HREF.CLASSROOM,
    icon: <RequestIcon />,
    listActiveRouter: [TUTOR_HREF.CLASSROOM],
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
    name: "List Transactions",
    href: TUTOR_HREF.LIST_TRANSACTION,
    icon: <TransactionIcon />,
    listActiveRouter: [TUTOR_HREF.LIST_TRANSACTION],
  },
];

export const PARENT_MENU = [
  {
    id: 1,
    name: "List Student",
    href: PARENT_HREF.STUDENT,
    icon: <RequestIcon />,
    listActiveRouter: [PARENT_HREF.STUDENT],
  },
  {
    id: 2,
    name: "List Tutor",
    href: TUTOR_HREF.SCHEDULE,
    icon: <ProfileIcon />,
    listActiveRouter: [TUTOR_HREF.SCHEDULE],
  },
  {
    id: 3,
    name: "List Assessment",
    href: TUTOR_HREF.LIST_TRANSACTION,
    icon: <AssetIcon />,
    listActiveRouter: [TUTOR_HREF.LIST_TRANSACTION],
  },
  {
    id: 4,
    name: "Schedule",
    href: TUTOR_HREF.LIST_TRANSACTION,
    icon: <ScheduleIcon />,
    listActiveRouter: [TUTOR_HREF.LIST_TRANSACTION],
  },
];

export const STAFF_MENU = [
  {
    id: 1,
    name: "List Classroom",
    href: TUTOR_HREF.SCHEDULE,
    icon: <ProfileIcon />,
    listActiveRouter: [TUTOR_HREF.SCHEDULE],
  },
  {
    id: 2,
    name: "Transaction",
    href: TUTOR_HREF.LIST_TRANSACTION,
    icon: <TransactionIcon />,
    listActiveRouter: [TUTOR_HREF.LIST_TRANSACTION],
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
    href: STAFF_HREF.MANAGE_SUBJECT,
    icon: <ProfileIcon />,
    listActiveRouter: [STAFF_HREF.MANAGE_SUBJECT],
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
  ADMIN: "admin",
  STAFF: "staff",
  TUTOR: "tutor",
  PARENT: "parent",
  STUDENT: "student",
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

export const LIST_STATUS_FILTER = [
  { id: 1, key: "CREATED", value: "Created" },
  { id: 2, key: "REMOVED", value: "Removed" },
];

export const LIST_GENDER_VALUE = [
  { id: 1, value: "MALE", name: "Male" },
  { id: 2, value: "FEMALE", name: "Female" },
];
