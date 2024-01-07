import React, { useState, useEffect } from 'react';
import { getComments } from '../../services/api/posts';
import Post from './Post';

const CommentList = ({ postId, token }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const fetchedComments = await getComments(postId);
        setComments(Array.isArray(fetchedComments) ? fetchedComments : []);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [postId]);

  if (!comments || comments.length === 0) {
    return <p>No comments yet</p>;
  }

  return (
    <div>
      <h3>Comments</h3>
      <ul>
        {comments.map((comment) => (
        <Post key={comment._id} post={comment} userId={comment.author_id} token={token}/>
         
        ))}
      </ul>
    </div>
  );
};

export default CommentList;