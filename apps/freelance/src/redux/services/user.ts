import { ApiRoutes, baseUrl } from '@freelance/constants';
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { getHeaders } from '@utils/api';
import {
  AddEducation,
  AddFavorites,
  AddWorkhistory,
  GetEducation,
  GetFavorites,
  GetUserProposals,
  GetWorkhistory,
  PasswordResetPayload,
  SetProfileImageResponse,
  UpdateUser,
  User,
  UserError,
} from 'redux/types/user.types';

import { FreelancerFavQuery } from './../types/user.types';

enum EndpointsRoutes {
  passwordResetRequest = '/passwordresetrequest',
  passwordReset = '/passwordreset',
  passwordResetCheckAvailability = '/passwordreset/',
  setProfileImage = '/setprofileimage',
  addGetUserEduInfo = '/education-info',
  addGetUserWorkhistoryInfo = '/workhistory-info',
  addGetUserFavoritesInfo = '/favorites',
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl + ApiRoutes.USER,
    prepareHeaders: getHeaders(),
  }) as BaseQueryFn<string | FetchArgs, unknown, UserError>,
  tagTypes: ['User', 'WorkInfo', 'EduInfo', 'Favorites'],
  endpoints: builder => ({
    getUserInfo: builder.query<User, void>({
      query: () => ({
        url: `/`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    getUserWorkInfo: builder.query<GetWorkhistory[], void>({
      query: () => ({
        url: EndpointsRoutes.addGetUserWorkhistoryInfo,
        method: 'GET',
      }),
      providesTags: ['WorkInfo'],
    }),
    getUserEducationInfo: builder.query<GetEducation[], void>({
      query: () => ({
        url: EndpointsRoutes.addGetUserEduInfo,
        method: 'GET',
      }),
      providesTags: ['EduInfo'],
    }),
    passwordResetCheckAvailability: builder.query<boolean, string>({
      query: (key: string) => ({
        url: EndpointsRoutes.passwordResetCheckAvailability + key,
        method: 'GET',
      }),
    }),
    getUserProposals: builder.query<GetUserProposals, void>({
      query: () => ({
        url: `/proposals`,
        method: 'GET',
      }),
    }),
    getFavorites: builder.query<GetFavorites, FreelancerFavQuery>({
      query: (params: FreelancerFavQuery) => ({
        url: EndpointsRoutes.addGetUserFavoritesInfo,
        params,
        method: 'GET',
      }),
      providesTags: ['Favorites'],
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
    updateUserInfo: builder.mutation({
      query: (payload: UpdateUser) => ({
        url: `/`,
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['User'],
    }),
    addUserEduInfo: builder.mutation({
      query: (payload: AddEducation[]) => ({
        url: EndpointsRoutes.addGetUserEduInfo,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['EduInfo'],
    }),
    addUserWorkhistoryInfo: builder.mutation({
      query: (payload: AddWorkhistory[]) => ({
        url: EndpointsRoutes.addGetUserWorkhistoryInfo,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['WorkInfo'],
    }),
    setFavorites: builder.mutation({
      query: (payload: AddFavorites) => ({
        url: EndpointsRoutes.addGetUserFavoritesInfo,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Favorites'],
    }),
  }),
});

export const {
  usePasswordResetRequestMutation,
  usePasswordResetMutation,
  usePasswordResetCheckAvailabilityQuery,
  useSetProfileImageMutation,
  useGetUserInfoQuery,
  useLazyGetUserInfoQuery,
  useGetUserProposalsQuery,
  useGetUserWorkInfoQuery,
  useGetUserEducationInfoQuery,
  useAddUserWorkhistoryInfoMutation,
  useAddUserEduInfoMutation,
  useUpdateUserInfoMutation,
  useSetFavoritesMutation,
  useGetFavoritesQuery,
} = userApi;
