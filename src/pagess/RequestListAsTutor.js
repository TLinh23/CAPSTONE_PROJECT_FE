// ClassList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/ClassList.css';

function RequestListAsTutor() {
  const [currentSubject, setCurrentSubject] = useState('Subject');
  const [currentPage, setCurrentPage] = useState(1);
  const [classes, setClasses] = useState([
    { id: 1, name: "Class 1", topic: "Subject 1", description: "Description 1", price: 100 },
    { id: 2, name: "Class 2", topic: "Subject 2", description: "Description 2", price: 150 },
    // Add more classes as needed
  ]);

  useEffect(() => {
    renderClasses();
    renderPagination();
  }, [currentPage, currentSubject]);

  function renderClasses() {
    // Implement logic to load classes for the current page and subject
    // var classes = ...;

    // Update state with the loaded classes
    setClasses([
      { id: 1, name: "Class 1", topic: "Subject 1", description: "Description 1", price: 100 },
      { id: 2, name: "Class 2", topic: "Subject 2", description: "Description 2", price: 150 },
      { id: 3, name: "Class 1", topic: "Subject 1", description: "Description 1", price: 100 },
    { id: 4, name: "Class 2", topic: "Subject 2", description: "Description 2", price: 150 },
    { id: 5, name: "Class 1", topic: "Subject 1", description: "Description 1", price: 100 },
    { id: 6, name: "Class 2", topic: "Subject 2", description: "Description 2", price: 150 },
      // Add more classes as needed
    ]);
  }

  function renderPagination() {
    var totalPages = 5; // Change this based on your data

    return (
      <div className="pagination-container">
        {[...Array(totalPages).keys()].map((page) => (
          <a
            key={page + 1}
            href="#"
            className={`page-link ${currentPage === page + 1 ? 'active' : ''}`}
            onClick={() => handlePageClick(page + 1)}
          >
            {page + 1}
          </a>
        ))}
      </div>
    );
  }

  function handlePageClick(page) {
    setCurrentPage(page);
  }

  return (
    <div>
      <div id="navbar">
        <button onClick={() => setCurrentSubject('Mathematics')}>Mathematics</button>
        <button onClick={() => setCurrentSubject('Physics')}>Physics</button>
        <button onClick={() => setCurrentSubject('Chemistry')}>Chemistry</button>
        {/* Add more buttons as needed */}
      </div>

      <div id="content">
        <div id="breadcrumbs">home / <span id="currentSubject">{currentSubject}</span></div>

        <div id="sorting">
          {/* Add sorting buttons as needed */}
        </div>

        <div className="class-container">
          {classes.map((classItem) => (
            <div key={classItem.id} className="class-card">
              <h2>{classItem.name}</h2>
              <p>Topic: {classItem.topic}</p>
              <p>Description: {classItem.description}</p>
              Price: $<span>{classItem.price.toFixed(2)}</span><br />
              <button onClick={() => alert('You have taked the class!')}>Take</button>

              {/* Link to ClassDetail */}
              {/* <Link to={`/class/${classItem.id}`}>
                View Details
              </Link> */}
            </div>
          ))}
        </div>

        {renderPagination()}
      </div>
    </div>
  );
}

export default RequestListAsTutor;
