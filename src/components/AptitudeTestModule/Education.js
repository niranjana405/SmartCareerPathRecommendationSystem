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
    question: 'What is the primary role of a teacher?',
    options: [
      'a) To maintain discipline in the classroom',
      'b) To provide emotional support to students',
      'c) To deliver quality education and facilitate learning',
      'd) To create lesson plans only',
    ],
    correctAnswer: 'c) To deliver quality education and facilitate learning',
  },
  {
    question: 'What is the term for a systematic approach to learning that involves setting objectives, designing instructional activities, and assessing the outcomes?',
    options: ['a) Pedagogy', 'b) Andragogy', 'c) Curriculum', 'd) Instructional Design'],
    correctAnswer: 'd) Instructional Design',
  },
  {
    question: 'Which teaching method encourages students to learn by doing and actively participate in the learning process?',
    options: [
        'a) Lecture-based teaching',
      'b) Inquiry-based teaching',
      'c) Rote learning',
      'd) Direct instruction',
    ],
    correctAnswer: 'b) Inquiry-based teaching',
  },
  {
    question: 'What is the term for the process of assessing and evaluating a student’s learning progress?',
    options: ['a) Grading', 'b) Testing', 'c) Assessment', 'd) Evaluation'],
    correctAnswer: 'c) Assessment',
  },
  {
    question: 'In education, what does IEP stand for?',
    options: [
      'a) Individualized Education Plan',
      'b) International Education Program',
      'c) Integrated Education Platform',
      'd) Inclusive Education Practice',
    ],
    correctAnswer: 'a) Individualized Education Plan',
  },
  {
    question: 'Which of the following is an essential skill for effective classroom management?',
    options: ['a) Punishment', 'b) Authoritarianism', 'c) Empathy', 'd) Strict rules'],
    correctAnswer: 'c) Empathy',
  },
  {
    question: 'What is the term for an approach to education that tailors the instruction to each student’s learning needs and pace?',
    options: [
      'a) Differentiated instruction',
      'b) Standardized instruction',
      'c) Conventional instruction',
      'd) Uniform instruction',
    ],
    correctAnswer: 'a) Differentiated instruction',
  },
  {
    question: 'What is the primary goal of professional development for educators?',
    options: [
      'a) To increase vacation time',
      'b) To advance to administrative positions',
      'c) To enhance teaching skills and knowledge',
      'd) To receive salary raises',
    ],
    correctAnswer: 'c) To enhance teaching skills and knowledge',
  },
  {
    question: 'In education, what does ESL stand for?',
    options: [
      'a) Extra Schooling and Learning',
      'b) English as a Second Language',
      'c) Easy and Simple Learning',
      'd) Effective Student Learning',
    ],
    correctAnswer: 'b) English as a Second Language',
  },
  {
    question: 'What is the term for the process of guiding and supporting a student in achieving their academic and personal goals?',
    options: ['a) Mentorship', 'b) Teaching', 'c) Classroom management', 'd) Discipline'],
    correctAnswer: 'a) Mentorship',
  },
  {
    question: 'Which learning theory suggests that learning occurs through observation and imitation of others?',
    options: ['a) Cognitive theory', 'b) Behaviorism', 'c) Constructivism', 'd) Social learning theory'],
    correctAnswer: 'd) Social learning theory',
  },
  {
    question: 'What is the term for the process of identifying and addressing the individual needs of students with learning difficulties or disabilities?',
    options: ['a) Differentiated instruction', 'b) Inclusive education', 'c) Special education', 'd) Gifted education'],
    correctAnswer: 'c) Special education',
  },
  {
    question: 'In education, what does IEP stand for?',
    options: [
      'a) Individualized Education Plan',
      'b) International Education Program',
      'c) Integrated Education Platform',
      'd) Inclusive Education Practice',
    ],
    correctAnswer: 'a) Individualized Education Plan',
  },
  {
    question: 'What is the term for an assessment that is conducted before the start of a learning program to gauge the students’ existing knowledge and skills?',
    options: ['a) Summative assessment', 'b) Formative assessment', 'c) Diagnostic assessment', 'd) Norm-referenced assessment'],
    correctAnswer: 'c) Diagnostic assessment',
  },
  {
    question: 'Which teaching approach focuses on encouraging students to explore and learn at their own pace, often using hands-on activities?',
    options: ['a) Direct instruction', 'b) Flipped classroom', 'c) Montessori method', 'd) Inquiry-based learning'],
    correctAnswer: 'c) Montessori method',
  },
  {
    question: 'What is the term for a teaching strategy that involves breaking down complex concepts into smaller, manageable parts?',
    options: ['a) Scaffolded instruction', 'b) Project-based learning', 'c) Whole language approach', 'd) Direct instruction'],
    correctAnswer: 'a) Scaffolded instruction',
  },
  {
    question: 'In education, what does ESL stand for?',
    options: [
      'a) Extra Schooling and Learning',
      'b) English as a Second Language',
      'c) Easy and Simple Learning',
      'd) Effective Student Learning',
    ],
    correctAnswer: 'b) English as a Second Language',
  },
  {
    question: 'What is the term for the process of guiding and supporting a student in achieving their academic and personal goals?',
    options: ['a) Mentorship', 'b) Teaching', 'c) Classroom management', 'd) Discipline'],
    correctAnswer: 'a) Mentorship',
  },
  {
    question: 'Which of the following skills is essential for effective classroom communication?',
    options: ['a) Speaking only', 'b) Listening only', 'c) Non-verbal communication', 'd) Writing only'],
    correctAnswer: 'c) Non-verbal communication',
  },
  {
    question: 'What is the term for the process of continuous professional development for educators?',
    options: ['a) Teacher training', 'b) Lifelong learning', 'c) In-service education', 'd) Professional learning community'],
    correctAnswer: 'c) In-service education',
  },
];

const badges = [
  { scoreThreshold: 18, label: 'Health Novice', color: 'primary' },
  { scoreThreshold: 15, label: 'Health Enthusiast', color: 'secondary' },
  { scoreThreshold: 5, label: 'Health Pro', color: 'error' },
];

const Education = () => {
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

export default Education;
