import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import * as Constants from '../constants';

export const authApi = createApi({
  reducerPath: 'authReducer',
  baseQuery: fetchBaseQuery({
    baseUrl: `${Constants.BACK_PROTO}://${Constants.BACK_HOST}:${Constants.BACK_PORT}/auth`,
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
