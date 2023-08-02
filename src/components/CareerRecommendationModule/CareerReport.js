import React from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CareerReport.css'; // Import the CSS file
import styled from 'styled-components';
import  { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import FeedbackForm from '../FeedbackModule/FeedbackForm';

const Message = styled.p`
  color: red;
  font-size: 16px;
  font-family: "Roboto", sans-serif;
  text-align: center;
  margin-top: 20px;
`;
const SaveButton = styled.button`
  /* Your button styling here */
  background-color: green;
  color: #fff;
  padding: 8px 16px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  margin:  center; /* Add this line to center the button horizontally */
  cursor: pointer;
  font-weight:bold;

  &:hover {
    background-color: #0056b3;
  }
`;
const AptitudeButton = styled.button`
  /* Your button styling here */
  background-color: yellow;
  color: black;
  padding: 8px 16px;
  font-size: 16px;
  font-weight:bold;
  border: 0.5px solid black; /* Change the border color here */
  border-radius: 4px;
  margin:  center; /* Add this line to center the button horizontally */
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;



const Box = styled.div`
  border: 0.5px solid darkblue;
  padding: 10px;
  margin-bottom: 10px;
`;

const SectionHeading = styled.strong`
   color: darkblue; /* Blue color for Career Cluster */
  ; /* Red color for Sector, Occupation, Education, and Job Preparation Needed */
  font-size: 16px;
  display: block;
  margin-bottom: 5px;
  font-family: "Roboto", sans-serif;
  text-align: center; 
`;
const SectionMainHeading = styled.strong`
  color: darkblue; /* Red color for Sector, Occupation, Education, and Job Preparation Needed */
  font-size: 20px;
  display: block;
  margin-bottom: 5px; 
  font-weight: bold;
  font-family: "Roboto", sans-serif;
  text-align: center; 

`;
const SectionContent = styled.span`
  color: black; /* Green color for content under Sector, Occupation, Education, and Job Preparation Needed */
  font-size: 15px;
  font-family: "Roboto", sans-serif;
`;

const SectorOutput = styled.div`
  display: flex;
  align-items: center;
`;

const Semicolon = styled.span`
  margin: 0 5px;

`;
const modalStyles = {
  content: {
    position: 'fixed',
    top: 400,
    left: 1100,
    bottom: 0,
    width: '300px', // Set the width of the sidebar
    padding: '20px',
    border: '1px solid #ccc',
    background: '#fff',
    borderRadius: '0 5px 5px 0', // Round the right corners
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    zIndex: 9999, // Set a high z-index to make sure the sidebar appears on top
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Semi-transparent background
    zIndex: 9998,// Set a high z-index for the overlay to appear behind the sidebar
  },
};
const ReportPage = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const { careerData, error } = location.state || {};
  console.log(location.state.careerData);
  const [token, setToken] = useState(null);
  const [saved, setSaved] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };
  useEffect(() => {
    handleOpenModal();
  }, []);

  useEffect(() => {
    // Retrieve the token from local storage
    const storedToken = localStorage.getItem('token');
    console.log('Token:', storedToken);
    setToken(storedToken);
  }, []);
  const handleTakeTest = () => {
    // Navigate to the /aptitude page
    navigate('/aptitude');
  };
  const handleSave = () => {
    // Make sure we have a token
    if (!token) {
      console.error('No token found.');
      return;
    }
    if (!careerData || Object.keys(careerData).length === 0) {
      return (
        <div>
          <Message>There is no occupation matching with your interest code, skill, interest with the database.</Message>
        </div>
      );
    }
    
  Object.keys(careerData).forEach((key) => {
    const data = careerData[key];
    if (data && data.careerCluster !== null && data.sector !== null) {
      // Access the data and create the requestBody
      const careerCluster = data?.careerCluster || '';
      const sector = data?.Sector || '';
      const occupation = data?.occupation || '';
      const education = data?.education || '';
      const jobZone = data?.jobZone || '';

      const requestBody = {
        careerCluster: careerCluster,
        sector: sector,
        occupation: occupation,
        education: education,
        jobZone: jobZone,
      };

  console.log('Request Body:', requestBody);
  axios
    .post('http://localhost:8080/api/auth/save-report', requestBody, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', // Add the Content-Type header
      },
    })
      .then((response) => {
        console.log('Career report saved:', response.data);
        // Update the state to indicate that the report has been saved
        setSaved(true);
      })
      .catch((error) => {
        console.error('Error saving career report:', error);
        // Handle any error messages or display a message to the user
      });
    }
  });
};
const isCareerDataEmpty = !careerData || Object.keys(careerData).length === 0;

  return (
    <div>
      <h2>Career Report</h2>
      {!isCareerDataEmpty ? (
        <div>
          <h3 className="career-cluster">Predicted Career Pathways and Clusters:</h3>
          {Object.entries(careerData).map(([key, values]) => (
            <Box key={key}>
              <SectionMainHeading>{key}</SectionMainHeading>
              <div>
                <SectorOutput>
                  <SectionHeading>Career Cluster</SectionHeading>
                  <Semicolon>:</Semicolon>
                  <SectionContent>{values['careerCluster']}</SectionContent>
                </SectorOutput>
              </div>
              <div>
                <SectorOutput>
                  <SectionHeading>Sector</SectionHeading>
                  <Semicolon>:</Semicolon>
                  <SectionContent>{values['Sector']}</SectionContent>
                </SectorOutput>
              </div>
              <div>
                <SectorOutput>
                  <SectionHeading>Occupation</SectionHeading>
                  <Semicolon>:</Semicolon>
                  <SectionContent>{values['occupation']}</SectionContent>
                </SectorOutput>
              </div>
              <div>
                <SectorOutput>
                  <SectionHeading>Education</SectionHeading>
                  <Semicolon>:</Semicolon>
                  <SectionContent>{values['education']}</SectionContent>
                </SectorOutput>
              </div>
              <div>
                <SectorOutput>
                  <SectionHeading>Job Preparation Needed</SectionHeading>
                  <Semicolon>:</Semicolon>
                  <SectionContent>{values['jobZone']}</SectionContent>
                </SectorOutput>
              </div>
            </Box>
          ))}
          <AptitudeButton variant="contained" color="primary" onClick={handleTakeTest}>
              Take Test to find your knowledge on career path
            </AptitudeButton>
            
          {!saved && (
            <SaveButton onClick={handleSave}>Save Career Report</SaveButton>
          )}
          {saved && <Message>Career report saved!</Message>}
        </div>
      ) : (
        <Message>
          There is no occupation matching with your interest code, skill, interest with the database.
        </Message>
      )}


<Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        style={modalStyles}
        contentLabel="Feedback Form"
      >
        <FeedbackForm onClose={handleCloseModal} />
      </Modal>
    </div>
  );
};

export default ReportPage;