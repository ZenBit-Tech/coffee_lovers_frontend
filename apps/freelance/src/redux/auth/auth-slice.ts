import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';

export interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: null,
};

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ access_token: string }>) {
      state.token = action.payload.access_token;
    },
    logout: state => {
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;

export const selectAuthToken = (state: RootState) => state.user.token;
