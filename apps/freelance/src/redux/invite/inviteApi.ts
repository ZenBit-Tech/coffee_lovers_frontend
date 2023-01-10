import { ApiRoutes, baseUrl, offerTags } from '@freelance/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getHeaders } from '@utils/api';
import { FrelancerPayload } from 'redux/types/jobs.types';
import { OffersJobs } from 'redux/types/withoutoffer.types.ts';

import { GetOffersResponse, PostOffer, PostRequest } from './types';

enum EndpointsRoutes {
  offer = '/offer',
  offers = '/offers',
  invite = '/invite',
  withoutoffer = 'withoutoffer',
  withoutinvite = 'withoutinvite',
}

export const inviteApi = createApi({
  reducerPath: 'inviteApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl + ApiRoutes.REQUEST,
    prepareHeaders: getHeaders(),
  }),
  tagTypes: Object.values(offerTags),
  endpoints: builder => ({
    findUserJobsWithoutOffer: builder.query<OffersJobs[], FrelancerPayload>({
      query: (payload: FrelancerPayload) => ({
        url: `${EndpointsRoutes.withoutoffer}/${payload.id}`,
      }),
      providesTags: [offerTags.offer, offerTags.invite],
    }),
    findUserJobsWithoutInvite: builder.query<OffersJobs[], FrelancerPayload>({
      query: (payload: FrelancerPayload) => ({
        url: `${EndpointsRoutes.withoutinvite}/${payload.id}`,
      }),
      providesTags: [offerTags.invite],
    }),
    postRequest: builder.mutation({
      query: (payload: PostRequest) => ({
        url: `/${payload.freelancer}/${payload.jobId}`,
        method: 'POST',
        body: payload.data,
      }),
      invalidatesTags: [offerTags.invite],
    }),
    postOffer: builder.mutation({
      query: (payload: PostOffer) => ({
        url: `${EndpointsRoutes.offer}/${payload.freelancer}/${payload.jobId}`,
        method: 'POST',
        body: payload.data,
      }),
      invalidatesTags: [offerTags.offer],
    }),
    getUserOffers: builder.query<GetOffersResponse[], void>({
      query: () => ({
        url: EndpointsRoutes.offers,
        method: 'GET',
      }),
      providesTags: [offerTags.offer],
    }),
  }),
});

export const {
  usePostRequestMutation,
  usePostOfferMutation,
  useFindUserJobsWithoutInviteQuery,
  useFindUserJobsWithoutOfferQuery,
  useGetUserOffersQuery,
} = inviteApi;
