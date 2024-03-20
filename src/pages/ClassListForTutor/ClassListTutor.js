import "./ClassListTutor.css";
import React from "react";
import { Link } from "react-router-dom";

const data = [
  { id: 1, ClassName: "Wasif", Subject: 21, Time: "wasif@email.com", Status: "pending", Action: <Link to="/" >Detail</Link> },
  { id: 2, ClassName: "Ali", Subject: 19, Time: "ali@email.com", Status: "pending", Action: <Link to="/" >Detail</Link> },
  { id: 3, ClassName: "Saad", Subject: 16, Time: "saad@email.com", Status: "pending", Action: <Link to="/" >Detail</Link> },
  { id: 4, ClassName: "Asad", Subject: 25, Time: "asad@email.com", Status: "pending", Action: <Link to="/" >Detail</Link> },
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
          <td>{Action}</td>
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
