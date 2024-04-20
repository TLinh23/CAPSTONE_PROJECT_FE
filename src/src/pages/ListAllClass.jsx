import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import SearchInput from '../components/common/SearchInput';
import Pagination from '../components/common/Pagination';
import Title from '../components/common/Title';
import useDebounce from 'src/hooks/useDebounce';
import PrimaryBtn from '../components/common/PrimaryBtn';

// Dữ liệu giả định cho các lớp học
const mockClasses = [
  {
    id: 1,
    name: "Mathematics 101",
    subject: "Mathematics",
    description: "Introduction to basic mathematics concepts.",
    price: "200.000 VND",
  },
  {
    id: 2,
    name: "Literature of the 19th Century",
    subject: "Literature",
    description: "Exploring the depth of 19th-century literature.",
    price: "250.000 VND",
  },
  {
    id: 1,
    name: "Mathematics 101",
    subject: "Mathematics",
    description: "Introduction to basic mathematics concepts.",
    price: "200.000 VND",
  },
  {
    id: 2,
    name: "Literature of the 19th Century",
    subject: "Literature",
    description: "Exploring the depth of 19th-century literature.",
    price: "250.000 VND",
  },
  {
    id: 1,
    name: "Mathematics 101",
    subject: "Mathematics",
    description: "Introduction to basic mathematics concepts.",
    price: "200.000 VND",
  },
  {
    id: 2,
    name: "Literature of the 19th Century",
    subject: "Literature",
    description: "Exploring the depth of 19th-century literature.",
    price: "250.000 VND",
  },
  {
    id: 1,
    name: "Mathematics 101",
    subject: "Mathematics",
    description: "Introduction to basic mathematics concepts.",
    price: "200.000 VND",
  },
  {
    id: 2,
    name: "Literature of the 19th Century",
    subject: "Literature",
    description: "Exploring the depth of 19th-century literature.",
    price: "250.000 VND",
  },
  {
    id: 1,
    name: "Mathematics 101",
    subject: "Mathematics",
    description: "Introduction to basic mathematics concepts.",
    price: "200.000 VND",
  },
  {
    id: 2,
    name: "Literature of the 19th Century",
    subject: "Literature",
    description: "Exploring the depth of 19th-century literature.",
    price: "250.000 VND",
  },
];

function ListAllClass() {
  const [searchParam, setSearchParam] = useState('');
  const debouncedSearchValue = useDebounce(searchParam, 500);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6); // Mỗi trang chỉ chứa tối đa 6 lớp

  // Tính toán dữ liệu hiển thị dựa trên searchParam, page và limit
  const filteredClasses = mockClasses.filter((classItem) =>
    classItem.name.toLowerCase().includes(debouncedSearchValue.toLowerCase())
  );
  const paginatedClasses = filteredClasses.slice((page - 1) * limit, page * limit);

  return (
    <Layout>
      <div className="container p-4 mx-auto">
        <Title>List All Classes</Title>
        <div className="flex flex-col gap-4 py-5 md:items-center md:flex-row md:justify-end">
          <SearchInput
            placeholder="Search by class name or subject"
            onChange={(e) => setSearchParam(e.target.value)}
            value={searchParam}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedClasses.map((classItem) => (
            <div key={classItem.id} className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-semibold">{classItem.name}</h3>
              <p className="text-sm">{classItem.description}</p>
              <p className="text-sm">Subject: {classItem.subject}</p>
              <p className="text-lg font-bold">Price: {classItem.price}</p>
              <PrimaryBtn onClick={() => alert('You have joined the class!')}>Join Class</PrimaryBtn>
            </div>
          ))}
        </div>

        <Pagination
          pageSize={limit}
          setPageSize={setLimit}
          currentPage={page}
          setCurrentPage={setPage}
          totalItems={filteredClasses.length}
        />
      </div>
    </Layout>
  );
}

export default ListAllClass;
