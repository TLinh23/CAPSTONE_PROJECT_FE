import React, { useState } from 'react';
import '../css/TransactionRecord.css';

const TransactionRecord = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const transactions = [
    {
      id: 1,
      payer: 'Trang Pham',
      requestBy: 'Huyen Tran',
      amount: '200',
      requestDate: '11-02-2024',
      payDate: '13-02-2024',
      status: 'PAID',
    },
    {
      id: 2,
      payer: 'Khang Nguyen',
      requestBy: 'Long Nguyen',
      amount: '250',
      requestDate: '13-02-2024',
      payDate: '',
      status: 'UNPAID',
    },
    // Thêm các giao dịch khác theo mô tả hình ảnh
  ];

  // Hàm xử lý khi nhấn nút "New Transaction"
  const handleNewTransactionClick = () => {
    setShowPopup(true); // Hiển thị popup
  };

  // Hàm xử lý khi đóng popup
  const handleClosePopup = () => {
    setShowPopup(false); // Ẩn popup
  };


  const filteredTransactions = searchTerm
    ? transactions.filter(
        (transaction) =>
          transaction.payer.toLowerCase().includes(searchTerm.toLowerCase()) ||
          transaction.requestBy.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : transactions;

  return (
    <div className="transaction-manager">
      <h2>Transaction Records</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by payer or request by"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="class-list">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Payer</th>
              <th>Request By</th>
              <th>Amount</th>
              <th>Request Date</th>
              <th>Pay Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.payer}</td>
                <td>{transaction.requestBy}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.requestDate}</td>
                <td>{transaction.payDate}</td>
                <td>{transaction.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="new-transaction-btn" onClick={handleNewTransactionClick}>New Transaction</button>
      {showPopup && <NewTransactionPopup onClose={handleClosePopup} />}
    </div>
  );
};

const NewTransactionPopup = ({ onClose }) => {
  // Component form popup để thêm giao dịch mới
  return (
    <div className="popup-background">
      <div className="popup-container">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Add New Transaction</h2>
        <form className="transaction-form">
          <div className="form-group">
            <label htmlFor="paymentType">Payment type:</label>
            <input type="text" id="paymentType" name="paymentType" />
          </div>
          
          <div className="form-group">
            <label htmlFor="requestedBy">Requested By:</label>
            <input type="text" id="requestedBy" name="requestedBy" />
          </div>
          
          <div className="form-group">
            <label htmlFor="payer">Payer:</label>
            <input type="text" id="payer" name="payer" />
          </div>
          
          <div className="form-group">
            <label htmlFor="payAmount">Pay amount:</label>
            <input type="text" id="payAmount" name="payAmount" />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Transaction Description:</label>
            <textarea id="description" name="description"></textarea>
          </div>
          
          <button type="submit" className="submit-btn">Add new</button>
        </form>
      </div>
    </div>
  );
};

export default TransactionRecord;
