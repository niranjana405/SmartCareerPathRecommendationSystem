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
        question: 'What is the primary function of an architect?',
        options: [
          'a) Designing buildings and structures',
          'b) Constructing roads and highways',
          'c) Managing financial transactions',
          'd) Performing surgery on patients',
        ],
        correctAnswer: 'a) Designing buildings and structures',
      },
      {
        question: 'Which of the following is an example of a load-bearing structure?',
        options: ['a) Wooden plank', 'b) Curtain wall', 'c) Concrete pillar', 'd) Glass panel'],
        correctAnswer: 'c) Concrete pillar',
      },
      {
        question: 'What is the purpose of a building foundation?',
        options: [
          'a) To provide a flat surface for the building',
          'b) To enhance the aesthetics of the building',
          'c) To support the building and transfer loads to the ground',
          'd) To serve as a recreational space for residents',
        ],
        correctAnswer: 'c) To support the building and transfer loads to the ground',
      },
      {
        question: 'What is the role of an interior designer?',
        options: [
          'a) Creating architectural blueprints',
          'b) Installing plumbing and electrical systems',
          'c) Selecting furnishings and decorations for indoor spaces',
          'd) Conducting soil testing for construction sites',
        ],
        correctAnswer: 'c) Selecting furnishings and decorations for indoor spaces',
  },
  {
    question: 'Which construction material is known for its high strength and durability?',
    options: ['a) Wood', 'b) Glass', 'c) Brick', 'd) Aluminum'],
    correctAnswer: 'c) Brick',
  },
  {
    question: 'Which type of architectural style is known for its use of natural materials and open spaces?',
    options: [
      'a) Modern',
      'b) Gothic',
      'c) Art Deco',
      'd) Organic',
    ],
    correctAnswer: 'd) Organic',
  },
  {
    question: 'What is the purpose of an HVAC system in a building?',
    options: [
      'a) Providing electrical power to the building',
      'b) Ensuring water supply throughout the building',
      'c) Heating, Ventilation, and Air Conditioning',
      'd) Monitoring security cameras',
    ],
    correctAnswer: 'c) Heating, Ventilation, and Air Conditioning',
  },
  {
    question: 'In construction, what does the term "blueprint" refer to?',
    options: [
      'a) A detailed plan of the building with dimensions and specifications',
      'b) A type of paper used for art sketches',
      'c) A blueprint for future business expansion',
      'd) The color of the building design',
    ],
    correctAnswer: 'a) A detailed plan of the building with dimensions and specifications',
  },
  {
    question: 'Which construction material is commonly used for roofing due to its waterproof properties?',
    options: [
        'a) Steel',
      'b) Copper',
      'c) Asphalt',
      'd) Plastic',
    ],
    correctAnswer: 'c) Asphalt',
  },
  {
    question: 'What is the primary function of a civil engineer in the construction industry?',
    options: [
      'a) Creating artistic designs for buildings',
      'b) Managing financial transactions for construction projects',
      'c) Planning and overseeing construction projects like roads and bridges',
      'd) Installing electrical and plumbing systems in buildings',
    ],
    correctAnswer: 'c) Planning and overseeing construction projects like roads and bridges',
  },
  {
    question: 'Which type of foundation is suitable for buildings located in areas with expansive soils?',
    options: [
      'a) Slab-on-grade foundation',
      'b) Pier and beam foundation',
      'c) Basements',
      'd) Crawl space foundation',
    ],
    correctAnswer: 'b) Pier and beam foundation',
  },
  {
    question: 'What is the role of an urban planner?',
    options: [
      'a) Designing interior spaces in buildings',
      'b) Planning and organizing city development and infrastructure',
      'c) Managing financial accounts for construction companies',
      'd) Conducting soil tests for construction sites',
    ],
    correctAnswer: 'b) Planning and organizing city development and infrastructure',
  },
  {
    question: 'Which construction material is known for its resistance to fire?',
    options: [
      'a) Timber',
      'b) Brick',
      'c) Plastic',
      'd) Gypsum board',
    ],
    correctAnswer: 'd) Gypsum board',
  },
  {
    question: 'What is the purpose of a construction permit?',
    options: [
      'a) To certify that the building design is eco-friendly',
      'b) To allow a building to be constructed without approval',
      'c) To ensure compliance with building codes and regulations',
      'd) To provide financial assistance to construction projects',
    ],
    correctAnswer: 'c) To ensure compliance with building codes and regulations',
  },
  {
    question: 'In architecture, what does the term "façade" refer to?',
    options: [
      'a) The interior layout of a building',
      'b) The backside of a building',
      'c) The main exterior face or front of a building',
      'd) A decorative element inside a building',
    ],
    correctAnswer: 'c) The main exterior face or front of a building',
  },
  {
    question: 'What does LEED certification stand for in the construction industry?',
    options: [
      'a) Low Energy and Environmental Design',
      'b) Leadership in Energy and Environmental Design',
      'c) Limited Environmental Efficiency Design',
      'd) Low Emission and Energy Development',
    ],
    correctAnswer: 'b) Leadership in Energy and Environmental Design',
  },
  {
    question: ' What is the purpose of a load-bearing wall in a building?',
    options: [
      'a) To create a visually appealing interior design',
      'b) To support the weight of the building and transfer it to the foundation',
      'c) To provide additional space for storage',
      'd) To improve acoustic properties within the building',
    ],
    correctAnswer: 'b) To support the weight of the building and transfer it to the foundation',
  },
  {
    question: 'Which construction material is commonly used for framing houses?',
    options: [
      'a) Concrete',
      'b) Steel',
      'c) Glass',
      'd) Wood',
    ],
    correctAnswer: 'd) Wood',
  },
  {
    question: 'In architectural drawings, what does the abbreviation "ELEV" stand for?',
    options: [
      'a) Elevation',
      'b) Electrical Diagram',
      'c) Estimate Value',
      'd) Excavation Details',
    ],
    correctAnswer: 'a) Elevation',
  },
  {
    question: ' What is the purpose of a construction punch list?',
    options: [
      'a) To record the names of all the workers on the construction site',
      'b) To list the tools and equipment required for a construction project',
      'c) To document any remaining work or corrections needed before project completion',
      'd) To outline the marketing strategy for selling a finished building',
    ],
    correctAnswer: 'c) To document any remaining work or corrections needed before project completion',
  },
];

const badges = [
  { scoreThreshold: 18, label: 'Health Novice', color: 'primary' },
  { scoreThreshold: 15, label: 'Health Enthusiast', color: 'secondary' },
  { scoreThreshold: 5, label: 'Health Pro', color: 'error' },
];

const Architecture = () => {
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

export default Architecture;
