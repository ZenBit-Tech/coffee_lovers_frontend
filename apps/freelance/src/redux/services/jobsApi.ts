import queryString from 'query-string';
import { ApiRoutes, baseUrl } from '@freelance/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getHeaders } from '@utils/api';
import { AvailableJobs } from 'redux/types/availableJobs.types.';
import {
  FindJobsResponse,
  FrelancerPayload,
  GetJobParams,
  GetJobProposalsResponse,
  GetJobResponse,
  GetPostedJobsResponse,
  IJobProposal,
} from 'redux/types/jobs.types';
import { OffersJobs } from 'redux/types/withoutoffer.types.ts';

enum EndpointsRoutes {
  findJobs = '/',
  findUserJobs = '/userjobs',
  getJobProposals = '/proposals',
  getJob = '/job',
  getPostedJobs = '/posted',
  offer = '/withoutoffer',
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
    findJobs: builder.query<FindJobsResponse, GetJobParams>({
      query: params => ({
        url: EndpointsRoutes.findJobs,
        params,
      }),
    }),
    findUserJobs: builder.query<AvailableJobs[], number | undefined>({
      query: freelancer => ({
        url: EndpointsRoutes.findUserJobs + '/' + freelancer,
      }),
    }),
    sendProposal: builder.mutation({
      query: (body: IJobProposal) => ({
        url: '/proposal',
        method: 'POST',
        body,
      }),
    }),
    getJobProposals: builder.query<GetJobProposalsResponse, string>({
      query: id => ({
        url: `/${id}` + EndpointsRoutes.getJobProposals,
      }),
    }),
    findUserJobsWithoutOffer: builder.query<OffersJobs[], FrelancerPayload>({
      query: (payload: FrelancerPayload) => ({
        url: `${EndpointsRoutes.offer}/${payload.id}`,
      }),
    }),
    getJob: builder.query<GetJobResponse, number>({
      query: id => ({
        url: `/${id}` + EndpointsRoutes.getJob,
      }),
    }),
    getPostedJobs: builder.query<GetPostedJobsResponse[], void>({
      query: () => EndpointsRoutes.getPostedJobs,
    }),
  }),
});

export const {
  useFindJobsQuery,
  useFindUserJobsQuery,
  useSendProposalMutation,
  useGetJobQuery,
  useGetJobProposalsQuery,
  useGetPostedJobsQuery,
  useFindUserJobsWithoutOfferQuery,
} = jobsApi;
