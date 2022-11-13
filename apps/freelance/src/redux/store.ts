import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { profileQuestions1Api } from './profileQuestions/profileQuestions1Api';
import { pokemonApi } from './services/pokemon';

export const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    [profileQuestions1Api.reducerPath]: profileQuestions1Api.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(pokemonApi.middleware)
      .concat(profileQuestions1Api.middleware),
});

setupListeners(store.dispatch);
