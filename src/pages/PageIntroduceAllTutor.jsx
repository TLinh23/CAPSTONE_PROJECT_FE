import React, { useState } from "react";
import { useQueries } from "react-query";
import { getListSubjects } from "src/apis/subject-module";
import TutorExploreItem from "src/components/Explore/TutorExploreItem";
import FilterDropDown from "src/components/common/FilterDropDown";
import Title from "src/components/common/Title";
import Layout from "src/components/layout/Layout";

function PageIntroduceAllTutor() {
  const [subjectSelected, setSubjectSelected] = useState(undefined);
  const [listAllSubjects, setListAllSubjects] = useState(undefined);

  useQueries([
    {
      queryKey: ["getListSubjects"],
      queryFn: async () => {
        const queryObj = {};
        queryObj["PagingRequest.CurrentPage"] = 1;
        queryObj["PagingRequest.PageSize"] = 99;

        const response = await getListSubjects(queryObj);
        setListAllSubjects(response?.data?.data);
        return response?.data;
      },
    },
  ]);

  return (
    <Layout>
      <div className="flex items-center justify-between gap-5">
        <Title>Explore All Tutors</Title>
        <FilterDropDown
          className="!w-[250px]"
          listDropdown={listAllSubjects?.items || []}
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
