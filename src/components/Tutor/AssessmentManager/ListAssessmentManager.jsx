import React, { useState } from "react";
import FilterDropDown from "../../common/FilterDropDown";
import Pagination from "../../common/Pagination";
import SearchInput from "../../common/SearchInput";
import Table from "../../common/Table";
import Title from "../../common/Title";
import useDebounce from "src/hooks/useDebounce";
import ShowDetail from "src/components/common/ShowDetail";
import PrimaryBtn from "src/components/common/PrimaryBtn";
import RenderStatus from "src/components/common/RenderStatus";
import { Link } from "react-router-dom";
import ShowPasswordIcon from "src/components/icons/ShowPasswordIcon";
import PopupTemplate from "src/components/common/PopupTemplate";
import PrimaryInput from "src/components/common/PrimaryInput";
import PrimaryTextArea from "src/components/common/PrimaryTextArea";

const mockData = [
  {
    id: 1,
    student: "Nguyen Van Nam",
    class: "Toan",
    score: "A+",
    comment: "Thực hiện xuất sắc!",
    status: "CREATED",
  },
  {
    id: 2,
    student: "Tran Thi Ba",
    class: "Tieng Anh",
    score: "B",
    comment: "Nỗ lực tốt, hãy tiếp tục!",
    status: "CREATED",
  },
  {
    id: 3,
    student: "Le Van Hoi",
    class: "Khoa Hoc",
    score: "A",
    comment: "Làm rất tốt!",
    status: "CREATED",
  },
  {
    id: 4,
    student: "Hoang Thi D",
    class: "Lich Su",
    score: "B-",
    comment: "Cần cải thiện trong việc tham gia.",
    status: "CREATED",
  },
  {
    id: 5,
    student: "Pham Van Bach",
    class: "Dia Li",
    score: "C+",
    comment: "Hiệu suất trung bình.",
    status: "CREATED",
  },
  {
    id: 6,
    student: "Vo Thi Van",
    class: "Vat Ly",
    score: "A",
    comment: "Công việc xuất sắc!",
    status: "CREATED",
  },
  {
    id: 7,
    student: "Dinh Van Giang",
    class: "Hoa Hoc",
    score: "B+",
    comment: "Hiểu biết tốt về các khái niệm.",
    status: "CREATED",
  },
  {
    id: 8,
    student: "Ngo Thi Huuong",
    class: "My Thuat",
    score: "C",
    comment: "Có thể cải thiện sự sáng tạo.",
    status: "CREATED",
  },
  {
    id: 9,
    student: "Duong Van Nam",
    class: "Âm Nhạc",
    score: "A-",
    comment: "Kỹ năng âm nhạc xuất sắc!",
    status: "CREATED",
  },
  {
    id: 10,
    student: "Ho Thi Kinh",
    class: "The Duc",
    score: "B",
    comment: "Tham gia tốt trong các hoạt động.",
    status: "CREATED",
  },
];

function ListAssessmentManager() {
  const [listAssessment, setListAssessment] = useState(undefined);
  const [isFilterSelected, setIsFilterSelected] = useState(false);
  const [searchParam, setSearchParam] = useState("");
  const debouncedSearchValue = useDebounce(searchParam, 500);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [data, setData] = useState([]);

  return (
    <div className="p-4 mx-auto">
      <div className="flex items-center justify-between gap-3">
        <Title>Class Assessment</Title>
        <Link to={`/assessesments/create`}>
          <PrimaryBtn className="!w-[220px]">Create Assessment</PrimaryBtn>
        </Link>
      </div>

      <div className="mt-5 bg-white table-style block-border">
        <Table
          pageSizePagination={limit}
          columns={transactionColumns}
          data={mockData || []}
        />
      </div>

      <Pagination
        pageSize={limit}
        setPageSize={setLimit}
        currentPage={page}
        setCurrentPage={setPage}
        totalItems={10}
      />
    </div>
  );
}

export default ListAssessmentManager;

const transactionColumns = [
  {
    Header: " ",
    columns: [
      {
        Header: "No",
        accessor: "id",
      },
      {
        Header: "Student",
        accessor: "student",
      },
      {
        Header: "Class",
        accessor: "class",
      },
      {
        Header: "Score",
        accessor: "score",
      },
      {
        Header: "Comment",
        accessor: "comment",
      },
      {
        Header: "Status",
        accessor: (data) => (
          <RenderStatus status={data.status}>{data.status}</RenderStatus>
        ),
      },
      {
        Header: " ",
        accessor: (data) => <RenderAction data={data} />,
      },
    ],
  },
];

const RenderAction = ({ data }) => {
  const [showDialog, setShowDialog] = useState(false);
  return (
    <div>
      <ShowPasswordIcon
        onClick={() => {
          setShowDialog(true);
        }}
      />
      <PopupTemplate
        title="Assessment Detail"
        setShowDialog={setShowDialog}
        showDialog={showDialog}
      >
        <div className="grid grid-cols-37 max-w-[1000px] mt-5 gap-x-5 gap-y-3 items-center">
          <div>Student</div>
          <FilterDropDown
            listDropdown={[1, 2, 3]}
            showing={undefined}
            setShowing={undefined}
            textDefault="Nam Ha"
          />
          <div>Class</div>
          <FilterDropDown
            listDropdown={[1, 2, 3]}
            showing={undefined}
            setShowing={undefined}
            textDefault="Toan 3"
          />
          <div>Score</div>
          <PrimaryInput placeholder="Enter score rate" value={"8"} />
          <div>Coment</div>
          <PrimaryTextArea
            rows={5}
            placeholder="Enter comment"
            value="Lam bai tap rat tot"
          />
        </div>
      </PopupTemplate>
    </div>
  );
};
