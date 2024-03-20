// ClassroomManager.js
import React, { useState } from 'react';
//import './ClassroomManager.css';

const mockData = [
  { id: 1, name: 'Math 101', tutor: 'Khang Nguyen', subject: 'Math', startDate: '10-01-2024', status: 'Active' },
  { id: 2, name: 'Literature level 2', tutor: 'Trang Pham', subject: 'Literature', startDate: '22-11-2023', status: 'Suspended' },
  // Thêm dữ liệu lớp học khác tại đây
];

const Contact = () => {
  const [classrooms, setClassrooms] = useState(mockData);
  const [filter, setFilter] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setFilter(value);
  };

  const filteredClassrooms = classrooms.filter(
    (classroom) =>
      classroom.name.toLowerCase().includes(filter) ||
      classroom.tutor.toLowerCase().includes(filter) ||
      classroom.subject.toLowerCase().includes(filter)
  );

  return (
    <div className="classroom-manager">
      <input
        type="text"
        placeholder="Search by classroom name, tutor or subject"
        onChange={handleSearch}
      />
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Classroom name</th>
            <th>Tutor</th>
            <th>Subject</th>
            <th>Start Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredClassrooms.map((classroom, index) => (
            <tr key={classroom.id}>
              <td>{index + 1}</td>
              <td>{classroom.name}</td>
              <td>{classroom.tutor}</td>
              <td>{classroom.subject}</td>
              <td>{classroom.startDate}</td>
              <td>{classroom.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Contact;
