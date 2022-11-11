import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';
export interface AuthState {
  name: string | null;
  token: string | null;
}

const initialState: AuthState = {
  name: null,
  token: null,
};

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ name: string; token: string }>) {
      localStorage.setItem(
        'user',
        JSON.stringify({
          name: action.payload.name,
          token: action.payload.token,
        }),
      );
      state.name = action.payload.name;
      state.token = action.payload.token;
    },
    logout: state => {
      localStorage.clear();
      state.name = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectAuth = (state: RootState) => state.user;
