import React, { useState } from 'react';
import { createPost } from '../../services/api/posts';
import socket from '../../services/websocket';
import ChatIcon from '@mui/icons-material/Chat';
import SendIcon from '@mui/icons-material/Send';
import './css/ReplyButton.css';

const ReplyButton = ({ postId, authorId, token }) => {
  const [replyContent, setReplyContent] = useState('');
  const [isReplying, setIsReplying] = useState(false);
  let typingTimeout;

  const handleReply = async () => {
    if (!replyContent.trim()) {
      // Don't send the message if replyContent is empty or only contains spaces
      return;
    }
    
    try {
      await createPost(replyContent, authorId, token, postId);
      setReplyContent(''); // Clear the reply content after successfully creating the reply
      setIsReplying(false);
      window.location.reload();
    } catch (error) {
      console.error('Error creating reply:', error);
    }
  };

  const handleTyping = (e) => {
    setReplyContent(e.target.value);
  
    // Clear any existing timeout
    clearTimeout(typingTimeout);
  
    // Set a new timeout
    typingTimeout = setTimeout(() => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send('User is typing');
      }
    }, 1000);  // Wait 1 sec before sending 'User is typing' message
  
    if (socket.readyState === WebSocket.OPEN) {
        socket.send('User stopped typing');
      }
  };

  if (isReplying) {
    return (
      <div className="reply-container">
        <input
          type="text"
          value={replyContent}
          onChange={e => setReplyContent(e.target.value)}
          onKeyUp={handleTyping}
          placeholder="reply post..."
          className="reply-input"
        />
        <SendIcon 
        onClick={handleReply} 
        className={`send-icon ${!replyContent.trim() && 'disabled'}`} 
        disabled={!replyContent.trim()}  // Disable the button if replyContent is empty or only contains spaces
      />
      </div>
    );
  } else {
    return <ChatIcon onClick={() => setIsReplying(true)} className="chat-icon" />;
  }
};

export default ReplyButton;