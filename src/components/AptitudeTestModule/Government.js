import React, { useState } from 'react';
import { CheckCircle } from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Badge  from '@mui/material/Badge';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './Question.css';
const questions = [
    {
    question: 'What type of government system does the United States have?',
    options: ['a) Democracy', 'b) Monarchy', 'c) Dictatorship', 'd) Oligarchy'],
    correctAnswer: 'a) Democracy',
  },
  {
    question: 'Who is the head of state and the ceremonial leader of the United Kingdom?',
    options: ['a) Prime Minister', 'b) President', 'c) King', 'd) Queen'],
    correctAnswer: 'd) Queen',
  },
  {
    question: 'What is the highest court in the United States?',
    options: ['a) Supreme Court', 'b) District Court', 'c) Circuit Court', 'd) Appellate Court'],
    correctAnswer: 'a) Supreme Court',
  },
  {
    question: 'How often are presidential elections held in the United States?',
    options: ['a) Every 2 years', 'b) Every 4 years', 'c) Every 6 years', 'd) Every 8 years'],
    correctAnswer: 'b) Every 4 years',
  },
  {
    question: 'Which branch of the U.S. government is responsible for making laws?',
    options: ['a) Executive branch', 'b) Judicial branch', 'c) Legislative branch', 'd) Administrative branch'],
    correctAnswer: 'c) Legislative branch',
  },
  {
    question: 'What is the primary role of the United Nations?',
    options: ['a) Promote global trade', 'b) Maintain world peace', 'c) Enforce international law', 'd) Regulate international finance'],
    correctAnswer: 'b) Maintain world peace',
  },
  {
    question: 'Who has the power to declare war in the United States?',
    options: ['a) President', 'b) Congress', 'c) Supreme Court', 'd) Secretary of Defense'],
    correctAnswer: 'b) Congress',
  },
  {
    question: 'What is the process called when the U.S. Senate approves a presidential appointment?',
    options: ['a) Confirmation', 'b) Ratification', 'c) Endorsement', 'd) Validation'],
    correctAnswer: 'a) Confirmation',
  },
  {
    question: 'What is the term length for a U.S. Senator?',
    options: ['a) 2 years', 'b) 4 years', 'c) 6 years', 'd) 8 years'],
    correctAnswer: 'c) 6 years',
  },
  {
    question: 'Which amendment to the U.S. Constitution guarantees freedom of speech?',
    options: ['a) First Amendment', 'b) Fourth Amendment', 'c) Tenth Amendment', 'd) Twenty-Second Amendment'],
    correctAnswer: 'a) First Amendment',
  },
  {
    question: 'Which branch of government interprets the laws and ensures they are constitutional?',
    options: ['a) Executive branch', 'b) Judicial branch', 'c) Legislative branch', 'd) Administrative branch'],
    correctAnswer: 'b) Judicial branch',
  },
  {
    question: 'Who is the Commander-in-Chief of the United States Armed Forces?',
    options: ['a) Secretary of Defense', 'b) Chairman of the Joint Chiefs of Staff', 'c) President', 'd) Vice President'],
    correctAnswer: 'c) President',
  },
  {
    question: 'In the United States, how many members are there in the House of Representatives?',
    options: ['a) 50', 'b) 100', 'c) 435', 'd) 538'],
    correctAnswer: 'c) 435',
},
{
  question: 'What is the term length for a U.S. President?',
  options: ['a) 2 years', 'b) 4 years', 'c) 6 years', 'd) 8 years'],
  correctAnswer: 'b) 4 years',
},
{
  question: 'What is the process of amending the U.S. Constitution?',
  options: ['a) Presidential Approval', 'b) Congressional Approval', 'c) Supreme Court Decision', 'd) Ratification by States'],
  correctAnswer: 'd) Ratification by States',
},
{
  question: 'Which federal agency is responsible for conducting the U.S. Census?',
  options: ['a) Internal Revenue Service (IRS)', 'b) Federal Bureau of Investigation (FBI)', 'c) Central Intelligence Agency (CIA)', 'd) U.S. Census Bureau'],
  correctAnswer: 'd) U.S. Census Bureau',
},
{
    question: 'How many total amendments are there in the U.S. Constitution?',
    options: ['a) 10', 'b) 20', 'c) 27', 'd) 35'],
    correctAnswer: 'c) 27',
  },
  {
    question: 'Who is the current Chief Justice of the U.S. Supreme Court?',
    options: ['a) John Roberts', 'b) Ruth Bader Ginsburg', 'c) Sonia Sotomayor', 'd) Clarence Thomas'],
    correctAnswer: 'a) John Roberts',
  },
  {
    question: 'What is the primary function of the Department of Homeland Security?',
    options: ['a) Environmental Protection', 'b) Immigration Enforcement', 'c) Foreign Affairs', 'd) Space Exploration'],
    correctAnswer: 'b) Immigration Enforcement',
  },
  {
    question: 'In the United States, which document outlines the fundamental rights and freedoms of citizens?',
    options: ['a) Declaration of Independence', 'b) Emancipation Proclamation', 'c) Bill of Rights', 'd) Articles of Confederation'],
    correctAnswer: 'c) Bill of Rights',
  },
];

