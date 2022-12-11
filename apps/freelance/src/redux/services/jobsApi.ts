import queryString from 'query-string';
import { ApiRoutes, baseUrl } from '@freelance/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getHeaders } from '@utils/api';
import {
  FindJobsResponse,
  GetJobParams,
  GetJobProposalsResponse,
  GetJobResponse,
  GetPostedJobsResponse,
  IJobProposal,
  Job,
} from 'redux/types/jobs.types';

enum EndpointsRoutes {
  findJobs = '/',
  getJobProposals = '/proposals',
  getJob = '/job',
  getPostedJobs = '/posted',
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
    findUserJobs: builder.query<Job[], void>({
      query: () => ({
        url: `/userjobs`,
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
  useSendProposalMutation,
  useGetJobQuery,
  useGetJobProposalsQuery,
  useGetPostedJobsQuery,
  useFindUserJobsQuery,
} = jobsApi;
