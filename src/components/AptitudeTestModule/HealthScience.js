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
    question: 'What is the main organ responsible for pumping blood in the human body?',
    options: ['Heart', 'Lungs', 'Liver', 'Kidneys'],
    correctAnswer: 'Heart',
  },
  {
    question: 'Which vitamin is essential for proper vision?',
    options: ['Vitamin C', 'Vitamin A', 'Vitamin D', 'Vitamin B'],
    correctAnswer: 'Vitamin A',
  },
  {
    question: 'What is the primary function of the respiratory system?',
    options: ['a) Digestion', 'b) Breathing and gas exchange', 'c) Pumping blood', 'd) Vision'],
    correctAnswer: 'b) Breathing and gas exchange',
  },
  {
    question: 'Which of the following is NOT a major organ in the digestive system?',
    options: ['a) Liver', 'b) Stomach', 'c) Brain', 'd) Small intestine'],
    correctAnswer: 'c) Brain',
  },
  {
    question: 'What is the name of the largest artery in the human body?',
    options: ['a) Pulmonary artery', 'b) Aorta', 'c) Femoral artery', 'd) Carotid artery'],
    correctAnswer: 'b) Aorta',
  },
  {
    question: 'Which type of blood cells are responsible for carrying oxygen throughout the body?',
    options: ['a) White blood cells', 'b) Platelets', 'c) Red blood cells', 'd) Plasma'],
    correctAnswer: 'c) Red blood cells',
  },
  {
    question: 'Which body system is responsible for producing and releasing hormones into the bloodstream?',
    options: ['a) Nervous system', 'b) Endocrine system', 'c) Immune system', 'd) Muscular system'],
    correctAnswer: 'b) Endocrine system',
  },
  {
    question: 'What is the main function of the kidneys in the human body?',
    options: ['a) Digestion', 'b) Filtration and waste removal', 'c) Producing insulin', 'd) Controlling body temperature'],
    correctAnswer: 'b) Filtration and waste removal',
  },
  {
    question: 'Which of the following is a communicable disease?',
    options: ['a) Diabetes', 'b) Influenza (Flu)', 'c) Hypertension', 'd) Arthritis'],
    correctAnswer: 'b) Influenza (Flu)',
  },
  {
    question: 'What is the recommended daily intake of water for an average adult?',
    options: ['a) 1 liter', 'b) 2 liters', 'c) 3 liters', 'd) 4 liters'],
    correctAnswer: 'b) 2 liters',
  },
  {
    question: 'Which of the following is a common symptom of a heart attack?',
    options: ['a) Fever', 'b) Chest pain or discomfort', 'c) Headache', 'd) Muscle cramps'],
    correctAnswer: 'b) Chest pain or discomfort',
  },
  {
    question: 'What is the main function of the cerebrum in the brain?',
    options: ['a) Breathing control', 'b) Coordination of movement', 'c) Memory and thinking', 'd) Digestion'],
    correctAnswer: 'c) Memory and thinking',
  },
  {
    question: 'What is the name of the condition characterized by high blood sugar levels?',
    options: ['a) Hypertension', 'b) Hyperglycemia', 'c) Hypoglycemia', 'd) Hyperactivity'],
    correctAnswer: 'b) Hyperglycemia',
  },
  {
    question: 'What is the main function of the lymphatic system?',
    options: ['a) Transportation of oxygen', 'b) Regulation of body temperature', 'c) Filtration and immune defense', 'd) Digestion of food'],
    correctAnswer: 'c) Filtration and immune defense',
  },
  {
    question: 'Which of the following is an example of an aerobic exercise?',
    options: ['a) Weightlifting', 'b) Yoga', 'c) Running', 'd) Sprinting'],
    correctAnswer: 'c) Running',
  },
  {
    question: 'What is the name of the protein responsible for carrying oxygen in red blood cells?',
    options: ['a) Insulin', 'b) Hemoglobin', 'c) Collagen', 'd) Enzyme'],
    correctAnswer: 'b) Hemoglobin',
  },
  {
    question: 'What is the recommended daily intake of fruits and vegetables for a healthy diet?',
    options: ['a) 1 serving', 'b) 3 servings', 'c) 5 servings', 'd) 10 servings'],
    correctAnswer: 'c) 3 servings',
  },
  {
    question: 'Which of the following is NOT a symptom of dehydration?',
    options: ['a) Thirst', 'b) Dry mouth', 'c) Frequent urination', 'd) Dizziness'],
    correctAnswer: 'c) Frequent urination',
  },
  {
    question: 'What is the scientific name for the collarbone?',
    options: ['a) Humerus', 'b) Clavicle', 'c) Femur', 'd) Radius'],
    correctAnswer: 'b) Clavicle',
  },
  {
    question: 'What is the purpose of the immune system in the human body?',
    options: ['a) Transportation of nutrients', 'b) Regulating body temperature', 'c) Fighting off infections and diseases', 'd) Controlling blood pressure'],
    correctAnswer: 'c) Fighting off infections and diseases',
  },
  {
    question: 'Which of the following is a type of personal protective equipment (PPE) commonly used in healthcare settings?',
    options: ['a) Hard hat', 'b) Safety goggles', 'c) Oven mitts', 'd) Apron'],
    correctAnswer: 'b) Safety goggles',
  },

];

const badges = [
  { scoreThreshold: 18, label: 'Health Novice', color: 'primary' },
  { scoreThreshold: 15, label: 'Health Enthusiast', color: 'secondary' },
  { scoreThreshold: 5, label: 'Health Pro', color: 'error' },
];

const HealthScienceAptitudeTest = () => {
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

export default HealthScienceAptitudeTest;
