import React, { useEffect, useState } from 'react';
import { getPosts } from '../../services/api/posts';
import Post from './Post'; 

const PostList = ({ method, count, userId, token }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getPosts(method, count);
        setPosts(fetchedPosts);
      } catch (error) {
        // Handle error if needed
      }
    };

    fetchPosts();
  }, [method, count]);

  return (
    <div>
      <h2>Posts</h2>
      {posts.map((post) => (
        <Post key={post._id} post={post} userId={userId} token={token}/>  // Use the Post component to render each post
      ))}
    </div>
  );
};

export default PostList;
