import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Navigate,useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  background-color: #FFFFF7;
`;
const QuestionColumn = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr; /* Divide the space into two equal columns */
  grid-gap: 20px; /* Add some space between the columns */
`;
const Image = styled.img`
  display: block;
  max-width: 500%;
  max-height: 300px; /* Set the maximum height of the image */
  margin-bottom: 20px;
`;
const Question = styled.div`
  margin-bottom: 10px;
  display: flex; /* Use flexbox */
  flex-direction: column; /* Stack items vertically */
`;
const RadioWrapper = styled.div`
  display: flex;
  margin-top: 5px; /* Add some space between the input and label */
`;
const Label = styled.label`
  margin-left: 0px; /* Add some space between the input and label */
`;

const SubmitButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
const BackButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
const PersonalityTest = () => {
  const navigate = useNavigate();
  const [unansweredQuestions, setUnansweredQuestions] = useState([]);

  const [questions, setQuestions] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [careerRecommendations, setCareerRecommendations] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
  const [topThreeInterestCodes, setTopThreeInterestCodes] = useState([]);
  const [dominantInterestCode, setDominantInterestCode] = useState(null);

  useEffect(() => {
    fetchQuestions();
  }, []);
  const isQuestionAnswered = (questionId) => {
    return answers.hasOwnProperty(questionId.toString());
  };
  const fetchQuestions = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/auth/personalitytestQuestions');
      setQuestions(response.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };
  const handleBack = () => {
    setCurrentChunkIndex(currentChunkIndex - 1); 
    };

  if (!questions || questions.length === 0) {
    return <div>Loading...</div>;
  }
  const chunkSize = 30;
  const questionChunks = questions.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / chunkSize);
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; // start a new chunk
    }
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);
  const handleAnswer = (questionId, answer) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const handleSubmit = () => {
    const allQuestionsAnswered = areAllQuestionsAnswered();

    if (!allQuestionsAnswered) {
      // Find unanswered question IDs and set them to the state variable
      const unanswered = questionChunks[currentChunkIndex].filter(
        (question) => !isQuestionAnswered(question.id)
      );
      setUnansweredQuestions(unanswered.map((question) => question.id));
      alert("Please answer all the questions before submitting.");
      return;
    }

    setSubmitted(true);

    // Calculate the personality types
    const personalityTypes = {
      R: 0,
      I: 0,
      A: 0,
      S: 0,
      E: 0,
      C: 0,
    };

    questions.forEach(question => {
      const questionId = question.id.toString();
      const answer = answers[questionId];
      const { code } = question;
      personalityTypes[code] += answer;
    });

    // Find the highest scoring personality type
    const maxScore = Math.max(...Object.values(personalityTypes));
    const maxScoreCodes = Object.keys(personalityTypes).filter(key => personalityTypes[key] === maxScore);
    const highestScoringType = maxScoreCodes.map(code => {
      switch (code) {
        case 'R':
          return { type: 'Realistic', score: personalityTypes[code] };
        case 'I':
          return { type: 'Investigative', score: personalityTypes[code] };
        case 'A':
          return { type: 'Artistic', score: personalityTypes[code] };
        case 'S':
          return { type: 'Social', score: personalityTypes[code] };
        case 'E':
          return { type: 'Enterprising', score: personalityTypes[code] };
        case 'C':
          return { type: 'Conventional', score: personalityTypes[code] };
        default:
          return null;
      }
    }).filter(type => type !== null);

    // Set the career recommendations
    setCareerRecommendations(highestScoringType.map(type => type.type));
        // Find the top three scoring interest codes
    const sortedInterestCodes = Object.keys(personalityTypes).sort(
      (a, b) => personalityTypes[b] - personalityTypes[a]
    );

    // Get the top three interest codes
    const topThreeInterestCodes = sortedInterestCodes.slice(0, 3);
    setTopThreeInterestCodes(topThreeInterestCodes);

    // Get the dominant code (personality type with the highest score overall)
    const dominantInterestCode = sortedInterestCodes[0];
    setDominantInterestCode(dominantInterestCode);
  };

  if (submitted) {
    return <Navigate to="/result" state={{ careerRecommendations, topThreeInterestCodes, dominantInterestCode }} />;
  }
  const areAllQuestionsAnswered = () => {
    // Check if all questions in the current chunk are answered
    return questionChunks[currentChunkIndex].every((question) => {
      const questionId = question.id.toString();
      return answers.hasOwnProperty(questionId);
    });
  };

  const handleNext = () => {
    // Check if all questions in the current chunk are answered
    const allQuestionsAnswered = areAllQuestionsAnswered();

    if (!allQuestionsAnswered) {
      // Find unanswered question IDs and set them to the state variable
      const unanswered = questionChunks[currentChunkIndex].filter(
        (question) => !isQuestionAnswered(question.id)
      );
      setUnansweredQuestions(unanswered.map((question) => question.id));
      alert("Please answer all the questions before proceeding.");
      return;
    }
    // If all questions are answered, proceed to the next chunk or submit the test

    if (currentChunkIndex < questionChunks.length - 1) {
      setCurrentChunkIndex(currentChunkIndex + 1);
    } else {
      // If no more chunks, submit the test
      handleSubmit();
    }
  };

  return (
    <Container>
      {/* Display "Skills" heading for the first three chunks */}
      {currentChunkIndex == 0 && (
        <>
          <Image src="/images/interest.jpg"  alt="Personality Test" />
          <h2 style={{ color: 'darkblue', font: 'Garamond' }}>Answer About Your Interests</h2>
        </>
      )}
 {/* Display "Interests" heading on the 3rd page (4th chunk) */}
 {currentChunkIndex == 1 && (
        <>
                  <Image src="/images/interest.jpg" alt="Personality Test" />

          <h2 style={{ color: 'darkblue', font: 'Garamond' }}>Answer about your Interests</h2>
          {/* You can add any additional content specific to the "Interests" section here */}
        </>
      )}
       {/* Display "Interests" heading on the 3rd page (4th chunk) */}
 {currentChunkIndex == 2 && (
        <>
                  <Image src="/images/question.jpg" alt="Personality Test" />

          <h2 style={{ color: 'darkblue', font: 'Garamond' }}>General questions about yourself</h2>
          <h1 style={{ color: 'darkblue', font: 'Garamond', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>ARE YOU</h1>

          {/* You can add any additional content specific to the "Interests" section here */}
        </>
      )}
            <QuestionColumn>

      {questionChunks[currentChunkIndex].map((question, index) => (
          <Question key={question.id}>

<p style={{ fontWeight: isQuestionAnswered(question.id) ? 'normal' : '', color: unansweredQuestions.includes(question.id) ? 'red' : '' }}>
              {question.question}
            </p>
                      <RadioWrapper>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name={`question_${question.id}`}
                value={1}
                disabled={submitted}
                onChange={() => handleAnswer(question.id, 1)}
                style={{ backgroundColor: '#ff9999' }}
              />
              <Label className="form-check-label">Yes   </Label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name={`question_${question.id}`}
                value={0}
                disabled={submitted}
                onChange={() => handleAnswer(question.id, 0)}
                style={{ backgroundColor: '#ff9999' }}
              />
              <Label className="form-check-label">No</Label>
            </div>
          </RadioWrapper>
        </Question>
      ))}
            </QuestionColumn>

      {currentChunkIndex > 0 && currentChunkIndex < questionChunks.length - 1 && (
        <BackButton disabled={submitted} onClick={handleBack}>
          Back
        </BackButton>
      )}


{currentChunkIndex < questionChunks.length - 1 ? (
        <SubmitButton disabled={submitted} onClick={handleNext}>      
          Next
        </SubmitButton>
      ) : ( 
        <SubmitButton disabled={submitted} onClick={handleSubmit}>
          Submit
        </SubmitButton>
      )}
    </Container>
  );
};
export default PersonalityTest;  