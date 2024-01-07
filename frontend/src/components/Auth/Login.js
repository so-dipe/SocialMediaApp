import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../services/api/auth';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../redux/slices/sessionSlice';
import './css/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    try {
      const response = await login(username, password);
      console.log('Login successful!');

      // Update Redux store
      dispatch(loginUser(response)); 

      alert('Login successful!');
      navigate('/'); // Redirect to home

    } catch (error) {
      // Handle login error
      if (error.detail === "Invalid credentials") {
        setErrorMessage('Invalid username or password.');
      }
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input type="submit" value="Login" disabled={!username || !password} /> {/* Add this line */}
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
    </div>
  );
};

export default Login;
