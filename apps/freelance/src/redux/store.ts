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
import { contractsApi } from './contracts/contracts';
import { invitationApi } from './invitation/invitation';
import { inviteApi } from './invite/inviteApi';
import { jobPostApi } from './job-post/job-post';
import { propertiesApi } from './properties/properties-api';
import { persistedPropertiesReducer } from './properties/properties-slice';
import { authApi } from './services/authApi';
import { chatApi } from './services/chatApi';
import { freelancersApi } from './services/freelancers';
import { jobsApi } from './services/jobsApi';
import { requestApi } from './services/requestApi';
import { userApi } from './services/user';

export const store = configureStore({
  reducer: {
    [userAuthApi.reducerPath]: userAuthApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [freelancersApi.reducerPath]: freelancersApi.reducer,
    user: persistedAuthReducer,
    properties: persistedPropertiesReducer,
    [propertiesApi.reducerPath]: propertiesApi.reducer,
    [jobsApi.reducerPath]: jobsApi.reducer,
    [jobPostApi.reducerPath]: jobPostApi.reducer,
    [invitationApi.reducerPath]: invitationApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    [inviteApi.reducerPath]: inviteApi.reducer,
    [requestApi.reducerPath]: requestApi.reducer,
    [contractsApi.reducerPath]: contractsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      userAuthApi.middleware,
      authApi.middleware,
      userApi.middleware,
      propertiesApi.middleware,
      jobsApi.middleware,
      freelancersApi.middleware,
      jobPostApi.middleware,
      invitationApi.middleware,
      chatApi.middleware,
      requestApi.middleware,
      contractsApi.middleware,
      inviteApi.middleware,
    ),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
