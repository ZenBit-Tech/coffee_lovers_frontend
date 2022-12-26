import { ApiRoutes, baseUrl } from '@freelance/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getHeaders } from '@utils/api';
import {
  GetInterviewsResponse,
  GetOffersResponse,
} from 'redux/types/request.types';

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
  tagTypes: ['Offer', 'Interview'],
  endpoints: builder => ({
    getOffers: builder.query<GetOffersResponse[], void>({
      query: () => EndpointsRoutes.getOffers,
      providesTags: ['Offer'],
    }),
    getInterviews: builder.query<GetInterviewsResponse[], void>({
      query: () => EndpointsRoutes.getInterviews,
      providesTags: ['Interview'],
    }),
    acceptOffer: builder.mutation<void, number>({
      query: (id: number) => ({
        url: EndpointsRoutes.acceptOffer + id,
        method: 'POST',
      }),
      invalidatesTags: ['Offer'],
    }),
    declineOffer: builder.mutation<void, number>({
      query: (id: number) => ({
        url: EndpointsRoutes.declineOffer + id,
        method: 'POST',
      }),
      invalidatesTags: ['Offer'],
    }),
    deleteInterview: builder.mutation<void, number>({
      query: (id: number) => ({
        url: EndpointsRoutes.deleteInterview + id,
        method: 'DELETE',
      }),
      invalidatesTags: ['Interview'],
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
