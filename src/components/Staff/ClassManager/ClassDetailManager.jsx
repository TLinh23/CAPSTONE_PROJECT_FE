import React from "react";
import HeaderDetail from "../../common/HeaderDetail";
import Line from "../../common/Line";

function ClassroomDetails() {
  // Dữ liệu giả định cho chi tiết lớp học
  const classroomDetail = {
    name: "Math 101",
    status: "Active",
    startDate: "10-01-2024",
    tutor: "Khang Nguyen",
    subject: "Math",
    grade: 5,
    parents: [
      { name: "Huyen Trang", avatar: "https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/img.jpg" },
      { name: "Hai Pham", avatar: "https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/img.jpg" },
      { name: "Huyen Trang", avatar: "https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/img.jpg" },
      { name: "Huyen Trang", avatar: "https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/img.jpg" },
      { name: "Hai Pham", avatar: "https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/img.jpg" },
      { name: "Huyen Trang", avatar: "https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/img.jpg" },
      { name: "Huyen Trang", avatar: "https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/img.jpg" },
      { name: "Hai Pham", avatar: "https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/img.jpg" },
      { name: "Huyen Trang", avatar: "https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/img.jpg" },
      { name: "Huyen Trang", avatar: "https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/img.jpg" },
      { name: "Hai Pham", avatar: "https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/img.jpg" },
      { name: "Huyen Trang", avatar: "https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/img.jpg" },
    ]
  };

  return (
    <HeaderDetail homeUrl="/classroom-list">
      <div className="container mx-auto p-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-4">Classroom Details</h2>
          <Line />
          <div className="flex flex-wrap md:flex-nowrap justify-between">
            <div className="flex flex-col w-full md:w-1/2 mb-4 md:mb-0">
              {detailField("Classroom name:", classroomDetail.name)}
              {detailField("Started Date:", classroomDetail.startDate)}
              {detailField("Tutor:", classroomDetail.tutor)}
              {detailField("Subject:", classroomDetail.subject)}
              {detailField("Grade:", classroomDetail.grade)}
              {detailField("Status:", classroomDetail.status, classroomDetail.status === 'Active' ? 'text-green-500' : 'text-red-500')}
            </div>
            <div className="w-full md:w-1/2">
              <DetailTitle>List of Parents:</DetailTitle>
              <div className="max-h-64 overflow-y-auto">
                {classroomDetail.parents.map((parent, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <img src={parent.avatar} alt="Parent Avatar" className="w-10 h-10 rounded-full" />
                    <DetailDescription>{parent.name}</DetailDescription>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            <button className="bg-red-500 text-white p-2 rounded border-none cursor-pointer">
              Suspend
            </button>
          </div>
        </div>
      </div>
    </HeaderDetail>
  );
}

function detailField(label, value, textColor = '') {
  return (
    <div className="flex justify-between items-center mb-4">
      <DetailTitle>{label}</DetailTitle>
      <DetailDescription className={`${textColor}`}>{value}</DetailDescription>
    </div>
  );
}

function DetailTitle({ children }) {
  return <div className="text-lg font-semibold text-right mr-4 w-1/3">{children}</div>;
}

function DetailDescription({ children, className = '' }) {
  return <span className={`text-sm font-normal ${className} w-2/3`}>{children}</span>;
}

export default ClassroomDetails;
