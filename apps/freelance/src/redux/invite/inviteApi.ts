import { ApiRoutes, baseUrl } from '@freelance/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getHeaders } from '@utils/api';

import { PostOffer, PostRequest } from './types';

enum EndpointsRoutes {
  offer = '/offer',
}

export const inviteApi = createApi({
  reducerPath: 'inviteApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl + ApiRoutes.REQUEST,
    prepareHeaders: getHeaders(),
  }),
  endpoints: builder => ({
    postRequest: builder.mutation({
      query: (payload: PostRequest) => ({
        url: `/${payload.freelancer}/${payload.jobId}`,
        method: 'POST',
        body: payload.data,
      }),
    }),
    postOffer: builder.mutation({
      query: (payload: PostOffer) => ({
        url: `${EndpointsRoutes.offer}/${payload.freelancer}/${payload.jobId}`,
        method: 'POST',
        body: payload.data,
      }),
    }),
  }),
});

export const { usePostRequestMutation, usePostOfferMutation } = inviteApi;
