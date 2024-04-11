import React, { useState } from "react";
import TutorExploreItem from "src/components/Tutors/TutorExploreItem";
import FilterDropDown from "src/components/common/FilterDropDown";
import Title from "src/components/common/Title";
import Layout from "src/components/layout/Layout";

function PageIntroduceAllTutor() {
  const [subjectSelected, setSubjectSelected] = useState(undefined);
  return (
    <Layout>
      <div className="flex items-center justify-between gap-5">
        <Title>Explore All Tutors</Title>
        <FilterDropDown
          className="w-[350px]"
          listDropdown={[]}
          showing={subjectSelected}
          setShowing={setSubjectSelected}
          textDefault="Select subject"
        />
      </div>
      <div className="mt-5 bg-white block-border">
        <div className="grid grid-cols-4 gap-4">
          <TutorExploreItem />
          <TutorExploreItem />
          <TutorExploreItem />
          <TutorExploreItem />
        </div>
      </div>
    </Layout>
  );
}

export default PageIntroduceAllTutor;
