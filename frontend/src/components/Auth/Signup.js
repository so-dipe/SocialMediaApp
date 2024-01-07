import React, { useState } from 'react';
import { signup } from '../../services/api/auth';
import { useNavigate } from 'react-router-dom';
import './css/Signup.css'; // Import the CSS file

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const usernamePattern = /^[A-Za-z0-9-_]+$/;
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignup = async (event) => {
    event.preventDefault(); // Prevent form from refreshing the page
    try {
      await signup(username, password);
      
      alert('Signup successful!');
      
      navigate('/login');  // Redirect to login

    } catch (error) {
      // Handle signup error
      console.log(error)
      if (error.detail === "Username already exists") {
        setErrorMessage('Username already exists.');
      }
      console.error('Signup error:', error);
    }
  };
  const handleUsernameChange = (e) => {
    const newUsername = e.target.value;
    if (!usernamePattern.test(newUsername) && newUsername !== '') {
      setErrorMessage('Invalid character. Only numbers, alphabets, hyphens, and underscores are allowed.');
    } else {
      setErrorMessage('');
    }
    setUsername(newUsername);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    if (newPassword.includes(' ')) {
      setErrorMessage('Password cannot contain spaces.');
    } else {
      setErrorMessage('');
    }
    setPassword(newPassword);
  };
  
  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange}
          title="Username can only contain numbers, alphabets, hyphens, and underscores."
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <input type="submit" value="Signup" disabled={!username || !password || !usernamePattern.test(username) || password.includes(' ')} /> 
      </form>
    </div>
  );
};

export default Signup;