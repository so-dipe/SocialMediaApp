import axios from 'axios';
import { BaseUrl } from '../../config';

export const getPosts = async (method, count) => {
  try {
    console.log(`${BaseUrl}/api/v1/posts/?method=${method}&count=${count}`);
    const response = await axios.get(`${BaseUrl}/api/v1/posts/?method=${method}&count=${count}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const getPost = async (postId) => {
    try {
      const response = await axios.get(`${BaseUrl}/api/v1/posts/${postId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching post:', error);
      throw error;
    }
  }

export const likePost = async (postId, userId, token) => {
    try {
      const response = await axios.post(`${BaseUrl}/api/v1/posts/${postId}/like`, {"user_id": userId }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error liking post:', error);
      throw error;
    }
  };

export const createPost = async (content, authorId, token, parentId = null) => {
    try {
      const postData = {
        content,
        authorId,
      };
      
      if (parentId !== null) {
        postData.parentId = parentId;
        console.log(postData);
      }
      const response = await axios.post(`${BaseUrl}/api/v1/posts/create`, postData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Error creating post:', error);
    }
  };

export const getComments = async (postId) => {
    try {
      const response = await axios.get(`${BaseUrl}/api/v1/posts/${postId}/comments`);
      return response.data;
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }
  };