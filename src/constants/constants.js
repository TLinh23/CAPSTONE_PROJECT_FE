import ClassRoomIcon from "src/components/icons/ClassRoomIcon";
import { TUTOR_HREF } from "./navbarConstant";
import React from "react";

export const mainMenu = [
  {
    id: 1,
    name: "Classrooms",
    href: TUTOR_HREF.CLASSROOM,
    icon: <ClassRoomIcon />,
    listActiveRouter: [TUTOR_HREF.CLASSROOM],
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
