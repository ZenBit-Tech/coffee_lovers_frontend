import { ApiRoutes, apiTags } from '@freelance/constants';
import { emptySplitApi } from 'redux/emptySplitApi';
import { FrelancerPayload } from 'redux/types/jobs.types';
import {
  Interview,
  Offer,
  PostOffer,
  PostRequest,
} from 'redux/types/request.types';
import { OffersJobs } from 'redux/types/withoutoffer.types.ts';

const serviceRoute = ApiRoutes.REQUEST;

enum EndpointsRoutes {
  getOffers = '/offers',
  getInterviews = '/interviews',
  acceptOffer = '/accept/offer/',
  declineOffer = '/decline/offer/',
  deleteInterview = '/interview/',
  offer = '/offer',
  invite = '/invite',
  withoutoffer = 'withoutoffer',
  withoutinvite = 'withoutinvite',
}

const requestApi = emptySplitApi.injectEndpoints({
  endpoints: builder => ({
    getOffers: builder.query<Offer[], void>({
      query: () => serviceRoute + EndpointsRoutes.getOffers,
      providesTags: [apiTags.offer],
    }),
    getInterviews: builder.query<Interview[], void>({
      query: () => serviceRoute + EndpointsRoutes.getInterviews,
      providesTags: [apiTags.interview],
    }),
    acceptOffer: builder.mutation<void, number>({
      query: (id: number) => ({
        url: serviceRoute + EndpointsRoutes.acceptOffer + id,
        method: 'POST',
      }),
      invalidatesTags: [apiTags.offer],
    }),
    declineOffer: builder.mutation<void, number>({
      query: (id: number) => ({
        url: serviceRoute + EndpointsRoutes.declineOffer + id,
        method: 'POST',
      }),
      invalidatesTags: [apiTags.offer],
    }),
    deleteInterview: builder.mutation<void, number>({
      query: (id: number) => ({
        url: serviceRoute + EndpointsRoutes.deleteInterview + id,
        method: 'DELETE',
      }),
      invalidatesTags: [apiTags.interview],
    }),
    findUserJobsWithoutOffer: builder.query<OffersJobs[], FrelancerPayload>({
      query: (payload: FrelancerPayload) => ({
        url: serviceRoute + `${EndpointsRoutes.withoutoffer}/${payload.id}`,
      }),
      providesTags: [apiTags.invite, apiTags.offer],
    }),
    findUserJobsWithoutInvite: builder.query<OffersJobs[], FrelancerPayload>({
      query: (payload: FrelancerPayload) => ({
        url: serviceRoute + `${EndpointsRoutes.withoutinvite}/${payload.id}`,
      }),
      providesTags: [apiTags.invite],
    }),
    postRequest: builder.mutation({
      query: (payload: PostRequest) => ({
        url: serviceRoute + `/${payload.freelancer}/${payload.jobId}`,
        method: 'POST',
        body: payload.data,
      }),
      invalidatesTags: [apiTags.invite],
    }),
    postOffer: builder.mutation({
      query: (payload: PostOffer) => ({
        url:
          serviceRoute +
          `${EndpointsRoutes.offer}/${payload.freelancer}/${payload.jobId}`,
        method: 'POST',
        body: payload.data,
      }),
      invalidatesTags: [apiTags.offer],
    }),
  }),
});

export const {
  useGetOffersQuery,
  useGetInterviewsQuery,
  useAcceptOfferMutation,
  useDeclineOfferMutation,
  useDeleteInterviewMutation,
  usePostRequestMutation,
  usePostOfferMutation,
  useFindUserJobsWithoutInviteQuery,
  useFindUserJobsWithoutOfferQuery,
} = requestApi;
