import React from "react";
import { useState } from "react";
import ProfileHeader from "src/components/Profile/ProfileHeader";
import TutorCreateClassroomConfirm from "src/components/Tutor/CreateClassroom/TutorCreateClassroomConfirm";
import TutorCreateClassroomInfor from "src/components/Tutor/CreateClassroom/TutorCreateClassroomInfor";
import TutorCreateClassroomTime from "src/components/Tutor/CreateClassroom/TutorCreateClassroomTime";
import SubMenu from "src/components/common/SubMenu";
import Layout from "src/components/layout/Layout";

const listSubMenu = [
  { id: "information", label: "Classroom Info" },
  { id: "time", label: "Time" },
  { id: "confirm", label: "Confirm" },
];

function PageTutorCreateClassroom() {
  const [activeTab, setActiveTab] = useState("information");
  const [classRoomDetail, setClassRoomDetail] = useState(undefined);
  const [sessionStart, setSessionStart] = useState("");
  const [sessionEnd, setSessionEnd] = useState("");
  const [listLevels, setListLevels] = useState([]);
  const [dayOfWeek, setDayOfWeek] = useState(undefined);
  const [isConfirmCreated, setIsConfirmCreated] = useState(false);

  return (
    <Layout>
      <ProfileHeader title="Create Classroom" />
      <SubMenu
        className="mt-5"
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        listMenu={listSubMenu}
      />
      <div className="pt-5 mt-5 border-t border-gray">
        {activeTab === "information" && (
          <TutorCreateClassroomInfor
            setActiveTab={setActiveTab}
            classRoomDetail={classRoomDetail}
            setClassRoomDetail={setClassRoomDetail}
          />
        )}
        {activeTab === "time" && (
          <TutorCreateClassroomTime
            setActiveTab={setActiveTab}
            listLevels={listLevels}
            setListLevels={setListLevels}
            sessionStart={sessionStart}
            setSessionStart={setSessionStart}
            sessionEnd={sessionEnd}
            setSessionEnd={setSessionEnd}
            dayOfWeek={dayOfWeek}
            setDayOfWeek={setDayOfWeek}
          />
        )}
        {activeTab === "confirm" && (
          <TutorCreateClassroomConfirm
            classRoomDetail={classRoomDetail}
            setClassRoomDetail={setClassRoomDetail}
            isConfirmCreated={isConfirmCreated}
            setIsConfirmCreated={setIsConfirmCreated}
            listLevels={listLevels}
          />
        )}
      </div>
    </Layout>
  );
}

export default PageTutorCreateClassroom;
