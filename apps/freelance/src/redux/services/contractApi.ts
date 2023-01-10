import { ApiRoutes } from '@freelance/constants';
import { emptySplitApi } from 'redux/emptySplitApi';
import { ContractsResponse } from 'redux/types/contracts.types';

const serviceRoute = ApiRoutes.CONTRACTS;

enum ContractsEndpoints {
  opened = '/active',
  closed = '/closed',
}

export const contractApi = emptySplitApi.injectEndpoints({
  endpoints: builder => ({
    getActiveConracts: builder.query<ContractsResponse[], void>({
      query: () => serviceRoute + ContractsEndpoints.opened,
    }),
    getClosedContracts: builder.query<ContractsResponse[], void>({
      query: () => serviceRoute + ContractsEndpoints.closed,
    }),
  }),
});

export const { useGetClosedContractsQuery, useGetActiveConractsQuery } =
  contractApi;
