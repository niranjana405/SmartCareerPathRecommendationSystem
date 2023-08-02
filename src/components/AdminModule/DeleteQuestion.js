import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './PersonalityUpdate.css';

const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Nav className="me-auto">
          <Nav.Link>Delete PersonalityTest Questions</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

const PersonalityTest = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/auth/personalitytestQuestions');
      setQuestions(response.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    try {
      await axios.delete(`http://localhost:8080/api/auth/deletequestions/${questionId}`);
      fetchQuestions(); // Fetch the updated list of questions after deletion
      console.log('Question deleted successfully');
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  return (
    <div className="personality-test">
      <ul className="list-group">
        {questions.map((question) => (
          <li key={question.id} className="list-group-item d-flex justify-content-between align-items-center">
            {question.question}
            <button className="btn btn-danger" onClick={() => handleDeleteQuestion(question.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  const [activeTab, setActiveTab] = useState('personality-test');

  let content;
  if (activeTab === 'personality-test') {
    content = <PersonalityTest />;
  }

  return (
    <div>
      <NavBar />
      <Container>
        {content}
      </Container>
    </div>
  );
};

export default App;
