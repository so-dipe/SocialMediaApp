import React, { useState } from 'react';
import { createPost } from '../../services/api/posts';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import './css/PostCreation.css';
import { useNavigate } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';

const PostCreation = ({ authorId, token, postId }) => {
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const characterLimit = 500;
  const navigate = useNavigate();

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (content.trim() === '') {
      // setMessage('Post content cannot be empty.');
      return;
    }

    try {
      const response = await createPost(content, authorId, token, postId);
      console.log(response)
      setContent(''); // Clear the textarea
      setMessage('Post created successfully.'); // Provide feedback
      setIsModalOpen(false); // Close the modal
      navigate(`/posts/${response.post_id}`); // Redirect to the post page 
    } catch (error) {
      setMessage('Error creating post.'); // Provide feedback
    }
  };

  return (
    <div className="post-creation">
      <button className="createButton"
        onClick={() => setIsModalOpen(true)}
      >
        Create
        <AddIcon />
      </button>
      <Modal 
        isOpen={isModalOpen} 
        onRequestClose={() => setIsModalOpen(false)}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <form onSubmit={handleCreatePost}>
          <textarea 
            className="post-creation__textarea" 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            placeholder="What's on your mind?"
            maxLength={characterLimit}
          />
          <button className={`sendButton ${!content.trim() ? 'disabled' : ''}`}>
            <SendIcon />
          </button>
        </form>
        {message && <p>{message}</p>}
      </Modal>
    </div>
  );
};

const mapStateToProps = state => ({
  authorId: state.session.user ? state.session.user.id : null,
  token: state.session.user ? state.session.user.token : null,
});

export default connect(mapStateToProps)(PostCreation);