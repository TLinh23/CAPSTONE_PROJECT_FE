import React, { useState } from 'react';

// Giả sử bạn đã có một component Modal được định nghĩa sẵn
import Modal from './Modal';

const mockClassData = [
  // Dữ liệu giả định, bạn cần thay thế bằng dữ liệu thực từ server
  { id: 1, title: 'Lớp 1', description: 'Mô tả lớp 1', subject: 'Toán', createDate: '2023-03-14', status: 'Active', price: '$200.000' },
  { id: 1, title: 'Lớp 1', description: 'Mô tả lớp 1', subject: 'Toán', createDate: '2023-03-14', status: 'Active', price: '$200.000' },
  { id: 1, title: 'Lớp 1', description: 'Mô tả lớp 1', subject: 'Toán', createDate: '2023-03-14', status: 'Active', price: '$200.000' },
  { id: 1, title: 'Lớp 1', description: 'Mô tả lớp 1', subject: 'Toán', createDate: '2023-03-14', status: 'Active', price: '$200.000' },
  { id: 1, title: 'Lớp 1', description: 'Mô tả lớp 1', subject: 'Toán', createDate: '2023-03-14', status: 'Active', price: '$200.000' },
  { id: 1, title: 'Lớp 1', description: 'Mô tả lớp 1', subject: 'Toán', createDate: '2023-03-14', status: 'Active', price: '$200.000' },
  // Thêm các lớp học khác tương tự
];

const ClassManager = () => {
  const [classes, setClasses] = useState(mockClassData); // Khai báo state cho danh sách lớp học
  const [filter, setFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // State để kiểm soát việc hiển thị modal
  const [currentClass, setCurrentClass] = useState(null); // State để lưu trữ thông tin lớp học hiện tại đang được chỉnh sửa hoặc tạo mới

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setFilter(value);
  };

  const handleCreateNewClass = () => {
    setCurrentClass(null); // không có lớp học nào được chọn khi tạo mới
    setIsModalOpen(true);
  };

  const handleEditClass = (classItem) => {
    setCurrentClass(classItem); // lấy thông tin lớp học hiện tại để chỉnh sửa
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveClass = (classData) => {
    // Logic để lưu thông tin lớp học mới hoặc đã chỉnh sửa
    // Cập nhật state `classes` tại đây
    setIsModalOpen(false);
  };

  const filteredClasses = classes.filter((c) => c.title.toLowerCase().includes(filter));

  return (
    <div>
      <div>
        <input type="text" placeholder="Search" onChange={handleSearch} />
        <button onClick={handleCreateNewClass}>Create Class</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Title</th>
            <th>Description</th>
            <th>Subject</th>
            <th>createDate</th>
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

export default ClassManager;
