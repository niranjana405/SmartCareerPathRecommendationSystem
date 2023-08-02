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
        question: 'What is the primary language used for building web applications?',
        options: ['Java', 'Python', 'JavaScript', 'C++'],
        correctAnswer: 'JavaScript',
      },
      {
        question: 'Which technology is used for styling web pages?',
        options: ['HTML', 'CSS', 'JavaScript', 'Python'],
        correctAnswer: 'CSS',
      },
      {
        question: 'What is the purpose of a database in web development?',
        options: ['Handling user authentication', 'Displaying web pages', 'Storing data', 'Sending emails'],
        correctAnswer: 'Storing data',
      },
      {
        question: 'What does API stand for in the context of software development?',
        options: ['Application Programming Interface', 'Automated Programming Interface', 'Advanced Programming Interface', 'Application Programming Interchange'],
        correctAnswer: 'Application Programming Interface',
      },
      {
        question: 'Which cloud computing service is known for providing virtual servers?',
        options: ['Azure', 'Google Cloud', 'AWS', 'Heroku'],
        correctAnswer: 'AWS',
      },
      {
        question: 'What is the purpose of the "git" version control system?',
        options: [
          'Managing databases',
          'Tracking changes in source code',
          'Sending emails',
          'Creating animations',
        ],
        correctAnswer: 'Tracking changes in source code',
      },
      {
        question: 'Which data structure follows the Last-In-First-Out (LIFO) principle?',
        options: ['Queue', 'Stack', 'List', 'Tree'],
        correctAnswer: 'Stack',
      },
      {
        question: 'What does CPU stand for in computer hardware?',
    options: [
      'Central Processing Unit',
      'Computer Processing Unit',
      'Control Processing Unit',
      'Central Program Unit',
    ],
    correctAnswer: 'Central Processing Unit',
  },
  {
    question: 'Which programming language is often used for data analysis and statistics?',
    options: ['Java', 'Python', 'C#', 'Ruby'],
    correctAnswer: 'Python',
  },
  {
    question: 'What is the function of an IP address?',
    options: [
      'Identifying a website domain name',
      'Storing data on a server',
      'Routing network traffic',
      'Managing user authentication',
    ],
    correctAnswer: 'Routing network traffic',
  },
  {
    question: 'What is the purpose of a firewall in network security?',
    options: [
      'Encrypting data transmissions',
      'Detecting and blocking malware',
      'Managing database access',
      'Optimizing website performance',
    ],
    correctAnswer: 'Detecting and blocking malware',
  },
  {
    question: 'What does HTML stand for in web development?',
    options: [
      'HyperText Markup Language',
      'Home Tool Markup Language',
      'High Tech Markup Language',
      'Hyperlink and Text Markup Language',
    ],
    correctAnswer: 'HyperText Markup Language',
  },
  {
    question: 'Which software development approach emphasizes incremental progress and flexibility?',
    options: ['Agile', 'Waterfall', 'Scrum', 'Spiral'],
    correctAnswer: 'Agile',
},
{
  question: 'Which programming language is commonly used for creating web applications?',
  options: ['C++', 'Ruby', 'JavaScript', 'Swift'],
  correctAnswer: 'JavaScript',
},
{
  question: 'What is the purpose of SQL in database management?',
  options: [
    'Styling web pages',
    'Managing server hardware',
    'Creating animations',
    'Querying and manipulating data',
  ],
  correctAnswer: 'Querying and manipulating data',
  },
  {
    question: 'Which IT concept refers to a secure method of verifying a user’s identity?',
    options: ['Password', 'Encryption', 'Authentication', 'Firewall'],
    correctAnswer: 'Authentication',
  },
  {
    question: 'What does CSS stand for in web development?',
    options: [
      'Computer Style Sheets',
      'Cascading Style Sheets',
      'Colorful Style Sheets',
      'Creative Style Sheets',
    ],
    correctAnswer: 'Cascading Style Sheets',
  },
  {
    question: 'Which data structure follows the First-In-First-Out (FIFO) principle?',
    options: ['Queue', 'Stack', 'List', 'Tree'],
    correctAnswer: 'Queue',
  },
  {
    question: 'What is the purpose of a VPN (Virtual Private Network) in network security?',
    options: [
      'Managing user authentication',
      'Routing network traffic',
      'Encrypting data transmissions',
      'Securing data communication over the internet',
    ],
    correctAnswer: 'Securing data communication over the internet',
  },
  {
    question: 'Which programming paradigm focuses on "stateless" computations?',
    options: ['Object-Oriented Programming', 'Functional Programming', 'Procedural Programming', 'Event-Driven Programming'],
    correctAnswer: 'Functional Programming',
  },


];

const badges = [
  { scoreThreshold: 18, label: 'Health Novice', color: 'primary' },
  { scoreThreshold: 15, label: 'Health Enthusiast', color: 'secondary' },
  { scoreThreshold: 5, label: 'Health Pro', color: 'error' },
];

const InformationTechnologyAptitudeTest = () => {
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

export default InformationTechnologyAptitudeTest;
