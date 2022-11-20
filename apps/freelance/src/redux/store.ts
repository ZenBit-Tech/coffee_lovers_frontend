import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { profileQuestions1Api } from './profileQuestions/profileQuestions1Api';
import { authApi } from './services/authApi';
import { pokemonApi } from './services/pokemon';
import { talentApi } from './services/talents';
import { userApi } from './services/user';

export const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [talentApi.reducerPath]: talentApi.reducer,
    [profileQuestions1Api.reducerPath]: profileQuestions1Api.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      pokemonApi.middleware,
      profileQuestions1Api.middleware,
      authApi.middleware,
      userApi.middleware,
      talentApi.middleware,
    ),
});

setupListeners(store.dispatch);
