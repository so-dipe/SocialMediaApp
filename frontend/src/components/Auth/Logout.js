import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../redux/slices/sessionSlice';  // Import the logoutUser action

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the session
    dispatch(logoutUser());  // Dispatch the logoutUser action

    // Redirect to the login page
    navigate('/');
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;