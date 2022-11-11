import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/auth/' }),
  endpoints: builder => ({
    loginUser: builder.mutation({
      query: (body: { email: string; password: string }) => {
        return {
          url: 'signin',
          method: 'POST',
          body,
        };
      },
    }),
    registerUser: builder.mutation({
      query: (body: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
      }) => {
        return {
          url: 'signup',
          method: 'POST',
          body,
        };
      },
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;
