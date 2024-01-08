import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: JSON.parse(localStorage.getItem('posts')) || [],
};

const MAX_POSTS = 10; // Maximum number of posts to keep in state

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost(state, action) {
      state.posts.push(action.payload);
      if (state.posts.length > MAX_POSTS) {
        state.posts.shift(); // Remove the oldest post if we've exceeded the maximum
      }
    },
    // Other reducers...
  },
});

export const { addPost } = postsSlice.actions;
export default postsSlice.reducer;