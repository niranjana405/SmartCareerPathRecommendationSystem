import React, { useState, useEffect } from 'react';
import Cards from './components/Cards';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './components/UserModule/Profile';
import Products from './components/pages/Products';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import SignUp from './components/UserModule/SignUp';
import SignIn from './components/UserModule/SignIn';
import ProfessionList from './components/pages/ProfessionList';
import PersonalityTest from './components/PersonalityTestModule/PersonalityTest';
import ResultPagePersonality from './components/PersonalityTestModule/ResultPagePersonality';
import AdminLogin from './components/AdminModule/AdminLogin';
import PersonalityUpdate from './components/AdminModule/PersonalityUpdate';
import HomeAdmin from './components/AdminModule/HomeAdmin'
import CareerRecommendationForm1 from './components/CareerRecommendationModule/CareerRecommendationForm1';
import CareerReport from './components/CareerRecommendationModule/CareerReport';
import AptitudeMain from './components/AptitudeTestModule/AptitudeMain';
import HealthScience from './components/AptitudeTestModule/HealthScience'
import InformationTechnology from './components/AptitudeTestModule/InformationTechnology';
import Transportation from './components/AptitudeTestModule/Transportation';
import Arts from './components/AptitudeTestModule/Arts';
import BusinessManagement from './components/AptitudeTestModule/BusinessManagement';
import Education from './components/AptitudeTestModule/Education';
import Finance from './components/AptitudeTestModule/Finance';
import Government from './components/AptitudeTestModule/Government';
import  Architecture  from './components/AptitudeTestModule/Architecture';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    // Perform login actions, such as validating credentials or making an API request
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    // Perform logout actions, such as clearing local storage or making an API request
    setIsAuthenticated(false);
  };
  return (
    <>  
    
      <Router>
      {/* <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} /> */}
        <Routes>
        <Route path='/'  exact element={<Home/>} />
        <Route path='/'   element={<Navbar/>} />

          <Route path='/products' element={<Products/>} />
          <Route path='/sign-up' element={<SignUp/>} />
          {/* <Route path='/sign-in' element={<SignIn/>}/>  */}
          <Route path='/sign-in' element={<SignIn handleLogin={handleLogin} />} />
          <Route path='/profile' element={<Profile />} />
           <Route path='/contact' element={<Cards/>} /> 
           <Route path='/profession' element={<ProfessionList/>} /> 
           <Route path='/personalitytest' element={<PersonalityTest/>} /> 
           <Route path='/result' element={<ResultPagePersonality/>} /> 
           <Route path='/adminsign-in' element={<AdminLogin/>} /> 
           <Route path='/AdminMain' element={<HomeAdmin/>} /> 
           <Route path='/careerfinder' element={<CareerRecommendationForm1/>} /> 
           <Route path='/report' element={<CareerReport/>} /> 
           <Route path='/aptitude' element={<AptitudeMain/>} /> 
           <Route path='/career-cluster/healthscience' element={<HealthScience/>} /> 
           <Route path='/career-cluster/informationtechnology' element={<InformationTechnology/>} /> 
           <Route path='/career-cluster/transportation' element={<Transportation/>} /> 
           <Route path='/career-cluster/arts' element={<Arts/>} /> 
           <Route path='/career-cluster/business' element={<BusinessManagement/>} /> 
           <Route path='/career-cluster/education' element={<Education/>} /> 
           <Route path='/career-cluster/finance' element={<Finance/>} /> 
           <Route path='/career-cluster/government' element={<Government/>} /> 
           <Route path='/career-cluster/architecture' element={<Architecture/>} /> 

        </Routes>

      </Router>
    </>
  );
}

export default App;