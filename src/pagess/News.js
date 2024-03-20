// ClassManager.js
import React, { useState } from 'react';
//import './ClassManager.css';
import Modal from './Modal';

const mockClassData = [
  { id: 1, title: 'Lớp 1', description: 'Mô tả lớp 1', subject: 'Toán', createDate: '2023-03-14', status: 'Active', price: '$200.000' },
  { id: 1, title: 'Lớp 1', description: 'Mô tả lớp 1', subject: 'Toán', createDate: '2023-03-14', status: 'Active', price: '$200.000' },
  { id: 1, title: 'Lớp 1', description: 'Mô tả lớp 1', subject: 'Toán', createDate: '2023-03-14', status: 'Active', price: '$200.000' },
  { id: 1, title: 'Lớp 1', description: 'Mô tả lớp 1', subject: 'Toán', createDate: '2023-03-14', status: 'Active', price: '$200.000' },
  { id: 1, title: 'Lớp 1', description: 'Mô tả lớp 1', subject: 'Toán', createDate: '2023-03-14', status: 'Active', price: '$200.000' },
  { id: 1, title: 'Lớp 1', description: 'Mô tả lớp 1', subject: 'Toán', createDate: '2023-03-14', status: 'Active', price: '$200.000' },
];

const News = () => {
  const [classes, setClasses] = useState(mockClassData);
  const [filter, setFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentClass, setCurrentClass] = useState(null);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setFilter(value);
  };

  const handleCreateNewClass = () => {
    setCurrentClass(null);
    setIsModalOpen(true);
  };

  const handleEditClass = (classItem) => {
    setCurrentClass(classItem);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveClass = (classData) => {
    // ... (logic để lưu thông tin lớp học)
    setIsModalOpen(false);
  };

  const filteredClasses = classes.filter((c) => c.title.toLowerCase().includes(filter));

  return (
    <div className="class-manager">
      <h1>Manage Request List</h1>
      <div className="tabs">
        <button className="tab">Pending</button>
        <button className="tab">Accepted</button>
      </div>
      <div className="search-create">
        <input type="text" placeholder="Search by Subject" onChange={handleSearch} />
        <button className="create-btn" onClick={handleCreateNewClass}>Create Request</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Title</th>
            <th>Description</th>
            <th>Subject</th>
            <th>Create Date</th>
            <th>Status</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredClasses.map((classItem, index) => (
            <tr key={classItem.id}>
              <td>{index + 1}</td>
              <td>{classItem.title}</td>
              <td>{classItem.description}</td>
              <td>{classItem.subject}</td>
              <td>{classItem.createDate}</td>
              <td>{classItem.status}</td>
              <td>{classItem.price}</td>
              <td>
                <button onClick={() => handleEditClass(classItem)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <Modal
          classData={currentClass}
          onClose={handleCloseModal}
          onSave={handleSaveClass}
        />
      )}
    </div>
  );
};

export default News;
