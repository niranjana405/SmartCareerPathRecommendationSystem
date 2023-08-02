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
        question: 'What is the term used to describe the process of planning, organizing, and controlling financial resources?',
        options: [
          'a) Accounting',
          'b) Finance',
          'c) Marketing',
          'd) Economics',
        ],
        correctAnswer: 'b) Finance',
      },
      {
        question: 'In marketing, what is the process of dividing the market into distinct groups of buyers who have different needs, characteristics, or behaviors?',
        options: [
          'a) Branding',
          'b) Positioning',
          'c) Targeting',
          'd) Segmentation',
        ],
        correctAnswer: 'd) Segmentation',
      },
      {
        question: 'Which financial statement provides a snapshot of a company\'s financial position at a specific point in time?',
    options: [
      'a) Income statement',
      'b) Balance sheet',
      'c) Cash flow statement',
      'd) Statement of retained earnings',
    ],
    correctAnswer: 'b) Balance sheet',
  },
  {
    question: 'What is the process of systematically recording, analyzing, and interpreting financial information?',
    options: [
      'a) Auditing',
      'b) Financial planning',
      'c) Financial analysis',
      'd) Bookkeeping',
    ],
    correctAnswer: 'd) Bookkeeping',
  },
  {
    question: 'In marketing, what is the promotion technique that involves offering free samples, trials, or gifts to potential customers?',
    options: [
      'a) Public relations',
      'b) Sales promotion',
      'c) Advertising',
      'd) Personal selling',
    ],
    correctAnswer: 'b) Sales promotion',
  },
  {
    question: 'Which pricing strategy involves setting the price of a product just below a whole number (e.g., $9.99 instead of $10.00)?',
    options: [
      'a) Penetration pricing',
      'b) Premium pricing',
      'c) Psychological pricing',
      'd) Cost-plus pricing',
    ],
    correctAnswer: 'c) Psychological pricing',
  },
  {
    question: 'What is the term used to describe the risk associated with changes in interest rates, exchange rates, and commodity prices?',
    options: [
      'a) Market risk',
      'b) Credit risk',
      'c) Operational risk',
      'd) Liquidity risk',
    ],
    correctAnswer: 'a) Market risk',
  },
  {
    question: 'In marketing, what is the process of introducing a new product or service to the market?',
    options: [
      'a) Product development',
      'b) Product differentiation',
      'c) Product positioning',
      'd) Product launch',
    ],
    correctAnswer: 'd) Product launch',
  },
  {
    question: 'Which financial ratio measures a company\'s ability to pay off its short-term liabilities with its current assets?',
    options: [
      'a) Debt-to-Equity ratio',
      'b) Current ratio',
      'c) Return on Investment (ROI)',
      'd) Gross Profit Margin',
    ],
    correctAnswer: 'b) Current ratio',
  },
  {
    question: 'What is the term used to describe the process of evaluating the performance of marketing strategies and activities?',
    options: [
      'a) Marketing analysis',
      'b) Marketing research',
      'c) Marketing evaluation',
      'd) Marketing audit',
    ],
    correctAnswer: 'd) Marketing audit',
  },
  {
    question: 'In marketing, what is the process of creating a unique name and image for a product in the consumers\' mind?',
    options: [
      'a) Positioning',
      'b) Branding',
      'c) Targeting',
      'd) Segmentation',
    ],
    correctAnswer: 'b) Branding',
  },
  {
    question: 'Which financial statement shows a company\'s revenue and expenses over a period of time?',
    options: [
      'a) Income statement',
      'b) Balance sheet',
      'c) Cash flow statement',
      'd) Statement of retained earnings',
    ],
    correctAnswer: 'a) Income statement',
  },
  {
    question: 'What is the process of determining the value of an asset or company?',
    options: [
      'a) Financial analysis',
      'b) Valuation',
      'c) Bookkeeping',
      'd) Investment banking',
    ],
    correctAnswer: 'b) Valuation',
  },
  {
    question: 'In marketing, what is the process of influencing potential customers to buy a product or service?',
    options: [
      'a) Advertising',
      'b) Public relations',
      'c) Sales promotion',
      'd) Personal selling',
    ],
    correctAnswer: 'd) Personal selling',
  },
  {
    question: 'Which pricing strategy involves setting a high price to convey a sense of exclusivity and luxury?',
    options: [
      'a) Penetration pricing',
      'b) Premium pricing',
      'c) Psychological pricing',
      'd) Cost-plus pricing',
    ],
    correctAnswer: 'b) Premium pricing',
  },
  {
    question: 'What is the term used to describe the risk of a borrower defaulting on a loan?',
    options: [
      'a) Market risk',
      'b) Credit risk',
      'c) Operational risk',
      'd) Liquidity risk',
    ],
    correctAnswer: 'b) Credit risk',
  },
  {
    question: 'In marketing, what is the process of influencing a consumer\'s perception of a product compared to competitors?',
    options: [
      'a) Product development',
      'b) Product differentiation',
      'c) Product positioning',
      'd) Product launch',
    ],
    correctAnswer: 'c) Product positioning',
  },
  {
    question: 'Which financial ratio measures a company\'s profitability relative to its shareholders\' equity?',
    options: [
      'a) Debt-to-Equity ratio',
      'b) Current ratio',
      'c) Return on Equity (ROE)',
      'd) Gross Profit Margin',
    ],
    correctAnswer: 'c) Return on Equity (ROE)',
  },
  {
    question: 'What is the term used to describe the process of evaluating the performance of a company\'s marketing campaigns?',
    options: [
      'a) Marketing analysis',
      'b) Marketing research',
      'c) Marketing evaluation',
      'd) Marketing audit',
    ],
    correctAnswer: 'a) Marketing analysis',
  },
  {
    question: 'Which type of marketing involves using social media platforms to promote a product or service?',
    options: [
      'a) Digital marketing',
      'b) Content marketing',
      'c) Influencer marketing',
      'd) Guerrilla marketing',
    ],
    correctAnswer: 'a) Digital marketing',
  },
];

const badges = [
  { scoreThreshold: 18, label: 'Health Novice', color: 'primary' },
  { scoreThreshold: 15, label: 'Health Enthusiast', color: 'secondary' },
  { scoreThreshold: 5, label: 'Health Pro', color: 'error' },
];

const Finance = () => {
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

export default Finance;
