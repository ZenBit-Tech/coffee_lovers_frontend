import queryString from 'query-string';
import { JobUpdateValues } from '@freelance/components';
import { baseUrl } from '@freelance/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getHeaders } from '@utils/api';

import { GetJobResponse, JobPost } from './job-post.types';

enum EndpointsRoutes {
  JOB = '/job',
  UPDATE = '/update',
}

enum ApiRoutes {
  JOBS = '/jobs',
}

export const jobPostApi = createApi({
  reducerPath: 'jobPostApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: getHeaders(),
    paramsSerializer: params => {
      return queryString.stringify(params, { arrayFormat: 'bracket' });
    },
  }),

  endpoints: builder => ({
    postJob: builder.mutation({
      query: (body: JobPost) => ({
        url: ApiRoutes.JOBS,
        method: 'POST',
        body,
      }),
    }),
    getJob: builder.query<GetJobResponse, number>({
      query: id => ({
        url: `${ApiRoutes.JOBS}/${id}${EndpointsRoutes.JOB}`,
      }),
    }),
    updateJob: builder.mutation({
      query: (body: JobUpdateValues) => ({
        url: ApiRoutes.JOBS + EndpointsRoutes.UPDATE,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { usePostJobMutation, useGetJobQuery, useUpdateJobMutation } =
  jobPostApi;
