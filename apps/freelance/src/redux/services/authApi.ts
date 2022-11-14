import { BACK_URL } from '@freelance/components';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authReducer',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACK_URL}/auth`,
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
