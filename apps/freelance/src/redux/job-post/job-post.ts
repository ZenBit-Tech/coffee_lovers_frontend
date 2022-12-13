import queryString from 'query-string';
import { ApiRoutes, baseUrl } from '@freelance/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getHeaders } from '@utils/api';

import { GetJobResponse, JobPost } from './job-post.types';

enum EndpointsRoutes {
  Job = 'job',
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
    getJob: builder.query<GetJobResponse, string>({
      query: id => ({
        url: `${ApiRoutes.JOBS}/${id}/${EndpointsRoutes.Job}`,
      }),
    }),
  }),
});

export const { usePostJobMutation, useGetJobQuery } = jobPostApi;
