import { ApiRoutes, baseUrl } from '@freelance/constants';
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { getHeaders } from '@utils/api';
import {
  PasswordResetPayload,
  Role,
  SetProfileImageResponse,
  User,
  UserError,
} from 'redux/types/user.types';

enum EndpointsRoutes {
  passwordResetRequest = '/passwordresetrequest',
  passwordReset = '/passwordreset',
  setProfileImage = '/setprofileimage',
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl + ApiRoutes.USER,
    prepareHeaders: getHeaders(),
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
    setProfileImage: builder.mutation<SetProfileImageResponse, FormData>({
      query: (formData: FormData) => ({
        url: EndpointsRoutes.setProfileImage,
        method: 'POST',
        body: formData,
      }),
    }),
    addUserRole: builder.mutation({
      query: (body: { role: Role }) => {
        return {
          url: '/user-info',
          method: 'POST',
          body,
        };
      },
    }),
    getUserInfo: builder.query<User, void>({
      query: () => ({
        url: `/`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  usePasswordResetRequestMutation,
  usePasswordResetMutation,
  useSetProfileImageMutation,
  useAddUserRoleMutation,
  useGetUserInfoQuery,
} = userApi;
