import { BACK_HOST, BACK_PORT, BACK_PROTO } from '@freelance/components';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authReducer',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACK_PROTO}://${BACK_HOST}:${BACK_PORT}/auth`,
  }),
  endpoints: builder => ({
    addUserGoogle: builder.mutation({
      query: post => ({
        url: `/google`,
        method: 'POST',
        body: post,
        headers: { 'Access-Control-Allow-Origin': '*' },
      }),
    }),
  }),
});

export const { useAddUserGoogleMutation } = authApi;
