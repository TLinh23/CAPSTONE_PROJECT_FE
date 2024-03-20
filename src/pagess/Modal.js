import React, { useState, useEffect } from 'react';
import '../css/Modal.css'

const Modal = ({ type, classData, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: '',
    createDate: '',
    status: '',
    price: '',
  });

  useEffect(() => {
    // Đặt lại form data khi mở modal để chỉnh sửa hoặc tạo mới
    setFormData({
      title: classData?.title || '',
      description: classData?.description || '',
      subject: classData?.subject || '',
      createDate: classData?.createDate || '',
      status: classData?.status || '',
      price: classData?.price || '',
    });
  }, [type, classData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>×</span>
        <form onSubmit={(e) => e.preventDefault()}>
          <label>
            Title:
            <input type="text" name="title" value={formData.title} onChange={handleChange} />
          </label>
          <label>
            Description:
            <textarea name="description" value={formData.description} onChange={handleChange} />
          </label>
          <label>
            Subject:
            <input type="text" name="subject" value={formData.subject} onChange={handleChange} />
          </label>
          <label>
            Create Date:
            <input type="date" name="createDate" value={formData.createDate} onChange={handleChange} />
          </label>
          <label>
            Status:
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </label>
          <label>
            Price:
            <input type="text" name="price" value={formData.price} onChange={handleChange} />
          </label>
          <button type="button" onClick={handleSubmit}>{type === 'edit' ? 'Cập nhật' : 'Tạo'}</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
