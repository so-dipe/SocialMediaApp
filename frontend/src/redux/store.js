import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './slices/sessionSlice';

const store = configureStore({
  reducer: {
    session: sessionReducer,
    // other reducers if any
  },
});

// Provide the store to your app
export { store };