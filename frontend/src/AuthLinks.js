import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

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
        <Link to="/logout">Logout</Link>
      )}
    </div>
  );
};

export default AuthLinks;