import React from "react";
import "./DetailClassroomTutor.css";
import HeaderDetail from "src/components/common/HeaderDetail";
import { Link } from "react-router-dom";

const title = [
  { label: "Classroom Code", name: "classroomCode" },
  { label: "Classroom Name", name: "classroomName" },
  { label: "Time", name: "" },
  { label: "Date Started", name: "dateStarted" },
  { label: "Subject", name: "subject" },
  { label: "Grade", name: "grade" },
];
export default function DetailClassroomTutor() {
  return (
    <>
      <HeaderDetail homeUrl="/class-list-tutor">
        <div className="container-detail-classroom-tutor">
          {title.map((field, index) => (
            <div key={index} className="field-detail-class-tutor">
              <label>{field.label}</label>
              <div className="description-span">
                <span>haha</span>
              </div>
            </div>
          ))}
        </div>
      </HeaderDetail>
      <div className="link-to-list-student">
        <Link to={``} className="router-list-student">
          List of Student
        </Link>
      </div>
    </>
  );
}

function RequestTitle({ children }) {
  return <div className="text-lg font-semibold">{children}</div>;
}

function RequestDescription({ children }) {
  return <span className="text-sm font-normal">{children}</span>;
}
