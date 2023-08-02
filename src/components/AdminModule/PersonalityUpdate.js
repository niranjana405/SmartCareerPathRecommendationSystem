import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './PersonalityUpdate.css'
const NavBar = ({ activeTab, setActiveTab }) => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Nav className="me-auto">
          <Nav.Link onClick={() => setActiveTab('personality-test')}>Click here to update Personality Test Questions</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

const Home = () => {
  return <h2></h2>;
};

const PersonalityTest = ({ setActiveTab }) => {
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

  const handleEditQuestion = (questionId) => {
    const tabId = `edit/${questionId}`;
    setActiveTab(tabId);
  };

  // Add a new effect to automatically fetch questions when they are updated
  useEffect(() => {
    const intervalId = setInterval(fetchQuestions, 5000); // Fetch questions every 5 seconds (adjust the interval as needed)

    return () => {
      clearInterval(intervalId); // Clear the interval when the component unmounts
    };
  }, []);

  return (
    <div className="personality-test">
    
      <ul className="list-group">
        {questions.map((question) => (
          <li key={question.id} className="list-group-item d-flex justify-content-between align-items-center">
            {question.question}
            <button className="btn btn-primary" onClick={() => handleEditQuestion(question.id)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};


const EditQuestion = ({ questionId, setActiveTab }) => {
  const [question, setQuestion] = useState('');
  const [code, setCode] = useState('');

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    try {
      const response = await axios.get(`'http://localhost:8080/api/auth/personalitytestQuestions`);
      const { question, code } = response.data;
      setQuestion(question);
      setCode(code);
    } catch (error) {
      console.error('Error fetching question:', error);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const updatedQuestion = { question, code };
      await axios.put(`http://localhost:8080/api/auth/updatequestions/${questionId}`, updatedQuestion);
      console.log('Question updated successfully');
      setActiveTab('personality-test'); // Change activeTab state to 'personality-test' after saving

    } catch (error) {
      console.error('Error updating question:', error);
    }
  };

  return (
    <div className="edit-question">
      <h2>Edit Question</h2>
      <form onSubmit={handleSave}>
        <div className="form-group">
          <label>Question:</label>
          <input type="text" className="form-control" value={question} onChange={(e) => setQuestion(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Code:</label>
          <input type="text" className="form-control" value={code} onChange={(e) => setCode(e.target.value)} />
        </div>
        <div className="form-group">
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </div>
  );
};

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedQuestionId, setSelectedQuestionId] = useState('');

  let content;
  if (activeTab === 'home') {
    content = <Home />;
  } else if (activeTab === 'personality-test') {
    content = <PersonalityTest setActiveTab={setActiveTab} setSelectedQuestionId={setSelectedQuestionId} />;
  } else if (activeTab.startsWith('edit')) {
    const questionId = activeTab.split('/')[1];
    content = <EditQuestion questionId={questionId} setActiveTab={setActiveTab} />; // Pass setActiveTab function here
  }

  const handleQuestionClick = (questionId) => {
    setActiveTab(`edit/${questionId}`);
    setSelectedQuestionId(questionId);
  };

  return (
    <div>
      <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />
      <Container>
        {content}
        {selectedQuestionId && (
          <h3 className="selected-question">
            Editing Question {selectedQuestionId}
          </h3>
        )}
      </Container>
    </div>
  );
};

export default App;

