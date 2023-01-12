import { ApiRoutes } from '@freelance/constants';
import { emptySplitApi } from 'redux/emptySplitApi';
import { ContractsResponse } from 'redux/types/contracts.types';

const serviceRoute = ApiRoutes.CONTRACTS;

enum ContractsEndpoints {
  opened = '/active',
  closed = '/closed',
  closeContract = '/close/',
  all = '/all',
}

export const contractApi = emptySplitApi.injectEndpoints({
  endpoints: builder => ({
    getActiveConracts: builder.query<ContractsResponse[], void>({
      query: () => serviceRoute + ContractsEndpoints.opened,
    }),
    getClosedContracts: builder.query<ContractsResponse[], void>({
      query: () => serviceRoute + ContractsEndpoints.closed,
    }),
    closeContract: builder.mutation({
      query: (contractId: number) => ({
        url: ContractsEndpoints.closeContract + contractId,
        method: 'POST',
      }),
    }),
    getAllContracts: builder.query<ContractsResponse[], void>({
      query: () => `${ContractsEndpoints.all}`,
    }),
  }),
});

export const {
  useGetClosedContractsQuery,
  useGetActiveConractsQuery,
  useCloseContractMutation,
  useGetAllContractsQuery,
} = contractApi;
