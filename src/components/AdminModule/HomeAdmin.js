
import React, { useState } from 'react';
import './HomeAdmin.css';
import { Link } from 'react-router-dom';
import { AccountCircle, Settings, Bookmark, Notifications, ExitToApp } from '@mui/icons-material';
import { Container, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import 'material-icons/iconfont/material-icons.css';
import PersonalityUpdate from './PersonalityUpdate';
import ViewQuestion from './ViewQuestion';
import DeleteQuestion from './DeleteQuestion';
import AddQuestion from './AddQuestion';
import Home from '../pages/Home';
import { useNavigate } from 'react-router-dom'; 
import ViewUsersReports from './ViewUsersReports'
import CareerReportChart from './CareerReportChart';

const Navbar = ({ setActiveTab }) => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <span className="navbar-brand" onClick={() => setActiveTab('home')}>
        Navbar
      </span>
      <div className="navbar-nav">
        <button className="nav-item nav-link btn btn-outline-light" onClick={() => setActiveTab('sidebar')}>
          Homes
        </button>
      </div>
    </nav>
  );
};


const HomeAdmin = () => {
  const [activeTab, setActiveTab] = useState('');
  const navigate = useNavigate(); // Initialize the navigate function

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };
  const handleLogout = () => {
    // Implement your logout logic here (e.g., clear authentication tokens, etc.)
    // After the logout logic, navigate to the home page
    navigate('/'); // Navigate to the home page
  };
  return (
    <Container>
      <Row>
        <Col md={3}>
          <div className="profile-sidebar">
            <div className="profile-image">
              <img src="/images/admin.jpg" alt="Profile" />
            </div>
            <Nav vertical className="profile-options">
            <NavItem>
                <NavLink
                  className={activeTab === 'users' ? 'active' : ''}
                  onClick={() => toggleTab('users')}
                >
                  <AccountCircle />
                 View users
                </NavLink>
                </NavItem>
                <NavItem>
                <NavLink
                  className={activeTab === 'chart' ? 'active' : ''}
                  onClick={() => toggleTab('chart')}
                >
                  <AccountCircle />
                 View chart
                </NavLink>
                </NavItem>
              <NavItem>
                <NavLink
                  className={activeTab === 'skills' ? 'active' : ''}
                  onClick={() => toggleTab('skills')}
                >
                  <AccountCircle />
                 View Questions
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={activeTab === 'interests' ? 'active' : ''}
                  onClick={() => toggleTab('interests')}
                >
                  <AccountCircle />
                  Add Questions
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={activeTab === 'settings' ? 'active' : ''}
                  onClick={() => toggleTab('settings')}
                >
                  <Settings/>
                  Update Questions
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={activeTab === 'report' ? 'active' : ''}
                  onClick={() => toggleTab('report')}
                >
                  <Bookmark />
Delete Questions                </NavLink>
              </NavItem>
            
              <NavItem>
                <NavLink
                  className={activeTab === 'logout' ? 'active' : ''}
                  onClick={() => {toggleTab('logout')
                  handleLogout(); // Call the handleLogout function on click
                }}
              >
                
                  Logout
                </NavLink>
              </NavItem>
            </Nav>
          </div>
        </Col>
        <Col md={9}>
          <TabContent activeTab={activeTab}>
          <TabPane tabId="users">
              <div className="profile-slider">
                <ViewUsersReports />
              </div>
            </TabPane>
            
            <TabPane tabId="chart">
              <div className="profile-slider">
                <CareerReportChart />
              </div>
            </TabPane>

          <TabPane tabId="skills">
              <div className="profile-slider">
                <ViewQuestion />
              </div>
            </TabPane>
            <TabPane tabId="interests">
              {activeTab === 'interests' && (
                <div className="profile-slider">
                  <AddQuestion/>
                </div>
              )}
            </TabPane>
            <TabPane tabId="settings">
              <div className="profile-slider">
                <PersonalityUpdate />
              </div>
            </TabPane>
            <TabPane tabId="bookmarks">
              <div className="profile-slider">
                <h2>Bookmarks Slider View</h2>
                {/* Add bookmarks slider content */}
              </div>
            </TabPane>
            <TabPane tabId="report">
              <div className="profile-slider">
                <DeleteQuestion/>
              </div>
            </TabPane>
            <TabPane tabId="logout">
              <div className="profile-slider">
                <h2>Logout Slider View</h2>
                {/* Add logout slider content */}
              </div>
            </TabPane>
          </TabContent>
        </Col>
      </Row>
    </Container>
  );
}

export default HomeAdmin;
