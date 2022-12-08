import queryString from 'query-string';
import { ApiRoutes, baseUrl } from '@freelance/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getHeaders } from '@utils/api';
import {
  FindJobsResponse,
  GetJobParams,
  GetJobProposalsResponse,
  GetPostedJobsResponse,
  IJobProposal,
  IProposalResponse,
} from 'redux/types/jobs.types';

enum EndpointsRoutes {
  findJobs = '/',
  getJobProposals = '/proposals',
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
    getJobProposals: builder.query<GetJobProposalsResponse, string>({
      query: id => ({
        url: `/${id}` + EndpointsRoutes.getJobProposals,
      }),
    }),
    getPostedJobs: builder.query<GetPostedJobsResponse[], void>({
      query: () => EndpointsRoutes.getPostedJobs,
    }),
    sendProposal: builder.mutation({
      query: (body: IJobProposal) => ({
        url: '/proposal',
        method: 'POST',
        body,
      }),
    }),
    getProposals: builder.query<IProposalResponse, number>({
      query: id => ({
        url: `/${id}/proposals`,
      }),
    }),
  }),
});

export const {
  useFindJobsQuery,
  useGetJobProposalsQuery,
  useSendProposalMutation,
  useGetPostedJobsQuery,
  useGetProposalsQuery,
} = jobsApi;
