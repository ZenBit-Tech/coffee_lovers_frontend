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
      keepUnusedDataFor: 0.0001,
      providesTags: [apiTags.job],
    }),
    getClosedContracts: builder.query<ContractsResponse[], void>({
      query: () => serviceRoute + ContractsEndpoints.closed,
      keepUnusedDataFor: 0.0001,
      providesTags: [apiTags.job],
    }),
    closeContract: builder.mutation({
      query: (contractId: number) => ({
        url: serviceRoute + ContractsEndpoints.closeContract + contractId,
        method: 'POST',
      }),
      invalidatesTags: [apiTags.postedJob, apiTags.job],
    }),
    getAllContracts: builder.query<GetHiresContracts, HiresQuery>({
      query: (params: HiresQuery) => ({
        url: serviceRoute + ContractsEndpoints.all,
        method: 'GET',
        params,
      }),
      providesTags: [apiTags.favorites, apiTags.job],
    }),
  }),
});

export const {
  useGetClosedContractsQuery,
  useGetActiveConractsQuery,
  useCloseContractMutation,
  useGetAllContractsQuery,
} = contractApi;
