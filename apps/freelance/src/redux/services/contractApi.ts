import { ApiRoutes, apiTags } from '@freelance/constants';
import { emptySplitApi } from 'redux/emptySplitApi';
import {
  ContractsResponse,
  GetHiresContracts,
  HiresQuery,
} from 'redux/types/contracts.types';

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
    getAllContracts: builder.query<GetHiresContracts, HiresQuery>({
      query: (params: HiresQuery) => ({
        url: serviceRoute + ContractsEndpoints.all,
        method: 'GET',
        params,
      }),
      providesTags: [apiTags.favorites],
    }),
  }),
});

export const {
  useGetClosedContractsQuery,
  useGetActiveConractsQuery,
  useCloseContractMutation,
  useGetAllContractsQuery,
} = contractApi;
