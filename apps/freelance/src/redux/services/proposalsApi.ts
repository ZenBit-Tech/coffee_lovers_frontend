import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getHeaders } from '@utils/api';
import { Proposal } from 'redux/types/jobs.types';

enum EndpointsRoutes {
  addProposal = 'jobs/proposal',
}

export const proposalApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env['NX_API_URL'],
    prepareHeaders: getHeaders(),
  }),
  endpoints: build => ({
    addProposal: build.mutation<Proposal, Partial<Proposal>>({
      query(body: Partial<Proposal>) {
        return {
          url: `${EndpointsRoutes.addProposal}`,
          method: 'POST',
          body,
        };
      },
    }),
  }),
});

export const { useAddProposalMutation } = proposalApi;
