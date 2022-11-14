import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { authApi } from './auth/auth-api';
import { authReducer } from './auth/auth-slice';
import { pokemonApi } from './services/pokemon';

const authPersistConfig = {
  key: 'user',
  storage,
  whitelist: ['access_token'],
};

export const persistedAuthReducer = persistReducer(
  authPersistConfig,
  authApi.reducer,
);

export const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    [authApi.reducerPath]: persistedAuthReducer,
    user: authReducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authApi.middleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
setupListeners(store.dispatch);
