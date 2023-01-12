import { ApiRoutes, apiTags } from '@freelance/constants';
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
        url: serviceRoute + ContractsEndpoints.closeContract + contractId,
        method: 'POST',
      }),
      invalidatesTags: [apiTags.postedJob],
    }),
    getAllContracts: builder.query<ContractsResponse[], void>({
      query: () => serviceRoute + ContractsEndpoints.all,
    }),
  }),
});

export const {
  useGetClosedContractsQuery,
  useGetActiveConractsQuery,
  useCloseContractMutation,
  useGetAllContractsQuery,
} = contractApi;
