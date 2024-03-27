import "./ClassListTutor.css";
import React from "react";
import { Link } from "react-router-dom";

const data = [
  { id: 1, ClassName: "Wasif", Subject: 21, Time: "23/12/2023", Status: "pending", Action:  "" },
  { id: 2, ClassName: "Ali", Subject: 19, Time: "23/12/2023", Status: "pending", Action: "" },
  { id: 3, ClassName: "Saad", Subject: 16, Time: "23/12/2023", Status: "pending", Action: "" },
  { id: 4, ClassName: "Asad", Subject: 25, Time: "25/12/2023", Status: "pending", Action: "" },
];

export default function ClassListTutor() {
  const renderTableData = () => {
    return data.map((student, index) => {
      const { id, ClassName, Subject, Time, Status, Action } = student;
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{ClassName}</td>
          <td>{Subject}</td>
          <td>{Time}</td>
          <td>{Status}</td>
          <td><Link to={`/detail-classroom-tutor/${id}`}>Detail</Link></td>
        </tr>
      );
    });
  };

  const renderTableHeader = () => {
    const header = Object.keys(data[0]);
    return header.map((key, index) => <th key={index}>{key.toUpperCase()}</th>);
  };

  return (
    <div className="class-list-tutor-page">
      <div className="container-title-class-list-tutor">
        <h1 className="title-class-list-tutor">My Class List</h1>
        <form>
            <input type="text" placeholder="Search by classroom or subject" className="input-class-list-tutor" />
            <button type="button" className="btn-class-list-tutor">Search</button>
        </form>
      </div>

      <table>
        <tbody>
          <tr>{renderTableHeader()}</tr>
          {renderTableData()}
        </tbody>
      </table>
    </div>
  );
}
// import React, { useState } from 'react';

// // Giả sử bạn đã có một component Modal được định nghĩa sẵn
// import Modal from './Modal';

// const mockClassData = [
//   // Dữ liệu giả định, bạn cần thay thế bằng dữ liệu thực từ server
//   { id: 1, title: 'Lớp 1', description: 'Mô tả lớp 1', subject: 'Toán', createDate: '2023-03-14', status: 'Active', price: '$200.000' },
//   { id: 1, title: 'Lớp 1', description: 'Mô tả lớp 1', subject: 'Toán', createDate: '2023-03-14', status: 'Active', price: '$200.000' },
//   { id: 1, title: 'Lớp 1', description: 'Mô tả lớp 1', subject: 'Toán', createDate: '2023-03-14', status: 'Active', price: '$200.000' },
//   { id: 1, title: 'Lớp 1', description: 'Mô tả lớp 1', subject: 'Toán', createDate: '2023-03-14', status: 'Active', price: '$200.000' },
//   { id: 1, title: 'Lớp 1', description: 'Mô tả lớp 1', subject: 'Toán', createDate: '2023-03-14', status: 'Active', price: '$200.000' },
//   { id: 1, title: 'Lớp 1', description: 'Mô tả lớp 1', subject: 'Toán', createDate: '2023-03-14', status: 'Active', price: '$200.000' },
//   // Thêm các lớp học khác tương tự
// ];

// const ClassManager = () => {
//   const [classes, setClasses] = useState(mockClassData); // Khai báo state cho danh sách lớp học
//   const [filter, setFilter] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false); // State để kiểm soát việc hiển thị modal
//   const [currentClass, setCurrentClass] = useState(null); // State để lưu trữ thông tin lớp học hiện tại đang được chỉnh sửa hoặc tạo mới

//   const handleSearch = (e) => {
//     const value = e.target.value.toLowerCase();
//     setFilter(value);
//   };

//   const handleCreateNewClass = () => {
//     setCurrentClass(null); // không có lớp học nào được chọn khi tạo mới
//     setIsModalOpen(true);
//   };

//   const handleEditClass = (classItem) => {
//     setCurrentClass(classItem); // lấy thông tin lớp học hiện tại để chỉnh sửa
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleSaveClass = (classData) => {
//     // Logic để lưu thông tin lớp học mới hoặc đã chỉnh sửa
//     // Cập nhật state `classes` tại đây
//     setIsModalOpen(false);
//   };

//   const filteredClasses = classes.filter((c) => c.title.toLowerCase().includes(filter));

//   return (
//     <div>
//       <div>
//         <input type="text" placeholder="Search" onChange={handleSearch} />
//         <button onClick={handleCreateNewClass}>Create Class</button>
//       </div>
//       <table>
//         <thead>
//           <tr>
//             <th>No.</th>
//             <th>Title</th>
//             <th>Description</th>
//             <th>Subject</th>
//             <th>createDate</th>
//             <th>Status</th>
//             <th>Price</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredClasses.map((classItem, index) => (
//             <tr key={classItem.id}>
//               <td>{index + 1}</td>
//               <td>{classItem.title}</td>
//               <td>{classItem.description}</td>
//               <td>{classItem.subject}</td>
//               <td>{classItem.createDate}</td>
//               <td>{classItem.status}</td>
//               <td>{classItem.price}</td>
//               <td>
//                 <button onClick={() => handleEditClass(classItem)}>Edit</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {isModalOpen && (
//         <Modal
//           classData={currentClass}
//           onClose={handleCloseModal}
//           onSave={handleSaveClass}
//         />
//       )}
//     </div>
//   );
// };

// export default ClassManager;