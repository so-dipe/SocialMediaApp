import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../services/api/posts';
import Post from './Post'; 
import { addPost } from '../../redux/slices/postsSlice';

const PostList = ({ method, count, userId, token }) => {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getPosts(method, count);
        setPosts(fetchedPosts);

        // Dispatch the addPost action for each post
        fetchedPosts.forEach(post => {
          dispatch(addPost(post));
        });
      } catch (error) {
        // Handle error if needed
      }
    };

    fetchPosts();
  }, [method, count, dispatch]);

  return (
    <div>
      {posts.map((post) => (
        <Post key={post._id} post={post} userId={userId} token={token}/>  // Use the Post component to render each post
      ))}
    </div>
  );
};

export default PostList;
