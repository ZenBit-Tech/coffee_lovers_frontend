import { ApiRoutes, baseUrl } from '@freelance/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'redux/store';

export const userAuthApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl + ApiRoutes.AUTH,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.access_token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: builder => ({
    loginUser: builder.mutation({
      query: (body: { email: string; password: string }) => ({
        url: '/signin',
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
          url: '/signup',
          method: 'POST',
          body,
        };
      },
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = userAuthApi;
