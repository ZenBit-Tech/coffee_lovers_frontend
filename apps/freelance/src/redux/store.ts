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
import { jobPostApi } from './job-post/job-post';
import { profileQuestions1Api } from './profileQuestions/profileQuestions1Api';
import { propertiesApi } from './properties/properties-api';
import { persistedPropertiesReducer } from './properties/properties-slice';
import { authApi } from './services/authApi';
import { chatApi } from './services/chatApi';
import { freelancersApi } from './services/freelancers';
import { jobsApi } from './services/jobsApi';
import { userApi } from './services/user';

export const store = configureStore({
  reducer: {
    [userAuthApi.reducerPath]: userAuthApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [freelancersApi.reducerPath]: freelancersApi.reducer,
    user: persistedAuthReducer,
    [profileQuestions1Api.reducerPath]: profileQuestions1Api.reducer,
    properties: persistedPropertiesReducer,
    [propertiesApi.reducerPath]: propertiesApi.reducer,
    [jobsApi.reducerPath]: jobsApi.reducer,
    [jobPostApi.reducerPath]: jobPostApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      userAuthApi.middleware,
      profileQuestions1Api.middleware,
      authApi.middleware,
      userApi.middleware,
      propertiesApi.middleware,
      jobsApi.middleware,
      freelancersApi.middleware,
      jobPostApi.middleware,
      chatApi.middleware,
    ),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
