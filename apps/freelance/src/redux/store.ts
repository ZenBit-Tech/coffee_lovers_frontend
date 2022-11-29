import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistedAuthReducer } from 'redux/auth/auth-slice';

import { userAuthApi } from './auth/auth-api';
import { profileQuestions1Api } from './profileQuestions/profileQuestions1Api';
import { propertiesApi } from './properties/properties-api';
import { persistedPropertiesReducer } from './properties/properties-slice';
import { authApi } from './services/authApi';
import { freelancersApi } from './services/freelancers';
import { pokemonApi } from './services/pokemon';
import { userApi } from './services/user';

export const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    [userAuthApi.reducerPath]: userAuthApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [freelancersApi.reducerPath]: freelancersApi.reducer,
    user: persistedAuthReducer,
    [profileQuestions1Api.reducerPath]: profileQuestions1Api.reducer,
    properties: persistedPropertiesReducer,
    [propertiesApi.reducerPath]: propertiesApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      userAuthApi.middleware,
      pokemonApi.middleware,
      profileQuestions1Api.middleware,
      authApi.middleware,
      userApi.middleware,
      propertiesApi.middleware,
      freelancersApi.middleware,
    ),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
setupListeners(store.dispatch);
