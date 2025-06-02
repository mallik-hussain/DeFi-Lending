import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../utils/url';
import { toast } from 'react-toastify';
import '../styles/signin.css';

const Signin = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    usernameOrEmail: '',
    password: '',
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Optional: Basic validation to prevent empty submit
    if (!user.usernameOrEmail || !user.password) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post(`${URL}/user/signin`, user);
      if (response.status === 200) {
        toast.success('User logged in successfully');
        setUser({
          usernameOrEmail: '',
          password: '',
        });
        localStorage.setItem('token', response.data.token);
        navigate('/home');
      }
    } catch (error) {
      // If server error message exists, use it, else generic message
      toast.error(error.response?.data?.message || error.message || 'Login failed');
      console.error(error);
    }
  };

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="usernameOrEmail">Username or Email</label>
          <input
            type="text"
            id="usernameOrEmail"
            name="usernameOrEmail"
            placeholder="Enter your username or email"
            value={user.usernameOrEmail}
            onChange={handleChange}
            autoComplete="username"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={user.password}
            onChange={handleChange}
            autoComplete="current-password"
            required
          />
        </div>
        <button type="submit">Sign In</button>
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Signin;
