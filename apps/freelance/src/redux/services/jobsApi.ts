import { ApiRoutes, apiTags, JobUpdateValues } from '@freelance/constants';
import { emptySplitApi } from 'redux/emptySplitApi';
import {
  FindJobsResponse,
  GetJobParams,
  GetJobProposalsResponse,
  GetJobResponse,
  GetPostedJobDetailsResponse,
  GetPostedJobsResponse,
  IJobProposal,
  JobPost,
} from 'redux/types/jobs.types';

const serviceRoute = ApiRoutes.JOBS;

enum EndpointsRoutes {
  findJobs = '/',
  sendProposal = '/proposal',
  findUserJobs = '/userjobs',
  getJobProposals = '/proposals',
  getJob = '/job',
  getPostedJobs = '/posted',
  getPostedJobDetails = '/posted/',
  updateJob = '/update',
  stopHiring = '/stophiring/',
}

const jobsApi = emptySplitApi.injectEndpoints({
  endpoints: builder => ({
    findJobs: builder.query<FindJobsResponse, GetJobParams>({
      query: params => ({
        url: serviceRoute + EndpointsRoutes.findJobs,
        params,
      }),
      providesTags: [apiTags.job],
    }),
    sendProposal: builder.mutation({
      query: (body: IJobProposal) => ({
        url: serviceRoute + EndpointsRoutes.sendProposal,
        method: 'POST',
        body,
      }),
      invalidatesTags: [apiTags.proposal],
    }),
    getJobProposals: builder.query<GetJobProposalsResponse, string>({
      query: id => ({
        url: serviceRoute + `/${id}` + EndpointsRoutes.getJobProposals,
      }),
      providesTags: [apiTags.proposal],
    }),
    getJob: builder.query<GetJobResponse, number | null>({
      query: id => ({
        url: serviceRoute + `/${id}` + EndpointsRoutes.getJob,
      }),
      keepUnusedDataFor: 0.0001,
      providesTags: [apiTags.job],
    }),
    getPostedJobs: builder.query<GetPostedJobsResponse[], void>({
      query: () => serviceRoute + EndpointsRoutes.getPostedJobs,
      providesTags: [apiTags.postedJob, apiTags.job],
    }),
    getPostedJobDetails: builder.query<GetPostedJobDetailsResponse, string>({
      query: (id: string) =>
        serviceRoute + EndpointsRoutes.getPostedJobDetails + id,
      providesTags: [apiTags.postedJob],
    }),
    postJob: builder.mutation({
      query: (body: JobPost) => ({
        url: serviceRoute,
        method: 'POST',
        body,
      }),
      invalidatesTags: [apiTags.job],
    }),
    updateJob: builder.mutation({
      query: (body: JobUpdateValues) => ({
        url: serviceRoute + EndpointsRoutes.updateJob,
        method: 'POST',
        body,
      }),
      invalidatesTags: [apiTags.job],
    }),
    stopHiring: builder.mutation({
      query: (jobId: number) => ({
        url: serviceRoute + EndpointsRoutes.stopHiring + jobId,
        method: 'POST',
      }),
      invalidatesTags: [apiTags.postedJob],
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
  useUpdateJobMutation,
  usePostJobMutation,
  useStopHiringMutation,
} = jobsApi;
