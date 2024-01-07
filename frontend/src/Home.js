import React from 'react';
import PostList from './components/Post/PostList';
import PostCreation from './components/Post/PostCreation';
import { useSelector } from 'react-redux';
import AuthLinks from './AuthLinks';
import './Home.css';
import Logout from './components/Auth/Logout';

const Home = () => {
  const isLoggedIn = useSelector(state => state.session.isLoggedIn);
  const user = useSelector(state => state.session.user);
  const username = user ? user.username : '';
  const userId = user ? user.id : '';
  const token = user ? user.token : '';

  return (
    <div className="centered-page">
      <div className="header-container"> {/* Add this line */}
        <h1 className="centered-header">GraphTheory</h1>
        {
          !isLoggedIn ? (
            <div className="auth-links">
              <AuthLinks />
            </div>
          ) : (
            <div className="auth-links">
              <Logout />
            </div>
          )
        }
      </div> {/* Add this line */}
      {isLoggedIn && (
        <div className="welcome-logout-box">
          <h2>Welcome, {username}!</h2> 
          <div>
            <PostCreation />
          </div>
        </div>
      )}
      <div className="bordered-post-list">
        <PostList method="latest" count={10} userId={userId} token={token}/>
      </div>
    </div>
  );
};

export default Home;
