import React, { useState } from 'react';
import { signup } from '../../services/api/auth';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await signup(username, password);
      // Handle successful signup (e.g., store token in local storage)
      console.log('Signup successful!', response);
      navigate('/login');  // Redirect to home after login
    } catch (error) {
      // Handle signup error
      console.error('Signup error:', error);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
};

export default Signup;
