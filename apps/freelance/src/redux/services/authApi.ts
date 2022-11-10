import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authReducer',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/auth' }),
  endpoints: (builder) => ({
    addUserGoogle: builder.mutation({
      query: (post) => ({
        url: `/google`,
        method: 'POST',
        body: post,
        headers: { 'Access-Control-Allow-Origin': '*' },
      }),
    }),
  }),
});

export const { useAddUserGoogleMutation } = authApi;
