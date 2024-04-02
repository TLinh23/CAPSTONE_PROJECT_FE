import React from "react";
import ProfileHeader from "../Profile/ProfileHeader";
import RenderStatus from "../common/RenderStatus";
import { format } from "date-fns";
import SecondaryBtn from "../common/SecondaryBtn";
import { useNavigate, useParams } from "react-router-dom";

function TutorClassroomDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <div className="bg-[#ffffff] block-border">
      <div className="flex items-center gap-4">
        <ProfileHeader title="Classroom detail" />
        <RenderStatus status="approved">Active</RenderStatus>
      </div>
      <div className="grid gap-5 mt-5 block-border md:grid-cols-37">
        <div>Classroom Code:</div>
        <div>ABCDXYZYZ</div>
        <div>Classroom Name:</div>
        <div>ABCDXYZYZ</div>
        <div>Schedule:</div>
        <div>
          From:{" "}
          <span className="mr-5">
            {format(new Date(), "HH:mm - dd/MM/yyyy")}
          </span>
          To: <span>{format(new Date(), "HH:mm - dd/MM/yyyy")}</span>
        </div>
        <div>Date Started:</div>
        <div>ABCDXYZYZ</div>
        <div>Subject:</div>
        <div>ABCDXYZYZ</div>
        <div>Grade:</div>
        <div>ABCDXYZYZ</div>
        <SecondaryBtn
          onClick={() => {
            navigate(`/tutor-classrooms/${id}/students`);
          }}
          className="max-w-[200px]"
        >
          List of Students
        </SecondaryBtn>
      </div>
    </div>
  );
}

export default TutorClassroomDetail;
