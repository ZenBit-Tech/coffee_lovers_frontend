import { ApiRoutes, baseUrl } from '@freelance/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getHeaders } from '@utils/api';

import { PostRequest } from './types';

enum EndpointsRoutes {
  invite = '/',
  requset = '/request',
}

export const inviteApi = createApi({
  reducerPath: 'inviteApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl + ApiRoutes.INVITE,
    prepareHeaders: getHeaders(),
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

export const { usePostRequestMutation } = inviteApi;
