import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './slices/sessionSlice';
import postsReducer from './slices/postsSlice';

const store = configureStore({
  reducer: {
    session: sessionReducer,
    posts: postsReducer,
    // other reducers if any
  },
});

// Provide the store to your app
export { store };