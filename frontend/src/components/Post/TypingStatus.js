import React, { useEffect, useState, useRef } from 'react';
import socket from '../../services/websocket';

const TypingStatus = ({ username }) => {
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeout = useRef();

  useEffect(() => {
    socket.onmessage = (event) => {
      const message = event.data;
      if (message === 'User is typing') {
        setIsTyping(true);
        
        if (typingTimeout.current) clearTimeout(typingTimeout.current);
      } else if (message === 'User stopped typing') {
        console.log('User stopped typing');
        // Set a new timeout
        typingTimeout.current = setTimeout(() => {
          setIsTyping(false);
        }, 1000);  // Wait 1000 milliseconds before setting isTyping to false
      }
    };

    return () => {
      if (typingTimeout.current) clearTimeout(typingTimeout.current);
    };
  }, [username]);

  return (
    <div style={{ backgroundColor: isTyping ? 'green' : 'transparent', color: 'white', padding: '10px' }}>
      {isTyping ? `${username} is typing...` : ''}
    </div>
  );
};

export default TypingStatus;