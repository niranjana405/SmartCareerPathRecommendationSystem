import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './ViewUsersReports.css';
const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [careerReport, setCareerReport] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/api/auth/viewusersandcareerreport')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handleCareerReportClick = (userId) => {
    setSelectedUser(userId);
    const user = users.find((user) => user.userId === userId);
    setCareerReport(user.careerReports);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setCareerReport(null);
  };

  return (
    <div className="container mt-5">
    <table className="table table-striped">
        <thead>
          <tr>
            <th>User ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Career Report</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.userId}>
              <td>{user.userId}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>
              <button
                  className="btn btn-primary"
                  onClick={() => handleCareerReportClick(user.userId)}
                >                  View Career Report
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={selectedUser !== null} onRequestClose={closeModal} className="Modal">
        {careerReport ? (
          <div className="ModalContent">
            <h2 className="mb-3">Career Report for User ID {selectedUser}</h2>
            {careerReport.map((report) => (
              <div key={report.id}>
                <p>Career Cluster: {report.careerCluster}</p>
                <p>Sector: {report.sector}</p>
                <p>Occupation: {report.occupation}</p>
                <p>Education: {report.education}</p>
                <p>Job Zone: {report.jobZone}</p>
                <hr />
              </div>
            ))}
          </div>
        ) : (
          <div>Loading career report...</div>
        )}
 <button className="btn btn-secondary mt-3" onClick={closeModal}>
          Close
        </button>      </Modal>
    </div>
  );
};

export default UserTable;
