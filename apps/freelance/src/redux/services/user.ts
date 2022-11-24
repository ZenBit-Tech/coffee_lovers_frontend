import { ApiRoutes, baseUrl } from '@freelance/constants';
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { PasswordResetPayload, UserError } from 'src/redux/types/user.types';

enum EndpointsRoutes {
  passwordResetRequest = '/passwordresetrequest',
  passwordReset = '/passwordreset',
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl + ApiRoutes.USER,
  }) as BaseQueryFn<string | FetchArgs, unknown, UserError>,
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
