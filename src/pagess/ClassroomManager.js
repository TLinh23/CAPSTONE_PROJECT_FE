import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/ClassroomManager.css';

const ClassroomManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const classes = [
    {
      id: 1,
      name: 'Math 101',
      tutor: 'Khang Nguyen',
      subject: 'Math',
      startDate: '10-01-2024',
      status: 'Active',
      grade: 5,
    },
    {
      id: 2,
      name: 'Elec 101',
      tutor: 'Trang Nguyen',
      subject: 'SSN',
      startDate: '10-01-2024',
      status: 'Suspend',
      grade: 5,
    },
    
  ];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredClasses = classes.filter(
    (classData) =>
      classData.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classData.tutor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classData.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="classroom-manager">
      <h2>Classroom management</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by classroom name, tutor or subject"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="class-list">
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Classroom name</th>
              <th>Tutor</th>
              <th>Subject</th>
              <th>Start Date</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredClasses.map((classData, index) => (
              <tr key={classData.id}>
                <td>{index + 1}</td>
                <td>{classData.name}</td>
                <td>{classData.tutor}</td>
                <td>{classData.subject}</td>
                <td>{classData.startDate}</td>
                <td>
                  <span className={`status ${classData.status.toLowerCase()}`}>
                    {classData.status}
                  </span>
                </td>
                <td>
                  <Link to={`/classDetail/${classData.id}`}>
                    <button>
                      <i className="fas fa-chevron-right"></i>
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassroomManager;