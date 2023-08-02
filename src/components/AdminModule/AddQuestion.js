import React, { useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from 'react-router-dom'; 
import './AddQuestion.css';

const Navbar = ({ setActiveTab }) => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <span className="navbar-brand" onClick={() => setActiveTab('home')}>
        Add Personlity Test Questions
      </span>
      <div className="navbar-nav">
        <button className="nav-item nav-link btn btn-outline-light" onClick={() => setActiveTab('sidebar')}>
          
        </button>
      </div>
    </nav>
  );
};

const App = () => {
    const navigate = useNavigate(); // Initialize the navigate function
    const [questions, setQuestions] = useState([]);
    const [showSaveButton, setShowSaveButton] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Function to handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make the POST request to the /save endpoint
      const response = await axios.post('http://localhost:8080/api/auth/save', questions);

      // If the request is successful, display the success message
      console.log(response.data); // "Questions saved successfully"
      setShowSuccessMessage(true);
      setQuestions([]); // Clear the form inputs
      setShowSaveButton(false); // Hide the "Save Questions" button
      setTimeout(() => setShowSuccessMessage(false), 3000); // Hide the success message after 3 seconds
      navigate('/AdminMain');
    } catch (error) {
      // If there's an error, display the error message
      console.error('Error saving questions:', error);
    }
  };

  // Function to add a new question in the specified format
  const addQuestion = () => {
    setQuestions([...questions, { id: null, question: '', code: '' }]);
    setShowSaveButton(true); // Show the "Save Questions" button when a question is added
  };

  // Function to handle input changes
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedQuestions = [...questions];
    updatedQuestions[index][name] = value;
    setQuestions(updatedQuestions);
  };

  return (
    <div>
      {/* Add the Navbar component here */}
      <Navbar setActiveTab={() => {}} />
      <Container>
        <form onSubmit={handleFormSubmit}>
          {questions.map((question, index) => (
            <div key={index} className="question-container">
              <label>Question {index + 1}:</label>
              <input
                type="text"
                name="question"
                value={question.question}
                onChange={(e) => handleInputChange(index, e)}
              />
              <br />
              <label>Code:</label>
              <input type="text"
                name="code"
                value={question.code}
                onChange={(e) => handleInputChange(index, e)}
              />
              <br />
            </div>
          ))}
          {showSaveButton && (
            <button type="submit" className="btn btn-primary">
              Save Questions
            </button>
          )}
          <button type="button" onClick={addQuestion} className="btn btn-secondary">
            Add Question
          </button>
        </form>
        {/* Pop-up message for "Questions saved successfully" */}
        {showSuccessMessage && (
          <div className="success-message">
            Questions saved successfully
          </div>
        )}
      </Container>
    </div>
  );
};
export default App;