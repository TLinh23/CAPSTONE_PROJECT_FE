import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../css/ClassDetail.css';

const ClassDetail = () => {
  const { id } = useParams();
  const [classData, setClassData] = useState({
    id: id,
    name: 'Math 101',
    tutor: 'Khang Nguyen',
    subject: 'Math',
    startDate: '10-01-2024',
    status: 'Active',
    grade: 5,
  });

  const [students, setStudents] = useState([
    { avatar: 'avatar', name: 'Huyen Trang' },
    { avatar: 'avatar', name: 'Hai Pham' },
    { avatar: 'avatar', name: 'Huyen Trang' },
    { avatar: 'avatar', name: 'Hai Pham' },
    { avatar: 'avatar', name: 'Huyen Trang' },
    { avatar: 'avatar', name: 'Hai Pham' },
    { avatar: 'avatar', name: 'Huyen Trang' },
    { avatar: 'avatar', name: 'Hai Pham' },
    { avatar: 'avatar', name: 'Huyen Trang' },
    { avatar: 'avatar', name: 'Hai Pham' },
    { avatar: 'avatar', name: 'Huyen Trang' },
    { avatar: 'avatar', name: 'Hai Pham' },
    { avatar: 'avatar', name: 'Huyen Trang' },
    { avatar: 'avatar', name: 'Hai Pham' },
    { avatar: 'avatar', name: 'Huyen Trang' },
    { avatar: 'avatar', name: 'Hai Pham' },
    { avatar: 'avatar', name: 'Huyen Trang' },
    { avatar: 'avatar', name: 'Hai Pham' },
    { avatar: 'avatar', name: 'Huyen Trang' },
    { avatar: 'avatar', name: 'Hai Pham' },
    { avatar: 'avatar', name: 'Huyen Trang' },
    { avatar: 'avatar', name: 'Hai Pham' },
    { avatar: 'avatar', name: 'Huyen Trang' },
    { avatar: 'avatar', name: 'Hai Pham' },
    // ... thêm phụ huynh ở đây
  ]);

  const toggleStatus = () => {
    setClassData((prevClassData) => ({
      ...prevClassData,
      status: prevClassData.status === 'Active' ? 'Suspended' : 'Active',
    }));
  };

  return (
    <div className="class-detail">
      <div className="class-info">
        <h3>Class name: {classData.name}</h3>
        <p>
          Status:{' '}
          <span className={`status ${classData.status.toLowerCase()}`}>
            {classData.status}
          </span>
        </p>
        <p>Started Date: {classData.startDate}</p>
        <p>Class Description:</p>
        <p>Tutor: {classData.tutor}</p>
        <p>Subject: {classData.subject}</p>
        <p>Grade: {classData.grade}</p>
        <button
          className={`status-button ${classData.status.toLowerCase()}`}
          onClick={toggleStatus}
        >
          {classData.status === 'Active' ? 'Suspend' : 'Activate'}
        </button>
      </div>
      <div className="student-list">
  <h4>List of Parents</h4>
  <ul>
    {students.map((student, index) => (
      <li key={index}>
        <img src={student.avatar} alt="Parent Avatar" className="avatar" />
        <span className="student-name">{student.name}</span>
      </li>
    ))}
  </ul>
</div>
    </div>
  );
};

export default ClassDetail;
