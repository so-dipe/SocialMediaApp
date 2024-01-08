import React from 'react';
import { likePost } from '../../services/api/posts';
import FavoriteIcon from '@mui/icons-material/Favorite';

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
    <FavoriteIcon onClick={handleClick} color={liked ? 'primary' : 'action'} />
  );
};

export default LikeButton;