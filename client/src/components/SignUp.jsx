import React,{useState} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { URL } from '../utils/url';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../styles/signup.css';

const Signup = () => {
  const navigate=useNavigate();
  const [user, setUser] = useState({
    username: '',
    fullname: '',
    email: '',
    password: '',
  });
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${URL}/user/signup`, user);
      if (response.status === 201) {
        toast.success('User registered successfully')
        setUser({
          username: '',
          fullname: '',
          email: '',
          password: '',
        });
        navigate('/signin');
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.error(error);
    }
  }
  return (
     <>
    <div className="signup-container" style={{marginLeft:"40px"}}>
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" value={user.username} placeholder="Enter your username" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="fullname">Full Name</label>
          <input type="text" name="fullname" value={user.fullname} placeholder="Enter your full name" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={user.email} placeholder="Enter your email" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={user.password} placeholder="Enter your password" onChange={handleChange} />
        </div>
        <button type="submit">Sign Up</button>
        <p>
          Already have an account? <Link to="/signin">Sign In</Link>
        </p>
      </form>
    </div>
    </>
  );
}

export default Signup;
