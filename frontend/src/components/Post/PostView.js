import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPost } from '../../services/api/posts';
import TypingStatus from './TypingStatus';
import Post from './Post';
import CommentList from './CommentList';

const PostView = ({ userId, token }) => {
    const [post, setPost] = useState(null);
  
    const { postId } = useParams();
  
    useEffect(() => {
      const fetchPost = async () => {
        try {
          const fetchedPost = await getPost(postId);
          setPost(fetchedPost);
        } catch (error) {
          console.error('Error fetching post and comments:', error);
        }
      };
  
      fetchPost();
    }, [postId]);


    return (
      <div>
        {post && (
          <div>
            <Post key={post._id} post={post} userId={userId} token={token}/>
            <TypingStatus username={post.author_id} /> {/* Pass author_id as username */}
            {/* Render comments */}
            <CommentList postId={postId} token={token} />
          </div>
        )}
      </div>
    );
  };

  const mapStateToProps = state => ({
    userId: state.session.user ? state.session.user.id : null,
    token: state.session.user ? state.session.user.token : null,
  });
  
  export default connect(mapStateToProps)(PostView);


  
  