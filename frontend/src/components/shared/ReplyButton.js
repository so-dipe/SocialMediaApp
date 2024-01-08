import React, { useState } from 'react';
import { createPost } from '../../services/api/posts';
import socket from '../../services/websocket';
import ChatIcon from '@mui/icons-material/Chat';
import SendIcon from '@mui/icons-material/Send';

const ReplyButton = ({ postId, authorId, token }) => {
  const [replyContent, setReplyContent] = useState('');
  const [isReplying, setIsReplying] = useState(false);
  const [lastTypingTime, setLastTypingTime] = useState(Date.now()); 
  let typingTimeout;

  const handleReply = async () => {
    try {
      await createPost(replyContent, authorId, token, postId);
      setReplyContent(''); // Clear the reply content after successfully creating the reply
      setIsReplying(false); // Hide the reply input after submitting the reply
    } catch (error) {
      console.error('Error creating reply:', error);
    }
  };

  const handleTyping = (e) => {
    setReplyContent(e.target.value);
  
    const now = Date.now();
    const timeSinceLastTyping = now - lastTypingTime;
    console.log(lastTypingTime)
  
    if (timeSinceLastTyping >= 1000) {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send('User is typing');
      }
    }
  
    setLastTypingTime(now);
  
    clearTimeout(typingTimeout);
  
    typingTimeout = setTimeout(() => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send('User stopped typing');
      }
    }, 1000);
  };

  if (isReplying) {
    return (
      <div>
        <input
          type="text"
          value={replyContent}
          onChange={e => setReplyContent(e.target.value)}
          onKeyUp={handleTyping}
          placeholder="reply post..."
        />
        <SendIcon onClick={handleReply} />
      </div>
    );
  } else {
    return <ChatIcon onClick={() => setIsReplying(true)} />;
  }
};

export default ReplyButton;