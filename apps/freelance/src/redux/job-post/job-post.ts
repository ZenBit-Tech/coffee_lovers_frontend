import { ApiRoutes, baseUrl } from '@freelance/constants';
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { RootState } from 'redux/store';

import { Error, JobPost } from './job-post.types';

export const jobPostApi = createApi({
  reducerPath: 'jobPostApi',
  baseQuery: fetchBaseQuery({
    baseUrl,

    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.access_token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }) as BaseQueryFn<string | FetchArgs, unknown, Error>,

  tagTypes: ['jobPostApi'],
  endpoints: builder => ({
    postJobs: builder.mutation({
      query: (body: JobPost) => ({
        url: ApiRoutes.JOBS,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['jobPostApi'],
    }),
  }),
});

export const { usePostJobsMutation } = jobPostApi;
