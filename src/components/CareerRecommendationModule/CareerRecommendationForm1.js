import React, { useState } from 'react';
import axios from 'axios';
import CareerReport from './CareerReport';
import  './CareerRecommendationForm.css';
import { useNavigate } from 'react-router';


const allSkills = [
    "Communication",
    "Complex Problem Solving",
    "Coordination",
    "Creativity",
    "Critical Thinking",
    "Equipment Maintenance",
    "Installation",
    "Instructing",
    "Judgment and Decision Making",
    "Learning Strategies",
    "Management of Material Resources",
    "Management of Personnel Resources",
    "Mathematics",
    "Monitoring",
    "Negotiation",
    "Operation and Control",
    "Operations Analysis",
    "Operations Monitoring",
    "Physical Strength",
  "Programming",
  "Quality Control Analysis",
  "Reading Comprehension",
  "Repairing",
  "Science",
  "Service Orientation",
  "Social Perceptiveness",
  "Speaking",
  "Systems Analysis",
  "Systems Evaluation",
  "Technology Design",
  "Time Management",
  "Writing",
];

const allAbilities = [
    "Arm-Hand Steadiness",
    "Auditory Attention",
    "Category Flexibility",
    "Control Precision",
    "Deductive Reasoning",
    "Depth Perception",
    "Dynamic Strength",
    "Far Vision",
    "Finger Dexterity",
    "Fluency of Ideas",
    "Gross Body Coordination",
    "Hearing Sensitivity",
    "Inductive Reasoning",
  "Information Ordering",
  "Manual Dexterity",
  "Mathematical Reasoning",
  "Multilimb Coordination",
  "Near Vision",
  "Number Facility",
  "Oral Comprehension",
  "Oral Expression",
  "Originality",
  "Perceptual Speed",
  "Problem Sensitivity",
  "Reaction Time",
  "Response Orientation",
  "Selective Attention",
  "Sound Localization",
  "Spatial Orientation",
  "Speech Clarity",
  "Speech Recognition",
  "Stamina",
  "Static Strength",
  "Time Sharing",
  "Trunk Strength",
  "Visualization",
  "Wrist-Finger Speed",
  "Written Comprehension",
  "Written Expression",
];

const CareerPredictionForm = () => {
  const navigate = useNavigate(); // Get the navigate function

  const [interestCodes, setInterestCodes] = useState('');
  const [skills, setSkills] = useState([]);
  const [abilities, setAbilities] = useState([]);
  const [careerData, setCareerData] = useState(null);
  const [error, setError] = useState(null);


  
  const handleSkillClick = (skill) => {
    if (skills.includes(skill)) {
      // Skill is already selected, remove it
      setSkills((prevSkills) => prevSkills.filter((selectedSkill) => selectedSkill !== skill));
    } else {
      // Skill is not selected, add it
      setSkills((prevSkills) => [...prevSkills, skill]);
    }
  };
  const handleInterestProfilerClick = (e) => {
    e.preventDefault();
    // Redirect to the '/personalitytest' page
    navigate('/personalitytest');
  };


  const handleAbilityClick = (ability) => {
    if (abilities.includes(ability)) {
      // Ability is already selected, remove it
      setAbilities((prevAbilities) => prevAbilities.filter((selectedAbility) => selectedAbility !== ability));
    } else {
      // Ability is not selected, add it
      setAbilities((prevAbilities) => [...prevAbilities, ability]);
    }
  };


  const handleSubmit = async (e) => { // Add async keyword here
    e.preventDefault();
    const validInterestCodesRegex = /^[RIASEC]*$/; // Only allow R, I, A, S, E, and C
    if (!validInterestCodesRegex.test(interestCodes.toUpperCase())) {
      setError('Type correct Interest Code (Only R, I, A, S, E, and C are allowed)');
      return;
    }

    const queryParams = new URLSearchParams({
      interestCodes: interestCodes,
      skills: skills.join(','), // Convert array to comma-separated string
      abilities: abilities.join(','), // Convert array to comma-separated string
    }).toString();  


    try {
      const response = await axios.get(`http://localhost:8080/api/auth/predictpathwaysandclusters?${queryParams}`);
      // Handle the response data as needed
      console.log(response.data);
      setCareerData(response.data);
      // Navigate to the "/report" page after a successful prediction
      navigate('/report', { state: { careerData: response.data, error: null } });
      

      // Refresh the page to show the updated report
    } catch (error) {
      console.error('Error occurred while predicting career pathways and clusters:', error);
      setCareerData(null);
      setError('Error occurred while predicting career pathways and clusters.');

      // Navigate to the "/report" page with error data
      navigate('/report', { state: { careerData: null, error: 'Error occurred while predicting career pathways and clusters.' } });
    }
  };
  

    return (

      <form onSubmit={handleSubmit} className="career-form">
        <div className="form-group">
        <div>
        <img src="/images/career-img.jpg" alt="Your Image" style={{ height: '250px',width: '800px' }} />
      </div>
      <br/><br/>
        <p>
          Don't you know your Interest Code?{' '}
          <a href="/personalitytest" onClick={handleInterestProfilerClick}>
            Click here to find your Interest Profiler
          </a>
        </p>
          <label>Interest Codes:</label>
          <input
            type="text"
            value={interestCodes}
            onChange={(e) => setInterestCodes(e.target.value)}
            style={{ width: '200px', fontFamily: 'Arial', fontSize: '14px', color: 'rgba(0, 0, 0, 0.7)', padding: '8px', borderRadius: '4px' }}
          />
<p style={{ fontFamily: 'Arial', fontSize: '12px', color: 'rgba(0, 0, 0, 0.5)' }}>
            Type your Interest code here either 1st 2 letters or 3 letters, RC or RIA or SA
          </p>
        </div>
        <p className="interest-code-error">{error}</p>
        <div className="form-group skills">
          <label>Skills (select multiple):</label>
          <div className="skills-container">
            {allSkills.map((skill) => (
              <div
                key={skill}
                className={`skill ${skills.includes(skill) ? 'selected' : ''}`}
                onClick={() => handleSkillClick(skill)}
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
        <div className="form-group abilities">
          <label>Abilities (select multiple):</label>
          <div className="abilities-container">
            {allAbilities.map((ability) => (
              <div
                key={ability}
                className={`ability ${abilities.includes(ability) ? 'selected' : ''}`}
                onClick={() => handleAbilityClick(ability)}
              >
                {ability}
              </div>
            ))}
          </div>
        </div>
        <button type="submit">Predict</button>
      
        {error && (
        <div className="error-tooltip-container">
          <span className="error-icon" role="img" aria-label="Warning">
            ⚠️
          </span>
          <span className="error-tooltip">{error}</span>
        </div>
      )}
    </form>
  );
};

export default CareerPredictionForm;