const badges = [
  { scoreThreshold: 18, label: 'Health Novice', color: 'primary' },
  { scoreThreshold: 15, label: 'Health Enthusiast', color: 'secondary' },
  { scoreThreshold: 5, label: 'Health Pro', color: 'error' },
];

const Government = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill('')); // Store user's answers

  const handleAnswer = (selectedAnswer) => {
    // Update user's answer for the current question
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = selectedAnswer;
    setAnswers(updatedAnswers);

    // Check if the answer is correct and update the score
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }


    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  const handleSubmit = () => {
    setCurrentQuestion(questions.length); // Set currentQuestion to a value beyond the last question
  };
  const resetTest = () => {
    setCurrentQuestion(0);
    setScore(0);
    setAnswers(Array(questions.length).fill(''));
  };

  const calculateBadges = () => {
    const activeBadges = badges.filter((badge) => score >= badge.scoreThreshold);
    return activeBadges.map((badge, index) => (
      <Badge key={index} badgeContent={<CheckCircle />} color={badge.color}>
        <Typography variant="body2">{badge.label}</Typography>
      </Badge>
    ));
  };
  
          
  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      <Paper elevation={3} style={{ padding: '2rem' }}>
        {currentQuestion < questions.length ? (
          <>
            <Typography variant="h5">Question {currentQuestion + 1}</Typography>
            <Typography variant="body1">{questions[currentQuestion].question}</Typography>
            <Grid container spacing={2}>
              {questions[currentQuestion].options.map((option, index) => (
                <Grid item xs={6} key={index}>
                  <Button
                    fullWidth
                    variant="outlined"
                    style={{
                      backgroundColor: answers[currentQuestion] === option ? '' : 'lightblue',
                      color: 'black',
                    }}
                    onClick={() => handleAnswer(option)}
                  >
                    {option}
                    </Button>
                </Grid>

              ))}
            </Grid>
            {currentQuestion === questions.length - 1 ? (
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Submit
              </Button>
            ) : (
              <Button variant="contained" color="primary" onClick={() => setCurrentQuestion(currentQuestion + 1)}>
             Skip Question
              </Button>
            )}
          </>
        ) : (
          <>
            <Typography variant="h5">Test Completed</Typography>
            <Typography variant="body1">Your score: {score}</Typography>
            <Typography variant="body2">Badges earned:</Typography>
            {calculateBadges()}
            <Button variant="contained" color="primary" onClick={resetTest}>
              Retake Test
            </Button>
          </>
        )}
      </Paper>
    </Container>
    );
  };

export default Government;
