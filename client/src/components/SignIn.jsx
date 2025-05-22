import React,{useState} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../utils/url';
import { toast } from 'react-toastify';
import '../styles/signin.css';

const Signin = () => {
  const navigate=useNavigate();
  const [user, setUser] = useState({
    usernameOrEmail: '',
    password: '',
  });
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const response = await axios.post(`${URL}/user/signin`, user);
      if(response.status===200){
        toast.success('User logged in successfully');
        setUser({
          usernameOrEmail: '',
          password: '',
        });
        localStorage.setItem('token', response.data.token);
        navigate('/home');
    }
  }
  catch(error){
    toast.error(error.message);
    console.error(error);
  }
}
  return (
    <div className="signin-container" style={{marginLeft:"40px"}}>
      <form className="signin-form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <div className="form-group">
          <label htmlFor="usernameOrEmail">Username or Email</label>
          <input type="text" name="usernameOrEmail" placeholder="Enter your username or email" onChange={handleChange}  />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" placeholder="Enter your password" onChange={handleChange} />
        </div>
        <button type="submit">Sign In</button>
        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </form>
    </div>
  );
}

export default Signin;