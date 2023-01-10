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
import { propertiesApi } from './properties/properties-api';
import { persistedPropertiesReducer } from './properties/properties-slice';
import { authApi } from './services/authApi';
import { emptySplitApi } from './emptySplitApi';

export const store = configureStore({
  reducer: {
    [userAuthApi.reducerPath]: userAuthApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    user: persistedAuthReducer,
    properties: persistedPropertiesReducer,
    [propertiesApi.reducerPath]: propertiesApi.reducer,

    [emptySplitApi.reducerPath]: emptySplitApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      userAuthApi.middleware,
      authApi.middleware,
      propertiesApi.middleware,

      emptySplitApi.middleware,
    ),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
