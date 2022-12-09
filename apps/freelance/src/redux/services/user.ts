import { ApiRoutes, baseUrl } from '@freelance/constants';
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { getHeaders } from '@utils/api';
import {
  GetEducation,
  GetUserProposals,
  GetWorkhistory,
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
    getUserInfo: builder.query<User, void>({
      query: () => ({
        url: `/`,
        method: 'GET',
      }),
    }),
    getUserWorkInfo: builder.query<GetWorkhistory[], void>({
      query: () => ({
        url: `/workhistory-info`,
        method: 'GET',
      }),
    }),
    getUserEducationInfo: builder.query<GetEducation[], void>({
      query: () => ({
        url: `/education-info`,
        method: 'GET',
      }),
    }),
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
    getUserProposals: builder.query<GetUserProposals, void>({
      query: () => ({
        url: `/proposals`,
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
  useLazyGetUserInfoQuery,
  useGetUserProposalsQuery,
  useGetUserWorkInfoQuery,
  useGetUserEducationInfoQuery,
} = userApi;
