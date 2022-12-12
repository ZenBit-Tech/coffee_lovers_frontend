import queryString from 'query-string';
import { ApiRoutes, baseUrl } from '@freelance/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getHeaders } from '@utils/api';

import { PostRequest } from './types';

enum EndpointsRoutes {
  invite = '/',
  requset = '/request',
}

export const jobsApi = createApi({
  reducerPath: 'jobsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl + ApiRoutes.JOBS,
    prepareHeaders: getHeaders(),
    paramsSerializer: params => {
      return queryString.stringify(params, { arrayFormat: 'bracket' });
    },
  }),
  endpoints: builder => ({
    postRequest: builder.mutation({
      query: (payload: PostRequest) => ({
        url: `${EndpointsRoutes.requset}/${payload.freelancer}`,
        method: 'POST',
        body: payload.data,
      }),
    }),
  }),
});

export const { usePostRequestMutation } = jobsApi;
