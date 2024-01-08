import React, { useState, useEffect }  from 'react';
import { Link } from 'react-router-dom';
import { differenceInSeconds, differenceInMinutes, differenceInHours, differenceInDays, parseISO, format } from 'date-fns';
import './css/Post.css';
import LikeButton from '../shared/LikeButton';
import ReplyButton from '../shared/ReplyButton';
import { checkLike } from '../../services/api/posts';

const formatDistanceShort = (date1, date2) => {
  const diffInSeconds = differenceInSeconds(date1, date2);
  const diffInMinutes = differenceInMinutes(date1, date2);
  const diffInHours = differenceInHours(date1, date2);
  const diffInDays = differenceInDays(date1, date2);

  if (diffInSeconds < 60) {
    return diffInSeconds + 's';
  } else if (diffInMinutes < 60) {
    return diffInMinutes + 'm';
  } else if (diffInHours < 24) {
    return diffInHours + 'h';
  } else {
    return diffInDays + 'd';
  }
};

const Post = ({ post, userId, token }) => {
  const [numLikes, setNumLikes] = useState(post.num_likes);
  const [liked, setLiked] = useState(false); // Add this line

  useEffect(() => {
    const fetchLikedStatus = async () => {
      try {
        const likedStatus = await checkLike(post._id, userId);
        setLiked(likedStatus);
      } catch (error) {
        console.error('Error fetching liked status:', error);
      }
    };
  
    fetchLikedStatus();
  }, [post._id, userId]);

  const handleLike = (liked) => {
    setNumLikes(numLikes + (liked ? 1 : -1));
    setLiked(liked);
  };

  const postDate = parseISO(post.timestamp);
  const now = new Date();
  let displayDate;

  if (differenceInDays(now, postDate) <= 7) {
    displayDate = formatDistanceShort(now, postDate);
  } else if (postDate.getFullYear() === now.getFullYear()) {
    displayDate = format(postDate, 'd MMM');
  } else {
    displayDate = format(postDate, 'd MMM yy');
  }

  return (
    <div className="post-container">
      <Link to={`/posts/${post._id}`} className="post-link">
        <h3 className="post-author">{post.author_id} <span className="post-timestamp">{displayDate}</span></h3>
        <p className="post-content">{post.content}</p>
      </Link>
      <div className="post-likes-container">
        <p className="post-likes spaced">{numLikes}</p> {/* Moved this line next to LikeButton */}
        <LikeButton postId={post._id} userId={userId} token={token} onLike={handleLike} liked={liked} setLiked={setLiked}/>
        <ReplyButton postId={post._id} authorId={userId} token={token} />
      </div>
    </div>
  );
};

export default Post;