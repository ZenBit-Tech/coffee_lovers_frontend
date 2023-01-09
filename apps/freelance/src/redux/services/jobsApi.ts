import queryString from 'query-string';
import { ApiRoutes, baseUrl, jobApiTags } from '@freelance/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getHeaders } from '@utils/api';
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
  stopHiring = '/stophiring/',
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
  tagTypes: Object.values(jobApiTags),
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
    getJob: builder.query<GetJobResponse, number | null>({
      query: id => ({
        url: `/${id}` + EndpointsRoutes.getJob,
      }),
    }),
    getPostedJobs: builder.query<GetPostedJobsResponse[], void>({
      query: () => EndpointsRoutes.getPostedJobs,
      providesTags: [jobApiTags.postedJob],
    }),
    getPostedJobDetails: builder.query<GetPostedJobDetailsResponse, string>({
      query: (id: string) => EndpointsRoutes.getPostedJobDetails + id,
      providesTags: [jobApiTags.postedJob],
    }),
    stopHiring: builder.mutation({
      query: (jobId: number) => ({
        url: EndpointsRoutes.stopHiring + jobId,
        method: 'POST',
      }),
      invalidatesTags: [jobApiTags.postedJob],
    }),
  }),
});

export const {
  useFindJobsQuery,
  useSendProposalMutation,
  useGetJobQuery,
  useGetJobProposalsQuery,
  useGetPostedJobsQuery,
  useGetPostedJobDetailsQuery,
  useStopHiringMutation,
} = jobsApi;
