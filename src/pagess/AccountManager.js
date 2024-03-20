import React, { useState } from 'react';
import '../css/AccountManager.css';

const AccountManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const classes = [
    {
      id: 1,
      name: 'Locpx',
      role: 'Tutor',
      phone: '0382133678',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Phuongpt',
      role: 'Parent',
      phone: '0878050100',
      status: 'Suspend',
    },
    {
      id: 1,
      name: 'Locpx',
      role: 'Tutor',
      phone: '0382133678',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Phuongpt',
      role: 'Parent',
      phone: '0878050100',
      status: 'Suspend',
    },
    {
      id: 1,
      name: 'Locpx',
      role: 'Tutor',
      phone: '0382133678',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Phuongpt',
      role: 'Parent',
      phone: '0878050100',
      status: 'Suspend',
    },
    {
      id: 1,
      name: 'Locpx',
      role: 'Tutor',
      phone: '0382133678',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Phuongpt',
      role: 'Parent',
      phone: '0878050100',
      status: 'Suspend',
    },
    {
      id: 1,
      name: 'Locpx',
      role: 'Tutor',
      phone: '0382133678',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Phuongpt',
      role: 'Parent',
      phone: '0878050100',
      status: 'Suspend',
    },
    
  ];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredClasses = classes.filter(
    (classData) =>
      classData.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="account-manager">
      <h2>Account Manager</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by classroom name"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="class-list">
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Role</th>
              <th>Phone</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredClasses.map((classData, index) => (
              <tr key={classData.id}>
                <td>{index + 1}</td>
                <td>{classData.name}</td>
                <td>{classData.role}</td>
                <td>{classData.phone}</td>
                <td>
                  <span className={`status ${classData.status.toLowerCase()}`}>
                    {classData.status}
                  </span>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountManager;