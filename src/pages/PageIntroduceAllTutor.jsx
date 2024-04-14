import React, { useState } from "react";
import { useQueries } from "react-query";
import { getListSubjects } from "src/apis/subject-module";
import { getExploreTutors } from "src/apis/tutor-module";
import TutorExploreItem from "src/components/Explore/TutorExploreItem";
import FilterDropDown from "src/components/common/FilterDropDown";
import Pagination from "src/components/common/Pagination";
import Title from "src/components/common/Title";
import Layout from "src/components/layout/Layout";
import { useSideBarContext } from "src/context/SideBarContext";

function PageIntroduceAllTutor() {
  const { isOpenSideBar } = useSideBarContext();
  const [subjectSelected, setSubjectSelected] = useState(undefined);
  const [listAllSubjects, setListAllSubjects] = useState(undefined);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [listExplores, setListExplores] = useState(undefined);

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
    {
      queryKey: ["getExploreTutors", page, limit, subjectSelected],
      queryFn: async () => {
        const queryObj = {};
        queryObj["PagingRequest.CurrentPage"] = page;
        queryObj["PagingRequest.PageSize"] = limit;
        if (subjectSelected) {
          queryObj["subjectName"] = subjectSelected?.subjectName;
        }

        const response = await getExploreTutors(queryObj);
        setListExplores(response?.data?.data);
        return response?.data;
      },
      enabled: !!page && !!limit,
    },
  ]);

  console.log("listExplores: ", listExplores);
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
      <div className="mt-5 mb-5 bg-white block-border">
        <div
          className={`grid ${
            isOpenSideBar ? "grid-cols-3" : "grid-cols-4"
          } gap-4`}
        >
          {listExplores?.items?.map((item, index) => (
            <TutorExploreItem key={index} item={item} />
          ))}
        </div>
      </div>

      <Pagination
        pageSize={limit}
        setPageSize={setLimit}
        currentPage={page}
        setCurrentPage={setPage}
        totalItems={listExplores?.pagination?.totalItem}
      />
    </Layout>
  );
}

export default PageIntroduceAllTutor;
