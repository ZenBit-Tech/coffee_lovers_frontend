import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { RootState } from '../store';
// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

const baseUrl: string = process.env['NX_API_URL'] || '';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token;
      console.log('header', token);
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: builder => ({
    loginUser: builder.mutation({
      query: (body: { email: string; password: string }) => ({
        url: '/auth/signin',
        method: 'POST',
        body,
      }),
    }),
    registerUser: builder.mutation({
      query: (body: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
      }) => {
        return {
          url: '/auth/signup',
          method: 'POST',
          body,
        };
      },
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;

// const persistConfig = {
//   key: 'user',
//   storage,
//   whitelist: ['access_token'],
// };

// export const persistedAuthReducer = persistReducer(
//   persistConfig,
//   authApi.reducer
// );
