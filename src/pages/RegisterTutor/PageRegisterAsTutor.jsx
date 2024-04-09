import React from "react";
import { useState } from "react";
import AccountSetup from "src/components/TutorRegistor/AccountSetup";
import CVTutor from "src/components/TutorRegistor/CVTutor";
import TutorInformation from "src/components/TutorRegistor/TutorInformation";
import SubMenu from "src/components/common/SubMenu";
import Layout from "src/components/layout/Layout";

const listSubMenu = [
  { id: "setup", label: "Account Setup" },
  { id: "information", label: "Your Information" },
  { id: "cv", label: "Upload CV" },
];

function PageRegisterAsTutor() {
  const [activeTab, setActiveTab] = useState("setup");
  return (
    <Layout>
      <div
        style={{
          scrollbarWidth: "none",
        }}
      >
        <SubMenu
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          listMenu={listSubMenu}
        />
        <div className="pt-5 mt-5 border-t border-gray">
          {activeTab === "setup" && (
            <AccountSetup setActiveTab={setActiveTab} />
          )}
          {activeTab === "information" && (
            <TutorInformation setActiveTab={setActiveTab} />
          )}
          {activeTab === "cv" && <CVTutor setActiveTab={setActiveTab} />}
        </div>
      </div>
    </Layout>
  );
}

export default PageRegisterAsTutor;
