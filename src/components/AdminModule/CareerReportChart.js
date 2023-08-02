import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart } from 'chart.js';

const UserTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/auth/viewusersandcareerreport')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  useEffect(() => {
    if (users.length === 0) return;

    // Get all career reports from users
    const allCareerReports = users.flatMap((user) => user.careerReports);

    // Get unique career occupations
    const careerOccupations = [...new Set(allCareerReports.map((report) => report.occupation))];

    // Count the number of occurrences of each career occupation
    const careerOccupationCounts = {};
    allCareerReports.forEach((report) => {
      const { occupation } = report;
      careerOccupationCounts[occupation] = (careerOccupationCounts[occupation] || 0) + 1;
    });

    // Find the career occupation with the highest count
    const highestCount = Math.max(...Object.values(careerOccupationCounts));
    const highestCareerOccupation = Object.keys(careerOccupationCounts).find(
      (occupation) => careerOccupationCounts[occupation] === highestCount
    );

    // Create the chart data
    const chartData = {
      labels: careerOccupations,
      datasets: [
        {
          label: 'Career Occupation Count',
          backgroundColor: careerOccupations.map(
            (occupation) => (occupation === highestCareerOccupation ? 'rgba(75, 192, 192, 0.8)' : 'rgba(75, 192, 192, 0.2)')
          ),
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          data: careerOccupations.map((occupation) => careerOccupationCounts[occupation] || 0),
        },
      ],
    };

    // Chart options
    const chartOptions = {
      scales: {
        x: {
          grid: {
            offset: true,
          },
        },
        y: {
          beginAtZero: true, // Start y-axis from 0
          min: 0, // Set the minimum value for y-axis
          precision: 0,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    };

    // Create the chart using Chart.js
    const ctx = document.getElementById('careerReportChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: chartOptions,
    });
  }, [users]);

  return (
    <div>
      <h1 style={{ fontFamily: 'Roboto', color: 'blue' }}>Career Report Chart</h1>
      <canvas id="careerReportChart" width="400" height="200"></canvas> {/* Chart canvas */}
    </div>
  );
};

export default UserTable;
