import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/lib/persistReducer';
import storage from 'redux-persist/lib/storage';

import { RootState } from '../store';

import { authApi } from './auth-api';

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

const authPersistConfig = {
  key: 'userToken',
  storage,
  whitelist: ['token'],
};

export const persistedAuthReducer = persistReducer(
  authPersistConfig,
  authApi.reducer,
);

export const { setUser, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;

export const selectAuthToken = (state: RootState) => state.user.token;
