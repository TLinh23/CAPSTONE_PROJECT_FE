import React from "react";
import HeaderDetail from "src/components/common/HeaderDetail";
import Title from "../../common/Title";

// Dữ liệu giả định cho chi tiết tài khoản
const accountDetail = {
  id: 1,
  name: 'John',
  role: 'Admin',
  phone: '0990909090',
  status: 'Active',
  avatarUrl: 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/img.jpg',
};

function AccountDetail() {
  return (
    <HeaderDetail homeUrl="/dashboard">
      <div className="container mx-auto p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
          <div className="flex flex-col items-center space-y-4 md:space-x-6 md:flex-row md:items-start">
            <img
              src={accountDetail.avatarUrl}
              alt="Avatar"
              className="w-32 h-32 rounded-full object-cover"
            />
            <div className="flex flex-col space-y-2 mt-4 md:mt-0">
              <div className="text-lg font-semibold">{accountDetail.name}</div>
              <div className="text-sm text-gray-600">{accountDetail.role}</div>
              <div className="text-sm text-gray-600">{accountDetail.phone}</div>
              <button className={`py-1 px-3 rounded-full text-white ${accountDetail.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}>
                {accountDetail.status}
              </button>
            </div>
          </div>
        </div>
      </div>
    </HeaderDetail>
  );
}

export default AccountDetail;



function RequestTitle({ children }) {
  return <div className="text-lg font-semibold">{children}</div>;
}

function RequestDescription({ children }) {
  return <span className="text-sm font-normal">{children}</span>;
}
