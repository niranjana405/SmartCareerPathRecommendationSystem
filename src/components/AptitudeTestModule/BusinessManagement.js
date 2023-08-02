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
        question: 'Which of the following is not a management function?',
        options: ['a) Planning', 'b) Directing', 'c) Selling', 'd) Controlling'],
        correctAnswer: 'c) Selling',
      },
      {
        question: 'What does SWOT stand for in business analysis?',
        options: ['a) Strengths, Weaknesses, Opportunities, Threats', 'b) Sales, Workflows, Operations, Trends', 'c) Systems, Web, Optimization, Technology', 'd) Strategic, Wise, Objective, Targeted'],
        correctAnswer: 'a) Strengths, Weaknesses, Opportunities, Threats',
      },
      {
        question: 'What type of organizational structure has a clear chain of command and hierarchical relationships?',
        options: ['a) Matrix organization', 'b) Flat organization', 'c) Functional organization', 'd) Network organization'],
        correctAnswer: 'c) Functional organization',
      },
      {
        question: 'The process of setting specific, measurable, achievable, relevant, and time-bound goals is known as:',
    options: ['a) Delegation', 'b) Decentralization', 'c) Benchmarking', 'd) SMART goal setting'],
    correctAnswer: 'd) SMART goal setting',
  },
  {
    question: 'Which type of leadership style involves making all decisions without consulting the team?',
    options: ['a) Laissez-faire leadership', 'b) Democratic leadership', 'c) Autocratic leadership', 'd) Transformational leadership'],
    correctAnswer: 'c) Autocratic leadership',
  },
  {
    question: 'In marketing, the "4Ps" stand for:',
    options: ['a) Product, Price, Place, Promotion', 'b) Planning, Production, Packaging, Profit', 'c) Public Relations, Partnerships, Performance, Profitability', 'd) People, Process, Physical Evidence, Productivity'],
    correctAnswer: 'a) Product, Price, Place, Promotion',
  },
  {
    question: 'What is the process of identifying potential candidates for a job and evaluating their suitability for the position?',
    options: ['a) Training', 'b) Recruitment', 'c) Onboarding', 'd) Appraisal'],
    correctAnswer: 'b) Recruitment',
  },
  {
    question: 'Which financial statement shows the revenues and expenses of a business over a specific period?',
    options: ['a) Balance sheet', 'b) Cash flow statement', 'c) Income statement', 'd) Equity statement'],
    correctAnswer: 'c) Income statement',
  },
  {
    question: 'What is the term for the process of converting inputs into outputs in a business?',
    options: ['a) Strategic planning', 'b) Quality control', 'c) Production', 'd) Distribution'],
    correctAnswer: 'c) Production',
  },
  {
    question: 'In project management, what does the critical path represent?',
    options: ['a) The most important tasks in a project', 'b) The shortest duration for completing the project', 'c) The sequence of tasks that must be completed on time for the project to finish on schedule', 'd) The tasks that can be delayed without impacting the project timeline'],
    correctAnswer: 'c) The sequence of tasks that must be completed on time for the project to finish on schedule',
  },
  {
    question: 'What is the process of systematically comparing a company’s products, services, and processes against those of the industry’s strongest competitors?',
    options: ['a) Benchmarking', 'b) Brainstorming', 'c) Best practices', 'd) Business modeling'],
    correctAnswer: 'a) Benchmarking',
  },
  {
    question: 'In finance, what is the term for the amount of money borrowed or invested?',
    options: ['a) Debt', 'b) Credit', 'c) Interest', 'd) Capital'],
    correctAnswer: 'd) Capital',
  },
  {
    question: 'Which of the following is an essential skill for effective time management?',
    options: ['a) Procrastination', 'b) Delegation', 'c) Multitasking', 'd) Avoiding deadlines'],
    correctAnswer: 'b) Delegation',
  },
  {
    question: 'What is the process of analyzing past performance and setting goals for the future?',
    options: ['a) Risk management', 'b) Forecasting', 'c) Budgeting', 'd) Compliance'],
    correctAnswer: 'b) Forecasting',
  },
  {
    question: 'Which of the following is a characteristic of a successful leader?',
    options: ['a) Micro-management', 'b) Lack of empathy', 'c) Effective communication', 'd) Resistance to change'],
    correctAnswer: 'c) Effective communication',
  },
  {
    question: 'What is the term for a visual representation of the steps in a process or workflow?',
    options: ['a) Decision matrix', 'b) Flowchart', 'c) Pareto chart', 'd) Pie chart'],
    correctAnswer: 'b) Flowchart',
  },
  {
    question: 'Which of the following is a type of negotiation where both parties work together to achieve a win-win outcome?',
    options: ['a) Collaborative negotiation', 'b) Competitive negotiation', 'c) Avoidance negotiation', 'd) Distributive negotiation'],
    correctAnswer: 'a) Collaborative negotiation',
  },
  {
    question: ' What is the term for the process of systematically identifying, assessing, and managing potential risks in a project or business?',
    options: ['a) Risk aversion', 'b) Risk tolerance', 'c) Risk analysis', 'd) Risk management'],
    correctAnswer: 'd) Risk management',
  },
  {
    question: 'What is the term for the process of creating a detailed plan of action to achieve a specific goal?',
    options: ['a) Execution', 'b) Implementation', 'c) Strategic planning', 'd) Operational planning'],
    correctAnswer: 'd) Operational planning',
  },
  {
    question: 'In human resources, what is the process of providing employees with the necessary skills and knowledge to perform their jobs effectively?',
    options: ['a) Recruitment', 'b) Onboarding', 'c) Training', 'd) Performance appraisal'],
    correctAnswer: 'c) Training',
  },
];

const badges = [
  { scoreThreshold: 18, label: 'Health Novice', color: 'primary' },
  { scoreThreshold: 15, label: 'Health Enthusiast', color: 'secondary' },
  { scoreThreshold: 5, label: 'Health Pro', color: 'error' },
];

const BusinessManagement = () => {
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

export default BusinessManagement;
