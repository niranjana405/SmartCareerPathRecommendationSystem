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
        question: 'What type of vehicle is commonly used for long-distance transportation of goods?',
        options: ['Truck', 'Bicycle', 'Scooter', 'Car'],
        correctAnswer: 'Truck',
      },
      {
        question: 'Which mode of transportation is known for its speed and is used for delivering packages in cities?',
        options: ['Ship', 'Train', 'Airplane', 'Bus'],
        correctAnswer: 'Airplane',
      },
      {
        question: 'What do you call a system used for tracking the movement of goods through the supply chain?',
        options: ['Inventory', 'Logistics', 'Warehousing', 'Distribution'],
        correctAnswer: 'Logistics',
      },
      {
        question: 'Which of the following is a common method of material handling in warehouses?',
        options: ['FIFO', 'LIFO', 'HIFO', 'LOFO'],
        correctAnswer: 'FIFO',
      },
      {
        question: 'Which department is responsible for managing the flow of goods in and out of a distribution center?',
        options: ['Finance', 'Human Resources', 'Operations', 'Marketing'],
        correctAnswer: 'Operations',
      },
        {
          question: 'What is the primary mode of transportation used for delivering goods worldwide?',
          options: ['a) Trucks', 'b) Trains', 'c) Ships', 'd) Airplanes'],
          correctAnswer: 'c) Ships',
        },
        {
          question: ' In the context of logistics, what does "LTL" stand for?',
          options: ['a) Less Than Likely', 'b) Load To Lift', 'c) Less Than Load', 'd) Last Time Logistics'],
          correctAnswer: 'c) Less Than Load',
        },
        {
          question: ' Which of the following is an example of intermodal transportation?',
          options: ['a) A truck delivering goods to a nearby warehouse', 'b) A train transporting containers across the country', 'c) A cargo ship carrying goods between continents', 'd) A bicycle courier delivering packages in the city'],
          correctAnswer: 'b) A train transporting containers across the country',
        },
        {
          question: ' What does the term "supply chain" refer to in logistics?',
          options: ['a) The process of supplying products to consumers', 'b) The management of transportation systems', 'c) The network of companies involved in producing and delivering goods', 'd) The chain used to secure cargo during transportation'],
          correctAnswer: 'c) The network of companies involved in producing and delivering goods',
        },
        {
          question: 'Which government agency is responsible for regulating the transportation of hazardous materials?',
          options: ['a) Federal Aviation Administration (FAA)', 'b) Environmental Protection Agency (EPA)', 'c) Department of Transportation (DOT)', 'd) Occupational Safety and Health Administration (OSHA)'],
          correctAnswer: 'c) Department of Transportation (DOT)',
        },
        {
          question: 'What is the purpose of a bill of lading in transportation and logistics?',
          options: ['a) To serve as an invoice for the shipped goods', 'b) To provide directions to the driver', 'c) To act as a contract between the shipper and carrier', 'd) To indicate the weight of the cargo'],
          correctAnswer: 'c) To act as a contract between the shipper and carrier',
        },
        {
          question: ' Which transportation method is typically the fastest for delivering goods internationally?',
          options: ['a) Trucks', 'b) Trains', 'c) Ships', 'd) Airplanes'],
          correctAnswer: 'd) Airplanes',
        },
        {
          question: ' In logistics, what does "3PL" stand for?',
          options: ['a) Third Party Label', 'b) Third Party Logistics', 'c) Third Party Liability', 'd) Three-Point Logistics'],
          correctAnswer: 'b) Third Party Logistics',
        },
        {
          question: ' Which of the following is a key consideration in route planning for transportation?',
          options: ['a) Weather conditions', 'b) Product pricing', 'c) Employee training', 'd) Marketing strategy'],
          correctAnswer: 'a) Weather conditions',
        },
        {
          question: ' What is the purpose of using a pallet in the transportation of goods?',
          options: ['a) To protect goods from theft', 'b) To consolidate multiple smaller items into one shipment', 'c) To provide information about the contents of the shipment', 'd) To comply with weight restrictions'],
          correctAnswer: 'b) To consolidate multiple smaller items into one shipment',
        },
        {
          question: ' What does "FTL" stand for in logistics?',
          options: ['a) Full Truckload', 'b) Freight Transfer License', 'c) Free Trade Logistics', 'd) Forwarding and Transportation Liaison'],
          correctAnswer: 'a) Full Truckload',
        },
        {
          question: ' Which type of transportation is most commonly used for local delivery of goods to customers?',
          options: ['a) Trucks', 'b) Trains', 'c) Ships', 'd) Vans'],
          correctAnswer: 'd) Vans',
        },
        {
          question: ' What is the purpose of using a barcode or RFID in logistics?',
          options: ['a) To track the location of trucks', 'b) To provide directions to drivers', 'c) To monitor employees', 'd) To identify and track goods during transportation'],
          correctAnswer: 'd) To identify and track goods during transportation',
        },
        {
          question: ' Which government agency is responsible for overseeing the safety of commercial motor vehicles?',
          options: ['a) Federal Motor Carrier Safety Administration (FMCSA)', 'b) Federal Highway Administration (FHWA)', 'c) National Highway Traffic Safety Administration (NHTSA)', 'd) Federal Transit Administration (FTA)'],
          correctAnswer: 'a) Federal Motor Carrier Safety Administration (FMCSA)',
        },
        {
          question: ' What is the purpose of using a freight forwarder in logistics?',
          options: ['a) To load and unload cargo from trucks', 'b) To provide insurance for shipped goods', 'c) To manage warehouse operations', 'd) To arrange and coordinate the transportation of goods'],
          correctAnswer: 'd) To arrange and coordinate the transportation of goods',
        },
    

];

const badges = [
  { scoreThreshold: 18, label: 'Health Novice', color: 'primary' },
  { scoreThreshold: 15, label: 'Health Enthusiast', color: 'secondary' },
  { scoreThreshold: 5, label: 'Health Pro', color: 'error' },
];

const Transportation = () => {
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

export default Transportation;
