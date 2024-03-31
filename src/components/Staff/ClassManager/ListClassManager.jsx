// File: ListClassManager.jsx
import React, { useState, useEffect } from "react";
import Layout from "../../layout/Layout";
import SearchInput from "../../common/SearchInput";
import Table from "../../common/Table"; 

function ListClassManager() {
  const [searchTerm, setSearchTerm] = useState("");
  const [pageSize, setPageSize] = useState(10); // Giả sử pageSize mặc định là 10
  // Dữ liệu giả định cho danh sách lớp học
  const [classrooms, setClassrooms] = useState([
    { id: 1, name: "Math 101", tutor: "Khang Nguyen", subject: "Math", startDate: "10-01-2024", status: "Active" },
    { id: 2, name: "Literature level 2", tutor: "Trang Pham", subject: "Literature", startDate: "22-11-2023", status: "Suspended" },
    // Thêm dữ liệu giả định khác tại đây
  ]);

  // Hàm lọc dữ liệu dựa trên searchTerm
  const getFilteredClassrooms = () => {
    return classrooms.filter(classroom =>
      classroom.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classroom.tutor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classroom.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Cập nhật danh sách lớp học khi searchTerm thay đổi
  useEffect(() => {
    setClassrooms(getFilteredClassrooms());
  }, [searchTerm]);

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Classroom List</h1>
          <SearchInput
            placeholder="Search by classroom name, tutor or subject"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Table
          columns={[
            { title: "No.", field: "id" },
            { title: "Classroom name", field: "name" },
            { title: "Tutor", field: "tutor" },
            { title: "Subject", field: "subject" },
            { title: "Start Date", field: "startDate" },
            { title: "Status", field: "status" },
          ]}
          data={getFilteredClassrooms()}
          pageSizePagination={pageSize} // Thêm prop này
        />
      </div>
    </Layout>
  );
}

export default ListClassManager;
