import React from 'react';
import PostList from './components/Post/PostList';
import PostCreation from './components/Post/PostCreation';
import { useSelector } from 'react-redux';
import AuthLinks from './AuthLinks';
import './Home.css';

const Home = () => {
  const isLoggedIn = useSelector(state => state.session.isLoggedIn);
  const user = useSelector(state => state.session.user);
  const username = user ? user.username : '';
  const userId = user ? user.id : '';
  const token = user ? user.token : '';

  return (
    <div className="centered-page">
      <h1 className="centered-header">GraphTheory</h1>
      {
        !isLoggedIn && (
          <div className="welcome-login-box">
            <AuthLinks />
          </div>
        )
      }
      {isLoggedIn && (
        <div className="welcome-logout-box">
          <h2>Welcome, {username}!</h2> 
          <AuthLinks />
        </div>
      )}
      {isLoggedIn && (
        <div>
          <PostCreation />
        </div>
      )}
      <div className="bordered-post-list">
        <PostList method="latest" count={10} userId={userId} token={token}/>
      </div>
    </div>
  );
};

export default Home;
