import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/adminlogin', {
        adminName: username,
        adminPassword: password,
      });
      console.log(response.data); // Handle successful login
      navigate('/AdminMain'); // Navigate to the NavBarAdmin page
    } catch (error) {
      setErrorMessage(error.response.data); // Handle login error
    }
  };

  return (
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Sample image"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={handleLogin}>
              <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
              </div>

              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0">Admin Login Page</p>
              </div>

              <div className="form-outline mb-4">
                <input
                  type="text"
                  id="adminName"
                  className="form-control form-control-lg"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label className="form-label" htmlFor="adminName">
                  Username
                </label>
              </div>

              <div className="form-outline mb-3">
                <input
                  type="password"
                  id="adminPassword"
                  className="form-control form-control-lg"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label className="form-label" htmlFor="adminPassword">
                  Password
                </label>
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{ paddingLeft: '2.5rem', paddingRight: '2rem' }}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminLogin;
