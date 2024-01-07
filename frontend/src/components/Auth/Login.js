import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../services/api/auth';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../redux/slices/sessionSlice';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const response = await login(username, password);
      // Handle successful login
      console.log('Login successful!', response);

      // Update Redux store
      dispatch(loginUser(response)); 

      navigate('/');  // Redirect to home after login
    } catch (error) {
      // Handle login error
      console.error('Login error:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
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
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
