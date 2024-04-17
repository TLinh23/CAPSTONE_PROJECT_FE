import React, { useState } from "react";
import { useQueries } from "react-query";
import { getListClass } from "src/apis/class-module";
import { getListSubjects } from "src/apis/subject-module";
import ClassroomExploreItem from "src/components/Explore/ClassroomExploreItem";
import FilterDropDown from "src/components/common/FilterDropDown";
import Pagination from "src/components/common/Pagination";
import SearchInput from "src/components/common/SearchInput";
import Title from "src/components/common/Title";
import Layout from "src/components/layout/Layout";
import { useSideBarContext } from "src/context/SideBarContext";
import useDebounce from "src/hooks/useDebounce";

function PageIntroduceAllClassrooms() {
  const { isOpenSideBar } = useSideBarContext();
  const [listAllSubjects, setListAllSubjects] = useState(undefined);
  const [listAllClass, setListAllClass] = useState(undefined);
  const [searchParam, setSearchParam] = useState("");
  const debouncedSearchValue = useDebounce(searchParam, 500);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);

  useQueries([
    {
      queryKey: ["getListSubjects"],
      queryFn: async () => {
        const queryObj = {};
        queryObj["PagingRequest.CurrentPage"] = 1;
        queryObj["PagingRequest.PageSize"] = 99;
        queryObj["Status"] = "CREATED";

        const response = await getListSubjects(queryObj);
        setListAllSubjects(response?.data?.data);
        return response?.data;
      },
    },
    {
      queryKey: ["getListClassroom", page, limit, debouncedSearchValue],
      queryFn: async () => {
        const queryObj = {};
        queryObj["PagingRequest.CurrentPage"] = page;
        queryObj["PagingRequest.PageSize"] = limit;
        queryObj["Status"] = "ACTIVE";
        if (debouncedSearchValue) {
          queryObj["SearchWord"] = debouncedSearchValue;
        }
        const response = await getListClass(queryObj);
        setListAllClass(response?.data?.data);
        return response?.data;
      },
      enabled: !!page,
    },
  ]);

  return (
    <Layout>
      <div className="flex items-center justify-between gap-5">
        <Title>Explore All Classrooms</Title>
      </div>
      <div className="mt-5">
        <SearchInput
          placeholder="Search by name"
          onChange={(e) => setSearchParam(e.target.value)}
          value={searchParam}
        />
      </div>
      <div className="mt-5 mb-5 bg-white block-border">
        <div
          className={`grid ${
            isOpenSideBar ? "grid-cols-3" : "grid-cols-4"
          } gap-4`}
        >
          {listAllClass?.items?.map((item) => (
            <ClassroomExploreItem key={item?.classId} item={item} />
          ))}
        </div>
      </div>

      <Pagination
        pageSize={limit}
        setPageSize={setLimit}
        currentPage={page}
        setCurrentPage={setPage}
        totalItems={listAllClass?.pagination?.totalItem}
      />
    </Layout>
  );
}

export default PageIntroduceAllClassrooms;
