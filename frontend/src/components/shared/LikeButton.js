import React from 'react';
import { likePost } from '../../services/api/posts';

const LikeButton = ({ postId, userId, token, onLike, liked, setLiked }) => {

  const handleClick = async () => {
    try {
      const response = await likePost(postId, userId, token);
      setLiked(response.liked);
      onLike(response.liked);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  return (
    <button onClick={handleClick}>
      {liked ? 'Unlike' : 'Like'}
    </button>
  );
};

export default LikeButton;