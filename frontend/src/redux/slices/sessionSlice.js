import { createSlice } from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem('session')) || {
  user: null,
  isLoggedIn: false,
  // other session-related data
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    loginUser(state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
      // Save the state to localStorage
      localStorage.setItem('session', JSON.stringify(state));
    },
    logoutUser(state) {
      state.user = null;
      state.isLoggedIn = false;
      // clear other session-related data
      // Clear the state from localStorage
      localStorage.removeItem('session');
    },
    // other action creators for updating session data
  },
});

export const { loginUser, logoutUser } = sessionSlice.actions;
export default sessionSlice.reducer;
