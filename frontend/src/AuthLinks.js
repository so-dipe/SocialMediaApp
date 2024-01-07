import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './components/Auth/Logout'
import Logout from './components/Auth/Logout';

const AuthLinks = () => {
  const isLoggedIn = useSelector(state => state.session.isLoggedIn);

  return (
    <div>
      {!isLoggedIn && (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      )}
      {isLoggedIn && (
        <Logout />
      )}
    </div>
  );
};

export default AuthLinks;