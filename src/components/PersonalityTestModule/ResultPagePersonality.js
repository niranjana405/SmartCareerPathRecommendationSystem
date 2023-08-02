import React from 'react';
import { useLocation,Link,useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, ListGroup, Button } from 'react-bootstrap';

const ResultContainer = styled.div`
  background-image: url('/images/persona.jpg');
  background-size: cover;
  background-position: center;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;
const CustomButton = styled(Button)`
  background-color: #008000; /* Change the background color to green */
  color: white; /* Change the text color to white */
  border: none; /* Remove the border */
  width: 200px; /* Set the width to 200px */
  height: 40px; /* Set the height to 40px (adjust as needed) */
  border-radius: 4px; /* Add some border-radius for rounded corners */
  font-size: 16px; /* Adjust the font size as needed */
  cursor: pointer;
`;

const CareerDescription = styled.div`
  padding: 20px;
  background-color: #ffe6e6;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  border: 0.15px solid black;
  margin-top: 20px;
`;

const InterestCodesContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  color: black;
`;

const InterestCodeBox = styled.div`
  padding: 10px 15px;
  background-color: brown;
  border-radius: 4px;
  color:white;
  font-weight:bold;
`;
const DominantCodeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const DominantCodeBox = styled.div`
  padding: 8px 16px;
  background-color: orange;
  border-radius: 4px;
  color: blue;
  font-weight:bold;

`;
const Result = () => {
  const location = useLocation();
  const { careerRecommendations, topThreeInterestCodes, dominantInterestCode } = location.state || {};
  const navigate = useNavigate();


  const interestCodeDescriptions = [
    { code: 'R', description: 'REALISTIC people are characterized by competitive/assertive behavior and by interest in activities that require motor coordination, skill, and physical strength. People oriented toward this role prefer situations involving "action solutions" rather than tasks involving verbal or interpersonal skills. They like to take a concrete approach to problem-solving rather than relying on abstract theory. They tend to be interested in scientific or mechanical rather than cultural and aesthetic areas.' },
    { code: 'I', description: 'INVESTIGATIVE people prefer to think rather than to act, to organize and understand rather than to persuade. They are not apt to be very "people oriented.' },
    { code: 'A', description: 'ARTISTIC people value self-expression and relationships with others through artistic expression. They dislike structure, prefer tasks involving personal or physical skills, and are more prone to expression of emotion than others. They are similar to investigative people, but are more interested in the cultural-aesthetic than the scientific. SOCIAL people seem to satisfy their needs in teaching or helping situations. In contrast to investigative and realistic people, social types are drawn more to seek close interpersonal relationships and are less apt to engage in intellectual or extensive physical activity.' },
    { code: 'S', description: 'SOCIAL people have high interest in other people and are sensitive to the needs of others. They perceive themselves as liking to help others, understanding others, and having teaching abilities. Social people value social activities, social problems, and interpersonal relationships. They use their verbal and social skills to change other people’s behavior. They are generally cheerful, scholarly, and verbally oriented.' },
    { code: 'E', description: 'ENTERPRISING people are verbally skilled and use this skill in persuasion rather than support of others. They also value prestige and status and are more apt to pursue it than conventional people.' },
    { code: 'C', description: 'CONVENTIONAL people dont mind rules and regulations and emphasize self-control. They prefer structure and order to ambiguity in work and interpersonal situations. They place value on prestige or status.' },
  ];

  // Map the topThreeInterestCodes to include the full descriptions
  const topThreeInterestCodesWithDescription = topThreeInterestCodes.map(code => {
    const interest = interestCodeDescriptions.find(item => item.code === code);
    return { code: interest.code, description: interest.description };
  });

  return (
    <Container>
      <ResultContainer>
      </ResultContainer>
     
     
      {careerRecommendations.length > 0 && (
        <CareerDescription className="mt-4">
          <InterestCodesContainer>
            <h3>Your Interest Codes are:</h3>
            {topThreeInterestCodesWithDescription.map((item, index) => (
              <InterestCodeBox key={index}>
                {item.code}
              </InterestCodeBox>
            ))}
          </InterestCodesContainer>
          {dominantInterestCode && (
            <div>
              <DominantCodeContainer>
                <h3>Dominant Code:</h3>
                <DominantCodeBox>{dominantInterestCode}</DominantCodeBox>
              </DominantCodeContainer>
            </div>
          )}
          <h3>Career Descriptions:</h3>
          {topThreeInterestCodesWithDescription.map((item, index) => (
            <div key={index} className="mb-4">
              <h4>{item.code}</h4>
              <p>{item.description}</p>
            </div>
          ))}
           
        </CareerDescription>
      )}
      <Button 
        type="submit" 
        style={{
          backgroundColor: '#008000',
          color: 'white',
          border: 'none',
          width: '200px',
          
          height: '40px',
          borderRadius: '4px',
          fontSize: '16px',
          cursor: 'pointer',
        }}
        onClick={() => navigate('/careerfinder')}
      >
        Click to find your career path
      </Button>
    </Container>
    
  );
};

export default Result;