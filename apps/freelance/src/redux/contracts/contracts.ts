import { ApiRoutes, baseUrl } from '@freelance/constants';
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { RootState } from 'redux/store';

import { ContractsResponse, Error } from './types';

enum ContractsEndpoints {
  opened = '/active',
  closed = '/closed',
  closeContract = '/close/',
  all = '/all',
}

export const contractsApi = createApi({
  reducerPath: 'contractsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl + ApiRoutes.CONTRACTS,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.access_token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }) as BaseQueryFn<string | FetchArgs, unknown, Error>,

  endpoints: builder => ({
    getActiveConracts: builder.query<ContractsResponse[], void>({
      query: () => ContractsEndpoints.opened,
    }),
    getClosedContracts: builder.query<ContractsResponse[], void>({
      query: () => ContractsEndpoints.closed,
    }),
    closeContract: builder.mutation({
      query: (contractId: number) => ({
        url: ContractsEndpoints.closeContract + contractId,
        method: 'POST',
      }),
    }),
    getAllContracts: builder.query<ContractsResponse[], void>({
      query: () => `${ApiRoutes.CONTRACTS}${ContractsEndpoints.all}`,
    }),
  }),
});

export const {
  useGetClosedContractsQuery,
  useGetActiveConractsQuery,
  useCloseContractMutation,
  useGetAllContractsQuery,
} = contractsApi;
