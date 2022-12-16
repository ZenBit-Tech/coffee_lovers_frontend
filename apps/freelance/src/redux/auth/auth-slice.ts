import { profileQ2, roles } from '@freelance/constants';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';
import { Role } from 'redux/types/user.types';
import persistReducer from 'redux-persist/lib/persistReducer';
import storage from 'redux-persist/lib/storage';

export interface AuthState {
  access_token: string;
  role: Role;
}

const initialState: AuthState = {
  access_token: '',
  role: roles.visitor,
};

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ access_token: string }>) {
      state.access_token = action.payload.access_token;
    },
    logout: state => {
      state.access_token = profileQ2.emptyStr;
      state.role = roles.visitor;
    },
    setRole(state, action: PayloadAction<{ role: Role }>) {
      state.role = action.payload.role;
    },
  },
});

const authPersistConfig = {
  key: 'user',
  storage,
  whitelist: ['access_token', 'role'],
};

export const persistedAuthReducer = persistReducer(
  authPersistConfig,
  authSlice.reducer,
);

export const { setUser, logout, setRole } = authSlice.actions;

export const authReducer = authSlice.reducer;

export const selectAuthToken = (state: RootState) => state.user.access_token;
export const selectRole = (state: RootState) => state.user.role;
