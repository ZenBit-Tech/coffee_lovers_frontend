import { ApiRoutes, baseUrl } from '@freelance/constants';
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import {
  AddEducation,
  AddWorkhistory,
  UpdateUser,
  UserError,
} from 'redux/services/types/user.types';

export const profileQuestions1Api = createApi({
  reducerPath: 'profileQuestions1Api',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl + ApiRoutes.USER,
  }) as BaseQueryFn<string | FetchArgs, unknown, UserError>,
  tagTypes: ['ProfileQuestions1'],
  endpoints: builder => ({
    updateUserInfo: builder.mutation({
      query: (payload: UpdateUser) => ({
        url: `/user-info`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['ProfileQuestions1'],
    }),
    addUserEduInfo: builder.mutation({
      query: (payload: AddEducation) => ({
        url: `/education-info`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['ProfileQuestions1'],
    }),
    addUserWorkhistoryInfo: builder.mutation({
      query: (payload: AddWorkhistory) => ({
        url: `/workhistory-info`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['ProfileQuestions1'],
    }),
  }),
});

export const {
  useAddUserEduInfoMutation,
  useUpdateUserInfoMutation,
  useAddUserWorkhistoryInfoMutation,
} = profileQuestions1Api;
