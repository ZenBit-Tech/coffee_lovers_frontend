import queryString from 'query-string';
import { ApiRoutes, baseUrl } from '@freelance/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getHeaders } from '@utils/api';
import { AvailableJobs } from 'redux/types/availableJobs.types.';
import {
  FindJobsResponse,
  GetJobParams,
  GetJobProposalsResponse,
  GetJobResponse,
  GetPostedJobDetailsResponse,
  GetPostedJobsResponse,
  IJobProposal,
} from 'redux/types/jobs.types';

enum EndpointsRoutes {
  findJobs = '/',
  findUserJobs = '/userjobs',
  getJobProposals = '/proposals',
  getJob = '/job',
  getPostedJobs = '/posted',
  getPostedJobDetails = '/posted/',
  offer = '/withoutoffer',
  invite = '/withoutinvite',
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
    findUserJobs: builder.query<AvailableJobs[], number>({
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
    getJob: builder.query<GetJobResponse, number | null>({
      query: id => ({
        url: `/${id}` + EndpointsRoutes.getJob,
      }),
    }),
    getPostedJobs: builder.query<GetPostedJobsResponse[], void>({
      query: () => EndpointsRoutes.getPostedJobs,
    }),
    getPostedJobDetails: builder.query<GetPostedJobDetailsResponse, string>({
      query: (id: string) => EndpointsRoutes.getPostedJobDetails + id,
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
  useGetPostedJobDetailsQuery,
} = jobsApi;
