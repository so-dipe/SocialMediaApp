import React, { useEffect, useState } from 'react';
import socket from '../../services/websocket';

const TypingStatus = ({ username }) => {
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {

    socket.onopen = () => {
        console.log('WebSocket connection opened');
      };
    
      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    
      socket.onclose = (event) => {
        console.log('WebSocket connection closed:', event);
      };

      socket.onmessage = (event) => {
        const message = event.data;
        if (message === 'User is typing') {
          setIsTyping(true);
        } else if (message === 'User stopped typing') {
          console.log('User stopped typing');
          setIsTyping(false);
        }
      };

    // return () => socket.close();
  }, [username]);

  return (
    <div>
      {isTyping ? `${username} is typing...` : ''}
    </div>
  );
};

export default TypingStatus;