import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AccountCircle, Settings, Bookmark, Notifications, ExitToApp } from '@mui/icons-material';
import { Container, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import 'material-icons/iconfont/material-icons.css';
import './UserProfile.css';
import CareerRecommendationsReport from './CareerRecommendationsReport';


function UserProfile() {
  const [activeTab, setActiveTab] = useState('profile');

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Container>
      <Row>
        <Col md={3}>
          <div className="profile-sidebar">
            <div className="profile-image">
              <img src="/images/img-4.jpg" alt="Profile" />
            </div>
            <Nav vertical className="profile-options">
              <NavItem>
                <NavLink
                  className={activeTab === 'badge' ? 'active' : ''}
                  onClick={() => toggleTab('badge')}
                >
                  <AccountCircle />
                  Earned Badges
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={activeTab === 'interests' ? 'active' : ''}
                  onClick={() => toggleTab('interests')}
                >
                  <AccountCircle />
                  Update Your Interests
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={activeTab === 'settings' ? 'active' : ''}
                  onClick={() => toggleTab('settings')}
                >
                  <Settings />
                  Settings
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={activeTab === 'report' ? 'active' : ''}
                  onClick={() => toggleTab('report')}
                >
                  <Bookmark />
                  Career Recommendations Report
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  className={activeTab === 'notifications' ? 'active' : ''}
                  onClick={() => toggleTab('notifications')}
                >
                  <Notifications />
                  Notifications
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={activeTab === 'logout' ? 'active' : ''}
                  onClick={() => toggleTab('logout')}
                >
                  <ExitToApp />
                  Logout
                </NavLink>
              </NavItem>
            </Nav>
          </div>
        </Col>
        <Col md={9}>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="badge">
              {activeTab === 'badge' && (
                <div className="profile-slider">
                </div>
              )}
            </TabPane>
            <TabPane tabId="skills">
              <div className="profile-slider">
                {/* <SkillInterestProfiler /> */}
              </div>
            </TabPane>
            <TabPane tabId="settings">
              <div className="profile-slider">
                <h2>Settings Slider View</h2>
              </div>
            </TabPane>
            <TabPane tabId="report">
              <div className="profile-slider">
<CareerRecommendationsReport/>
              </div>
            </TabPane>
            <TabPane tabId="notifications">
              <div className="profile-slider">
                <h2>Notifications Slider View</h2>
                {/* Add notifications slider content */}
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

export default UserProfile;
