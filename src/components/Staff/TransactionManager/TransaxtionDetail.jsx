import React from 'react';
import HeaderDetail from 'src/components/common/HeaderDetail';
import Line from 'src/components/common/Line';
import RenderStatus from 'src/components/common/RenderStatus';
import Title from '../../common/Title';

// Dữ liệu giả định cho chi tiết giao dịch
const transactionDetail = {
  paymentType: 'Mediate',
  requestedBy: 'Huyen Tran',
  payer: 'Trang Pham',
  payAmount: '200',
  status: 'PAID',
  requestDate: '11-02-2024',
  payDate: '13-02-2024',
  transactionDescription: '' // Thêm mô tả giao dịch nếu có
};

function TransactionDetail() {
  return (
    <div className='container mx-auto p-4'>
      <Title>Transaction Details</Title>
      <div className='bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto'>
        <div className='flex flex-col space-y-4'>
          <div className='flex justify-between'>
            <RequestTitle>Payment Type:</RequestTitle>
            <RequestDescription>{transactionDetail.paymentType}</RequestDescription>
          </div>

          <div className='flex justify-between'>
            <RequestTitle>Requested By:</RequestTitle>
            <RequestDescription>{transactionDetail.requestedBy}</RequestDescription>
          </div>

          <div className='flex justify-between'>
            <RequestTitle>Payer:</RequestTitle>
            <RequestDescription>{transactionDetail.payer}</RequestDescription>
          </div>

          <div className='flex justify-between'>
            <RequestTitle>Pay Amount:</RequestTitle>
            <RequestDescription>{transactionDetail.payAmount}</RequestDescription>
          </div>

          <div className='flex justify-between'>
            <RequestTitle>Transaction Description:</RequestTitle>
            <RequestDescription>{transactionDetail.transactionDescription}</RequestDescription>
          </div>

          <div className='flex justify-between'>
            <RequestTitle>Request Date:</RequestTitle>
            <RequestDescription>{transactionDetail.requestDate}</RequestDescription>
          </div>

          <div className='flex justify-between'>
            <RequestTitle>Pay Date:</RequestTitle>
            <RequestDescription>{transactionDetail.payDate}</RequestDescription>
          </div>

          <div className='flex justify-between'>
            <RequestTitle>Status:</RequestTitle>
            <RenderStatus status={transactionDetail.status}>{transactionDetail.status}</RenderStatus>
          </div>
        </div>
      </div>
    </div>
  );
}

function RequestTitle({ children }) {
  return <div className="text-lg font-semibold mr-4">{children}</div>;
}

function RequestDescription({ children }) {
  return <span className="text-sm font-normal">{children}</span>;
}

export default TransactionDetail;