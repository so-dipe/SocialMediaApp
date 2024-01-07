import React, { useState } from 'react';
import { createPost } from '../../services/api/posts';
import { connect } from 'react-redux';
import './css/PostCreation.css';

const PostCreation = ({ authorId, token, postId }) => {
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (content.trim() === '') {
      setMessage('Post content cannot be empty.');
      return;
    }

    try {
      await createPost(content, authorId, token, postId);
      setContent(''); // Clear the textarea
      setMessage('Post created successfully.'); // Provide feedback
    } catch (error) {
      setMessage('Error creating post.'); // Provide feedback
    }
  };

  return (
    <div className="post-creation">
      <form onSubmit={handleCreatePost}>
        <textarea 
          className="post-creation__textarea" 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          placeholder="What's on your mind?"
        />
        <button className="post-creation__button" type="submit">Create Post</button>
        {message && <p className="post-creation__message">{message}</p>}
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  authorId: state.session.user ? state.session.user.id : null,
  token: state.session.user ? state.session.user.token : null,
});

export default connect(mapStateToProps)(PostCreation);