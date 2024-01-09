import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getPost } from '../../services/api/posts';
import TypingStatus from './TypingStatus';
import Post from './Post';
import CommentList from './CommentList';
import './css/PostView.css';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const PostView = ({ userId, token }) => {
    const [post, setPost] = useState(null);
    const navigate = useNavigate();
    const { postId } = useParams();
    console.log(postId);
  
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
      <div className="postView">
        <div className="backButton">
          <ArrowBackIcon onClick={() => navigate(-1)} fontSize="large" />
        </div>
        {post && post.parent_id && (
          <Link to={`/posts/${post.parent_id}`}>
            <button>View Main Post</button>
          </Link>
        )}
        {post && (
          <div className="content">
            <Post key={post._id} post={post} userId={userId} token={token}/>
            <TypingStatus username={post.author} /> {/* Pass author_id as username */}
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


  
  