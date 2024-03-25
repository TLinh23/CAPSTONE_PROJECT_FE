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
