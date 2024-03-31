import React from "react";
import HeaderDetail from "../../common/HeaderDetail";
import Line from "../../common/Line";
import "../../../styles/classDetail.css"

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
      { name: "Huyen Trang", avatar: "avatar1.png" },
      { name: "Hai Pham", avatar: "avatar2.png" },
      { name: "Huyen Trang", avatar: "avatar1.png" },
      { name: "Hai Pham", avatar: "avatar2.png" },
      { name: "Huyen Trang", avatar: "avatar1.png" },
      { name: "Hai Pham", avatar: "avatar2.png" },
      { name: "Huyen Trang", avatar: "avatar1.png" },
      { name: "Hai Pham", avatar: "avatar2.png" },
      { name: "Huyen Trang", avatar: "avatar1.png" },
      { name: "Hai Pham", avatar: "avatar2.png" },
    ]
  };

  return (
    <HeaderDetail homeUrl="/classroom-list">
      <div className="container mx-auto p-4">
        <div className="bg-white block-border p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-4">Classroom Details</h2>
          <Line />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div>
              <DetailTitle>Classroom name:</DetailTitle>
              <DetailDescription>{classroomDetail.name}</DetailDescription>

              <DetailTitle>Status:</DetailTitle>
              <DetailDescription className={`status ${classroomDetail.status.toLowerCase()}`}>{classroomDetail.status}</DetailDescription>

              <DetailTitle>Started Date:</DetailTitle>
              <DetailDescription>{classroomDetail.startDate}</DetailDescription>

              <DetailTitle>Tutor:</DetailTitle>
              <DetailDescription>{classroomDetail.tutor}</DetailDescription>

              <DetailTitle>Subject:</DetailTitle>
              <DetailDescription>{classroomDetail.subject}</DetailDescription>

              <DetailTitle>Grade:</DetailTitle>
              <DetailDescription>{classroomDetail.grade}</DetailDescription>
            </div>
            <div>
              <DetailTitle>List parent:</DetailTitle>
              <div className="parent-list-container">
                {classroomDetail.parents.map((parent, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <img src="https://amentotech.com/htmls/tuturn/images/index/platform/img-01.png" alt="Parent Avatar" className="w-10 h-10 rounded-full" />
                    <DetailDescription>{parent.name}</DetailDescription>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="text-center">
            <button className="suspend-button">Suspend</button>
          </div>
        </div>
      </div>
    </HeaderDetail>
  );
}

export default ClassroomDetails;

function DetailTitle({ children }) {
  return <div className="text-lg font-semibold mb-1">{children}</div>;
}

function DetailDescription({ children, className = '' }) {
  return <span className={`text-sm font-normal ${className}`}>{children}</span>;
}


