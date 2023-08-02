import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CareerRecommendationReport.css';

const CareerReportGenerator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedReports, setGeneratedReports] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCareerReports();
  }, []);

  const fetchCareerReports = () => {
    setIsLoading(true);

    // Get the token from wherever you have stored it (e.g., in local storage)
    const token = localStorage.getItem('token');

    // Set the authorization header with the token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Send a GET request to fetch the career reports
    axios
      .get('http://localhost:8080/api/auth/get-report', config)
      .then((response) => {
        setIsLoading(false);
        setGeneratedReports(response.data.careerReports); // Assuming the response data contains a 'careerReports' array
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.message || 'Error fetching career reports.');
      });
  };

  return (
    <div className="container career-report-generator">
      <h2 className="text-center">Career Report </h2>

      {isLoading && <p className="text-center">Loading...</p>}
      {error && <p className="error text-center">Error: {error}</p>}
      {generatedReports.length > 0 && (
        <div>
          {generatedReports.map((report) => (
            <div className="report-box" key={report.id}>
              <p><strong>Career Cluster:</strong> {report.careerCluster}</p>
              <p><strong>Sector:</strong> {report.sector}</p>
              <p><strong>Occupation:</strong> {report.occupation}</p>
              <p><strong>Education:</strong> {report.education}</p>
              <p><strong>Job Preparation Needed:</strong> {report.jobZone}</p>
            </div>
            ))}
            </div>
          )}
        </div>
      );
    };
    

export default CareerReportGenerator;
