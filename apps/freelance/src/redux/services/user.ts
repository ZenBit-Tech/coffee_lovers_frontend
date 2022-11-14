import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { PasswordResetPayload } from './types/user.types';

const baseUrl: string = process.env['NX_API_URL'] || '';
const route = '/user';

enum EndpointsRoutes {
  passwordResetRequest = '/passwordresetrequest',
  passwordReset = '/passwordreset',
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl + route }),
  endpoints: builder => ({
    passwordResetRequest: builder.mutation({
      query: (email: string) => ({
        url: EndpointsRoutes.passwordResetRequest,
        method: 'POST',
        body: { email },
      }),
    }),
    passwordReset: builder.mutation({
      query: (payload: PasswordResetPayload) => ({
        url: EndpointsRoutes.passwordReset,
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const { usePasswordResetRequestMutation, usePasswordResetMutation } =
  userApi;
