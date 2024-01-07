import React, { useState } from 'react';
import { createPost } from '../../../services/api/posts';
import { connect } from 'react-redux';

const PostCreation = ({ authorId, token, postId }) => { // Destructure authorId and token from props
  const [content, setContent] = useState('');

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      await createPost(content, authorId, token, postId);
      // After successful post creation, update the PostList component
      // You can fetch the latest posts or update the state accordingly
    } catch (error) {
      // Handle error if needed
    }
  };

  return (
    <div>
      <h2>Create a New Post</h2>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <button onClick={handleCreatePost}>Create Post</button>
    </div>
  );
};

const mapStateToProps = state => ({
  authorId: state.session.user ? state.session.user.id : null,
  token: state.session.user ? state.session.user.token : null,
});

export default connect(mapStateToProps)(PostCreation);
