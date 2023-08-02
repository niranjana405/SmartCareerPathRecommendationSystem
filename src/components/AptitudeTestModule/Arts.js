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
        question: 'What is the primary tool used for capturing moving images and videos?',
    options: ['a) Camera', 'b) Microphone', 'c) Paintbrush', 'd) Piano'],
    correctAnswer: 'a) Camera',
  },
  {
    question: 'Which of the following file formats is commonly used for audio recordings?',
    options: ['a) MP3', 'b) PNG', 'c) PDF', 'd) TXT'],
    correctAnswer: 'a) MP3',
  },
  {
    question: 'What type of software is used for editing videos and movies?',
    options: ['a) Spreadsheet software', 'b) Video editing software', 'c) Word processing software', 'd) Graphic design software'],
    correctAnswer: 'b) Video editing software',
  },
  {
    question: 'Which career path involves creating visual concepts for various forms of media?',
    options: ['a) Architect', 'b) Graphic designer', 'c) Chef', 'd) Accountant'],
    correctAnswer: 'b) Graphic designer',
  },
  {
    question: 'In the context of audio technology, what does "DAW" stand for?',
    options: ['a) Digital Art Workshop', 'b) Digital Audio Workspace', 'c) Data Analysis Widget', 'd) Dynamic Animation Wizard'],
    correctAnswer: 'b) Digital Audio Workspace',
  },
  {
    question: 'Which of the following is a type of communication technology used for long-distance communication?',
    options: ['a) Satellite', 'b) Microwave', 'c) Toaster', 'd) Blender'],
    correctAnswer: 'a) Satellite',
},
{
  question: 'What does "URL" stand for in the context of the internet?',
  options: ['a) Uniform Resource Locator', 'b) Universal Routing Language', 'c) User Response Log', 'd) Underwater Rescue Line'],
  correctAnswer: 'a) Uniform Resource Locator',
},
{
  question: '8. Which career involves writing and creating content for websites, blogs, and social media?',
  options: ['a) Chef', 'b) Graphic designer', 'c) Web content writer', 'd) Architect'],
  correctAnswer: 'c) Web content writer',
},
{
  question: 'What is the purpose of using a green screen in video production?',
  options: ['a) To add special effects', 'b) To serve as a background for interviews', 'c) To display text and graphics', 'd) To record audio'],
  correctAnswer: 'a) To add special effects',
},
{
  question: 'Which career involves creating and producing music recordings?',
  options: ['a) Music producer', 'b) Architect', 'c) Graphic designer', 'd) Chef'],
  correctAnswer: 'a) Music producer',
},
{
    question: 'What is the standard frame rate used in most video productions?',
    options: ['a) 24 fps', 'b) 30 fps', 'c) 60 fps', 'd) 120 fps'],
    correctAnswer: 'a) 24 fps',
  },
  {
    question: 'Which type of microphone is best suited for recording vocals?',
    options: ['a) Dynamic microphone', 'b) Condenser microphone', 'c) Ribbon microphone', 'd) USB microphone'],
    correctAnswer: 'b) Condenser microphone',
  },
  {
    question: 'In graphic design, what is the term for combining multiple images and elements into one cohesive design?',
    options: ['a) Clipping path', 'b) Image masking', 'c) Compositing', 'd) Pixelation'],
    correctAnswer: 'c) Compositing',
  },
  {
    question: 'What software is commonly used for creating vector-based graphics and illustrations?',
    options: ['a) Adobe Photoshop', 'b) CorelDRAW', 'c) Final Cut Pro', 'd) Microsoft Word'],
    correctAnswer: 'b) CorelDRAW',
  },
  {
    question: 'Which career involves operating audio equipment during live events, concerts, or broadcasts?',
    options: ['a) Sound designer', 'b) Music producer', 'c) Audio engineer', 'd) Web content writer'],
    correctAnswer: 'c) Audio engineer',
  },
  {
    question: 'In video production, what does the term "B-roll" refer to?',
    options: ['a) The main footage of a scene', 'b) The editing process', 'c) The final cut of a video', 'd) Supplementary footage'],
    correctAnswer: 'd) Supplementary footage',
  },
  {
    question: 'Which type of lighting is used to create dramatic shadows in photography and film?',
    options: ['a) Key light', 'b) Fill light', 'c) Backlight', 'd) Rembrandt lighting'],
    correctAnswer: 'd) Rembrandt lighting',
  },
  {
    question: 'What is the purpose of a teleprompter in video production?',
    options: ['a) To display video clips', 'b) To record audio', 'c) To create special effects', 'd) To display scripted text'],
    correctAnswer: 'd) To display scripted text',
  },
  {
    question: 'What is the name of the process that involves removing unwanted background noise from audio recordings?',
    options: ['a) Noise cancellation', 'b) Audio restoration', 'c) Noise reduction', 'd) Sound isolation'],
    correctAnswer: 'c) Noise reduction',
  },
  {
    question: 'Which career involves creating visual effects and animations for movies, TV shows, or video games?',
    options: ['a) Video editor', 'b) Animator', 'c) Graphic designer', 'd) Architect'],
    correctAnswer: 'b) Animator',
  },
    
];

const badges = [
  { scoreThreshold: 18, label: 'Health Novice', color: 'primary' },
  { scoreThreshold: 15, label: 'Health Enthusiast', color: 'secondary' },
  { scoreThreshold: 5, label: 'Health Pro', color: 'error' },
];

const Arts = () => {
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

export default Arts;
