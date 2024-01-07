import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home'; // Import the Home component
import PostView from './components/Post/PostView';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Logout from './components/Auth/Logout';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:postId" element={<PostView />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
};

export default App;