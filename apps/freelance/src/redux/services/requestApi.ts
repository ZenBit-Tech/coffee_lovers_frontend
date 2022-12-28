import { ApiRoutes, baseUrl, requestApiTags } from '@freelance/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getHeaders } from '@utils/api';
import { Interview, Offer } from 'redux/types/request.types';

enum EndpointsRoutes {
  getOffers = '/offers',
  getInterviews = '/interviews',
  acceptOffer = '/accept/offer/',
  declineOffer = '/decline/offer/',
  deleteInterview = '/interview/',
}

export const requestApi = createApi({
  reducerPath: 'requestApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl + ApiRoutes.REQUEST,
    prepareHeaders: getHeaders(),
  }),
  tagTypes: Object.values(requestApiTags),
  endpoints: builder => ({
    getOffers: builder.query<Offer[], void>({
      query: () => EndpointsRoutes.getOffers,
      providesTags: [requestApiTags.offer],
    }),
    getInterviews: builder.query<Interview[], void>({
      query: () => EndpointsRoutes.getInterviews,
      providesTags: [requestApiTags.interview],
    }),
    acceptOffer: builder.mutation<void, number>({
      query: (id: number) => ({
        url: EndpointsRoutes.acceptOffer + id,
        method: 'POST',
      }),
      invalidatesTags: [requestApiTags.offer],
    }),
    declineOffer: builder.mutation<void, number>({
      query: (id: number) => ({
        url: EndpointsRoutes.declineOffer + id,
        method: 'POST',
      }),
      invalidatesTags: [requestApiTags.offer],
    }),
    deleteInterview: builder.mutation<void, number>({
      query: (id: number) => ({
        url: EndpointsRoutes.deleteInterview + id,
        method: 'DELETE',
      }),
      invalidatesTags: [requestApiTags.interview],
    }),
  }),
});

export const {
  useGetOffersQuery,
  useGetInterviewsQuery,
  useAcceptOfferMutation,
  useDeclineOfferMutation,
  useDeleteInterviewMutation,
} = requestApi;
