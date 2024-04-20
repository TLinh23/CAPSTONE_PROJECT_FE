import React from 'react';
import Layout from '../components/layout/Layout';
import Title from '../components/common/Title';

function TutorFee() {
  // Thông tin chi tiết tài khoản ngân hàng giả định
  const bankDetails = {
    accountName: 'Nguyen Van A',
    bankName: 'Ngan Hang TMCP Ngoai Thuong Viet Nam (Vietcombank)',
    accountNumber: '123456789',
    branch: 'Chi nhanh Thanh Pho Ho Chi Minh'
  };

  // Giả định đây là đường dẫn đến hình ảnh mã QR Code của bạn
  const qrCodeImageUrl = 'https://fragrant.mobiletransaction.org/wp-content/uploads/2019/09/qr-code-for-wikipedia.png.webp';

  return (
    <Layout>
      <div className="flex flex-col min-h-screen">
        <div className="container p-4 mx-auto flex-grow">
          <Title>Tutor Fee Payment</Title>
          <div className="flex flex-col md:flex-row justify-center items-center md:justify-between">
            {/* Thông tin chi tiết tài khoản ngân hàng */}
            <div className="w-full md:w-1/2 p-4">
              <h3 className="text-lg font-semibold mb-2 text-center md:text-left">Bank Account Details</h3>
              <div className="mb-4">
                <p><strong>Account Name:</strong> {bankDetails.accountName}</p>
                <p><strong>Bank Name:</strong> {bankDetails.bankName}</p>
                <p><strong>Account Number:</strong> {bankDetails.accountNumber}</p>
                <p><strong>Branch:</strong> {bankDetails.branch}</p>
              </div>
            </div>

            {/* Mã QR code */}
            <div className="w-full md:w-1/2 p-4">
              <h3 className="text-lg font-semibold mb-2 text-center md:text-right">QR Code</h3>
              <div className="flex justify-center md:justify-end">
                <img src={qrCodeImageUrl} alt="QR Code" className="w-48 h-48" />
              </div>
            </div>
          </div>
        </div>
        {/* Footer */}
        <footer className="bg-gray-200 p-4 text-center">
          {/* Footer content here */}
          <p>© 2024 Tutor Platform. All rights reserved.</p>
        </footer>
      </div>
    </Layout>
  );
}

export default TutorFee;
