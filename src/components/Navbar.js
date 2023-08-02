import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './Navbar.css';

function Navbar({ isAuthenticated, handleLogout }) {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            CAREER
            <i className='fab fa-typo3' />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <NavLink
                to='/'
                exact
                className='nav-links'
                activeClassName='active'
                onClick={closeMobileMenu}
              >
                Home
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                to='/services'
                className='nav-links'
                activeClassName='active'
                onClick={closeMobileMenu}
              >
                Services
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                to='/products'
                className='nav-links'
                activeClassName='active'
                onClick={closeMobileMenu}
              >
                Products
              </NavLink>
            </li>
            {isAuthenticated ? (
              <>
                <li className='nav-item'>
                  <NavLink
                    to='/profile'
                    className='nav-links'
                    activeClassName='active'
                    onClick={closeMobileMenu}
                  >
                    Profile
                  </NavLink>
                </li>
                <li className='nav-item'>
                  <NavLink
                    to='/settings'
                    className='nav-links'
                    activeClassName='active'
                    onClick={closeMobileMenu}
                  >
                    Settings
                  </NavLink>
                </li>
                <li className='nav-item'>
                  <button className='nav-links' onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className='nav-item'>
                <Link to='/adminsign-in' className='nav-links' onClick={closeMobileMenu}>
                 Admin Sign In
                </Link>
              </li>
            )}
          </ul>
          <div className='user-icon-wrapper'>
            {isAuthenticated && (
              <Link to='/profile'>
                <AccountCircleIcon
                  className='user-icon without-color user-dropdown__icon left'
                  style={{ color: '#1891A1', fontSize: '40px' }}
                />
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
